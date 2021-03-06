/**
 * Created by Neha on 10/31/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var availableCourseSchema = new Schema({
    //courseId: {type: String, require: true, unique: true},
    courseNameID: {type: String, require: true,unique:true},
    courseInfo: {type: String},
    examInfo : {type:String},
    officeInfo: {type: String},
    moreInfo: {type:String}
});

module.exports = mongoose.model('announce',availableCourseSchema);