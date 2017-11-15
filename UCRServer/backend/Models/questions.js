/**
 * Created by Neha on 10/31/2017.
 * Updated by Apoorva on 11/13/2017
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = new Schema({
	question: {type: String, require: true, unique: true}
});

module.exports = mongoose.model('questions', questionsSchema);