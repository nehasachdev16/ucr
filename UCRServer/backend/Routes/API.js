/**
 * Created by Apoorva on 10/16/2017.
 */
var Available_courses = require('../Models/AvailableCourses');
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

    return router;
};