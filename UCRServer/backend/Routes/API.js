/**
 * Created by Apoorva on 10/16/2017.
 */
var Available_courses = require('../Models/AvailableCourses');
var AllOfferedCourse = require('../Models/AllCourses');
var UserDetails = require('../Models/userDetails');

module.exports = function( router ) {
	
	router.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	
	// 1. /add_to_available_courses is meant as an internal BE call - to be called when a new course starts to have
	//     reviews in it
	router.post('/add_to_available_courses', function (req,res) {
		var ac = new Available_courses();
		
		if( req.body.courseId || req.body.courseName ) {
			ac.courseId = req.body.courseId;
			ac.courseName = req.body.courseName;
			ac.save(function (err) {
				if (req.body.courseId == null || req.body.courseId == '' ||
					req.body.courseName == null || req.body.courseName == ''
				) {
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
	
	return router;
};