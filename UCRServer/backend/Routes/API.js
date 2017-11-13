/**
 * Created by Neha on 10/16/2017.
 */
<<<<<<< Updated upstream
var Available_courses = require('../Models/AvailableCourses');

var AllOfferedCourse = require('../Models/AllCourses');
var UserDetails = require('../Models/userDetails');
var Course_Reviews = require('../Models/courseReview');
var Question_Schema = require('../Models/questions');
=======
var Available_courses 	= require('../Models/AvailableCourses');
var AllOfferedCourse 	= require('../Models/AllCourses');
var UserDetails 		= require('../Models/userDetails');
var Reviews 			= require('../Models/review');
>>>>>>> Stashed changes

module.exports = function( router ) {
	
	router.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	
	// 1. /add_to_available_courses is meant as an internal BE call - to be called when a new course starts to have
	//     reviews in it

	
	//2. /get_available_courses is meant to return all the courses for which reviews are available
	router.get('/get_available_courses',function (req,res) {
		Available_courses.find({}).select('-_id courseId courseName').exec( function (err, result) {
			if( err ) throw err;
			if( !result ){
				res.json({success:false, message: "no data to fetch"})
			}
			res.json( {success:true, data: result} );
		});
	});
	
	//3. Dump of all the offered courses - Takes in a JSON of multiple courses and inserts into table 'all_offered_courses'
	router.post('/dump_all_offered_courses', function ( req, res ) {
		var success = 0;
		for( var i=0; i<req.body.length; i++ ){
			var oc = new AllOfferedCourse();
			if( req.body[i]["courseId"] || req.body[i]["courseName"] ) {
				oc.courseId = req.body[i]["courseId"];
				oc.courseName = req.body[i]["courseName"];
				
				if (req.body[i]["courseId"]== null || req.body[i]["courseId"] == '' ||
					req.body[i]["courseName"] == null || req.body[i]["courseName"] == '' ) {
					res.json({success: false, message: "Some fields empty"});
				} else {
					oc.save(function (err) {
						if (err) {
							throw err;
						} else {
							success += 1;
						}
					});
				}
			}else{
				res.json({success:false, message: "Required fields are missing"});
			}
		}
		if( success === req.body.length ){
			res.json({success: true, message: "All rows inserted"});
		}else{
			res.json({success: false, message: "Some rows may already be present"});
		}
	});
	
	//4. Get all the offered courses - to get each user to add into the list of reviews he wants to see or give
	router.get('/get_offered_courses',function (req,res) {
		AllOfferedCourse.find({}).select('-_id courseId courseName').exec( function (err, result) {
			if( err ) throw err;
			if( !result ){
				res.json({success:false, message: "no data to fetch"})
			}
			res.json( {success:true, data: result} );
		});
	});
	
	//5. Add a course to write a review or see reviews
	router.post('/add_course_to_review_list',function (req,res) {
		UserDetails.findOne({userId: req.body.userId}).exec( function ( err, user ) {
			if (err) throw err;

			if( !user ){
				ud = new UserDetails();
				ud.userId = req.body.userId;
				ud.listOfCourses = [{courseId: req.body.courseId, courseName: req.body.courseName}];
				ud.save( function ( err ) {
					if (err) throw err;
					else{
						res.json({success:true, data: ud.listOfCourses, message: "added a new user - need not be done, new row should be added while login"});
					}
				})
			}else{
				if( user.listOfCourses.some(function (t) { return t.courseId === req.body.courseId }) ){
					res.json({success: false, message: "course already exists"});
				}else{
					user.listOfCourses.push( {courseId: req.body.courseId, courseName: req.body.courseName } );
					user.save( function ( err ) {
						if ( err ) throw err;
						else {
							res.json( {success: true, data: user.listOfCourses, message: "update made to the existing value"} );
						}
					});
					
				}
			}

		})
	});
	
	//6. Get all the courses added by a user
	router.post('/get_course_to_review_list',function (req,res) {
		UserDetails.findOne({userId: req.body.userId }).select('listOfCourses').exec( function (err, result) {
			if( err ) throw err;
			if( !result || result == null){
				res.json({success:false, message: "no data to fetch"})
			}else{
				res.json( {success:true, data: result.listOfCourses} );
			}
		});
	});
	
	//7. Remove a course for a user
	router.post('/delete_course_from_review_list', function ( req, res ) {
		UserDetails.findOne({userId: req.body.userId }).select('listOfCourses').exec( function (err, result) {
			if( err ) throw err;
			console.log( result );
			if( !result || result == null){
				res.json({success:false, message: "no data to fetch"})
			}else{
				console.log( result );
				var index = result.listOfCourses.findIndex( function(x){ if( x.courseId === req.body.courseId) return x } );
				if( index === -1 ){
					res.json({success: false, message: "No element to delete"});
				}else{
					result.listOfCourses.splice( index, 1);
					result.save( function ( err ) {
						if ( err ) throw err;
						else {
							res.json( {success: true, data: result.listOfCourses, message: "update made to the existing value"} );
						}
					});
				}
			}
		});
	});
	
<<<<<<< Updated upstream





    router.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //1. Add the announcement details in the Database
    router.post('/add_to_available_courses', function (req,res) {
        var ac = new Available_courses();

        if( req.body.courseNameID) {
            ac.courseId = req.body.courseId;
            ac.courseInfo = req.body.courseInfo;
            ac.examInfo = req.body.examInfo;
            ac.moreInfo = req.body.moreInfo;
            ac.courseNameID = req.body.courseNameID;
            ac.officeInfo = req.body.officeInfo;
            ac.save(function (err) {
                if (
                    req.body.courseNameID == null || req.body.courseNameID == '') {
                    res.json({success: false, message: "Some fields empty"});
                } else {
                    if (err) {
                        res.json({success: false, message: "Course Already exists"})
                    } else {
                        res.json({success: true, message: 'new user created'});
                    }
                }
            })
        }else{
            res.json({success:false, message: "Required fields are missing"});
        }
    });

    //2) Getting the Announcement Details and displaying
    router.post('/get_announcement',function (req,res) {

        Available_courses.find({"courseNameID":req.body.courseName}).exec( function (err, result) {
            if( err ) throw err;
            if( !result ){
                res.json({success:false, message: "no data to fetch"})
            }

            res.json( {success:true, data: result} );
        });
    });

   // 3) Adding the Course Reviews

    router.post('/add_courseReview_Student', function (req,res) {
        var cr = new Course_Reviews();


        //var date = new Date(req.body.dateReview);
        if( req.body.courseNameID || req.body.id || req.body.term  || req.body.Q1 || req.body.Q2
        || req.body.Q3 || req.body.Q4 || req.body.Q5 || req.body.avgStarRating || req.body.generalReview) {

           cr.courseNameID=req.body.courseNameID;
           cr.id=req.body.id;
           cr.name=req.body.name;
           cr.email = req.body.email;
           cr.dateReview=req.body.dateReview;
           cr.term=req.body.term;
           cr.Q1 = req.body.Q1;
           cr.Q2 = req.body.Q2;
           cr.Q3 = req.body.Q3;
           cr.Q4 = req.body.Q4;
           cr.Q5 = req.body.Q5;
           cr.avgStarRating = req.body.avgStarRating;

            cr.save(function (err) {
                if (req.body.courseNameID == null || req.body.courseNameID == '' || req.body.id == null || req.body.id=='' ||
                req.body.term == null || req.body.term=='' || req.body.Q1==null || req.body.Q2==null || req.body.Q3==null
                || req.body.Q4==null || req.body.Q5==null || req.body.avgStarRating == '' || req.body.avgStarRating== null || req.body.generalReview == null
                || req.body.generalReview =='') {
                    res.json({success: false, message: "Some fields empty"});
                } else {
                    if (err) {
                        res.json({success: false, message: "Same Record Exists"})
                    } else {
                        res.json({success: true, message: 'new review created'});
                    }
                }
            })
        }else{
            res.json({success:false, message: "Required fields are missing"});
        }
    });

    //Getting the course Reviews on basis of a courseNameID , eg CSCI 585 Database Systems
    router.post('/get_courseReview',function (req,res) {

        Course_Reviews.find({"courseNameID":req.body.courseNameID}).exec( function (err, result) {
            if( err ) throw err;
            if( !result ){
                res.json({success:false, message: "no data to fetch"})
            }

            res.json( {success:true, data: result} );
        });
    });

    router.post('/get_questions',function (req,res) {

        Question_Schema.find().exec( function(err,result){
            if( err ) throw err;
            if(!result){
                res.json({success:false, message: "no data to fetch"})
            }
            res.json( {success:true, data: result} );
        });

    });
    return router;

=======
	//8. Add a new review
	router.post('/add_new_review', function ( req, res ) {
		var review = new Reviews();
		if( req.body.courseId == null || req.body.courseId == '' ||
			req.body.userId == null || req.body.userId == '' ||
			req.body.review.length == 0
		){
			console.log( req.body.courseId );
			console.log( req.body.userId );
			console.log( req.body.review.length );
			res.json({success: false, message: "Required fields are mmissing"});
		}else{
			review.courseId 	= req.body.courseId;
			review.userId	 	= req.body.userId;
			if( req.body.userName == null || req.body.userName == ''){
				review.userName	= req.body.userName;
			}
			if( req.body.term == null || req.body.term == ''){
				review.term		= req.body.term;
			}
			review.review 		= req.body.review;
			review.save( function ( err ) {
				if( err ) throw err;
				res.json({success: true, message: "Inserted on review"});
			})
		}
	});
	
	return router;
>>>>>>> Stashed changes
};