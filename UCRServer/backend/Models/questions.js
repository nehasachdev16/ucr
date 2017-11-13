/**
 * Created by Neha on 10/31/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = new Schema({
    Question : {type:Object,require:true}
});

module.exports = mongoose.model('questions',questionsSchema);