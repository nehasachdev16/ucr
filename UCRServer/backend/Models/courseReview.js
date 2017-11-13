/**
 * Created by Neha on 11/02/2017
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//var SchemaTypes = mongoose.Schema.Types;
var courseReview = new Schema({
    id: {type: String, require: true, unique: true},
    courseNameID: {type: String, require: true},
    name: {type: String},
    email: {type: String},
    term: {type: String, require: true},
    dateReview: {type: Date, require: true},
    generalReview: {type: String, require:true},
    Q1:         {type: Object, require: true},
    Q2:         {type: Object, require: true},
    Q3:         {type: Object, require: true},
    Q4:         {type: Object, require: true},
    Q5:         {type: Object, require: true},
    //Apoorva take average and insert while saving to db
    avgStarRating: {type:Number, require:true}
});

module.exports = mongoose.model('course',courseReview);