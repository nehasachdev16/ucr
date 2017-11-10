/**
 * Created by Apoorva on 11/8/2017.
 **/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserDetailsSchema = new Schema({
	userId: {type: String, require: true},
	lastLogin: {type: Date},
	lastAjaxCall: {type: Date},
	listOfCourses: [{ courseId: String, courseName: String }]
});

module.exports = mongoose.model('user_details', UserDetailsSchema);