/**
   * Created by Apoorva on 11/1/2017.
**/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSessionSchema = new Schema({
	createdAt	: {	type: Date, expires: '1h', default: Date.now},
	email		: { type: String, require: true, unique: true },
	userId 		: {	type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	token		: { type: String }
});

UserSessionSchema.methods.verifyRecord = function ( email, userId ) {
	// return defaultCompare( this.email, email) ;
	return (this.email == email && this.userId == userId);
};

module.exports = mongoose.model('userSession',UserSessionSchema);