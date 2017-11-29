/**
 * Created by Apoorva on 11/13/2017.
 **/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = Schema({
	courseId		: {type: String, require: true},
	userId			: {type: String, require: true},
	userName		: {type: String, default: 'Anonymous'},
	term			: {type: String, default: 'Unknown'},
	review 			: [{questionId: String, rating: String, text: String, question: String}],
	avgStarRating	: {type: String, require: true},
	generalReview	: {type: String, require: true}
});

module.exports = mongoose.model('reviews', reviewSchema);