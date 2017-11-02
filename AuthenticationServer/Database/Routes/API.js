/**
 * Created by Apoorva on 9/27/2017.
 */
var User        = require('../Models/User');
var UserSession = require('../Models/userSession')
var jwt         = require('jsonwebtoken');
var secret      = "UniversityOfSouthernCalifornia";

module.exports = function( router ){
	
	router.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

    //Add new user
    router.post('/signup_user',function (req, res) {
        var user = new User();
		var userSession = new UserSession();
        user.username   = req.body.username;
        user.password   = req.body.password;
        user.email      = req.body.email;
        user.identity   = req.body.identity;
		if( req.body.username == null || req.body.username == '' ||
			req.body.password == null || req.body.password == '' ||
			req.body.email == null || req.body.email == '' ||
			req.body.identity == null || req.body.identity == ''
		) {
			// res.send( 'Ensure all fields are filled' );
			res.json( {success: false, message: "Some fields empty", errorCode: '1'} );
		}else {
			user.save( function ( err ) {
				if ( err ) {
					console.log( err );
					// res.send('Email already exists!');
					res.json( {success: false, message: "Email already exists", errorCode: '2'} )
				} else {
					var token = jwt.sign( {username: user.username, email: user.email, userId: user._id, identity: user.identity}, secret, {expiresIn: '1h'} );
					
					userSession.email = user.email;
					userSession.userId = user._id;
					userSession.token = token;
					userSession.save( function ( err ) {
						if ( err ) {
							console.log( err );
							// res.send('Email already exists!');
							res.json( {
								success: false,
								message: "Email already exists in sessions table",
								errorCode: '2'
							} )
						} else {
							res.json( {success: true, message: 'new user created', successCode: '0', token: token} )
						}
					} )
				}
				
			} );
		}
	});

    //Authenticate existing users
    router.post('/authenticate_user',function(req,res){
		var userSession = new UserSession();
        User.findOne({email: req.body.email }).select('_id email username password identity').exec( function (err, user) {
            if (err) throw err;

            if( !user ){
                res.json({success: false, message: "Could not authentiate user", errorCode:'3'});
            }else if(user){
                if( req.body.password ){
                    var validPassword = user.comparePassword( req.body.password );
                    if( !validPassword ){
                        res.json({success: false, message: "Could not validate password", errorCode:'4'});
                    }else{
                        var token = jwt.sign({ username:user.username, email:user.email, userId: user._id, identity: user.identity}, secret, { expiresIn: '1h' });
						
                        userSession.email = user.email;
                        userSession.userId = user._id;
                        userSession.token = token;
                        userSession.save( function ( err ) {
                        	if( err ){
								console.log( err );
								// res.send('Email already exists!');
								res.json( {success: false, message: "Email already exists in sessions table", errorCode:'2'} )
							}else{
                        		res.json({success: true, message: "Valid user", successCode:'1', token: token})
							}
						})
                    }
                }else{
                    res.json({success:false, message: "No password provided", errorCode:'5'})
                }
            }
        });
    });
	
	//Authenticate user given a token
	router.post('/validate_token',function(req,res){
		UserSession.findOne({token: req.body.token}).select("email userId").exec( function ( err, activeToken ) {
			if( err ){
				res.json({success: false, message: "No such record present", statusCode: "6"});
			}else{
				if( !activeToken ){
					res.json({success: false, message: "No records found", statusCode: "6", data: activeToken });
				}else{
					try {
						var decodedToken = jwt.verify(req.body.token, secret);
						var verify = activeToken.verifyRecord( decodedToken.email, decodedToken.userId );
						if( verify ){
							res.json({success: true, message: "validated login",
								ide: decodedToken,
								userIdentity: { username: decodedToken.username, identity: decodedToken.identity} });
						}else{
							res.json({success: false, message: "invalid login", statusCode: "6"});
						}
					} catch (e) {
						res.json({success: false, message: "invalid login", statusCode: "6"})
						// return res.status(401).send('unauthorized');
					}
				}
			}
		});
	});
	
	//Logout user
	router.post('/logout',function(req,res){
		UserSession.remove({token: req.body.token}, function (err, del) {

			if( err ) throw err;
			
			if( !del ){
				res.json({success: false, message: "delete did not happen", data: del});
			} else{
				res.json({success: true, message: "logout success", data: del});
			}

		});

	});
    return router;
};
