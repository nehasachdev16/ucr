/**
 * Created by Apoorva on 10/16/2017.
 */

module.exports = function( router ) {

    router.get('/', function (req, res) {
        res.send('Hello world !');
    });

    return router;
};