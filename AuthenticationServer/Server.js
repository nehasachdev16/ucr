/**
 * Created by Apoorva on 9/26/2017.
 */
var express     = require('express');
var app         = express();
var port        = process.env.PORT || 9090;
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var router      = express.Router();
var appRoutes   = require('./Database/Routes/API')(router);
var path        = require('path');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static( __dirname + '/public'));
// Backend routes will have a /api just to distinguish
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/UCRCredentialManager', function ( err ) {
    if( err ){
        console.log( "1. Not connected to the MongoDb : "+ err );
    }else{
        console.log( "1. Successfully connected to MongoDb");
    }
});

app.get('*',function ( req, res) {
    res.sendFile( path.join( __dirname +  '/public/app/index.html' ));
});

app.listen(port, function () {
    console.log('================ Running UCR Authentication Express server on port ' + port +' ================\n');
});