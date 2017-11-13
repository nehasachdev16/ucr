/**
 * Created by Neha on 10/31/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announcementSchema = new Schema({
    courseId : {type: String, require: true, unique: true},
    courseName: {type: String, require:true},
    courseInfo: {type: String},
    examInfo : {type:String},
    officeInfo: {type: String},
    moreInfo: {type:String}
});

module.exports = mongoose.model('announcement',announcementSchema);

