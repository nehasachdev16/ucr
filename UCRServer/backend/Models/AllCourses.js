/**
 * Created by Apoorva on 11/7/2017.
 **/
//This may not be needed, this is a current manual dump of all the available courses - ie courses offered
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var allCourseSchema = new Schema({
	courseId: {type: String, require: true, unique: true},
	courseName: {type: String, require: true}
});

module.exports = mongoose.model('all_offered_courses',allCourseSchema);