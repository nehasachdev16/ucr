/**
 * Created by Apoorva on 9/27/2017.
 */
var User        = require('../Models/User');

module.exports = function( router ){
    router.get('/home', function (req, res) {
        res.send('Hello from home!');
    });

    router.get('/',function (req,res) {
        res.send('Hello world !');
    });

    //Add new user
    router.post('/signup_user',function (req, res) {
        var user = new User();
        user.username   = req.body.username;
        user.password   = req.body.password;
        user.email      = req.body.email;
        user.identity   = req.body.identity;
        user.save( function (err) {
            if( req.body.username == null || req.body.username == '' ||
                req.body.password == null || req.body.password == '' ||
                req.body.email == null || req.body.email == '' ||
                req.body.identity == null || req.body.identity == ''
            ){
                // res.send( 'Ensure all fields are filled' );
                res.json( {success: false, message: "Some fields empty", errorCode:'1'} );
            }else{
                if( err ){
                    console.log( err );
                    // res.send('Email already exists!');
                    res.json( {success: false, message: "Email already exists", errorCode:'2'} )
                }else{
                    res.send({success: true, message: 'new user created',successCode:'0'});
                }
            }
        });
    });

    //Authenticate existing users
    router.post('/authenticate_user',function(req,res){
        User.findOne({email: req.body.email }).select('email username password identity').exec( function (err, user) {
            if (err) throw err;

            if( !user ){
                res.json({success: false, message: "Could not authentiate user", errorCode:'3'});
            }else if(user){
                if( req.body.password ){
                    var validPassword = user.comparePassword( req.body.password );
                    if( !validPassword ){
                        res.json({success: false, message: "Could not validate password", errorCode:'4'});
                    }else{
                        res.json({success: true, message: "Valid user", successCode:'1'})
                    }
                }else{
                    res.json({success:false, message: "No passowrd provided", errorCode:'5'})
                }


            }
            
        });
    });

    return router;
};
