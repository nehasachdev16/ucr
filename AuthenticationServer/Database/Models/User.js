/**
 * Created by Apoorva on 9/27/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    identity: {type: String, default: 'student'}
})


UserSchema.pre("save", function (next) {
    var user = this;
    bcrypt.hash( user.password, null, null, function (err, hash) {
        if( err ) return next( err );
        user.password = hash;
        next();
    })
});

//validate password
UserSchema.methods.comparePassword = function( password ){
    return bcrypt.compareSync( password, this.password );
};

module.exports = mongoose.model('User',UserSchema);


///////////////// Sample /////////////////
// var blogSchema = new Schema({
//     title:  String,
//     author: String,
//     body:   String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//         votes: Number,
//         favs:  Number
//     }
// });
