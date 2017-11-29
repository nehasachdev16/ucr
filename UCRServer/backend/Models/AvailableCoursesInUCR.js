/**
 * Created by Apoorva on 11/13/2017.
 **/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var availableCourseSchema = new Schema({
	courseId: {type: String, require: true, unique: true},
	courseName: {type: String, require: true}
});

module.exports = mongoose.model('available_courses_in_UCR', availableCourseSchema);