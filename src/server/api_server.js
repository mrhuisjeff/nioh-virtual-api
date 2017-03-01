var utils = require('./utils/utils.js');

var contextPath  = process.cwd();
module.exports = function(app){
    app.route('/server/api/*').get(function(req, res) {
        var path = utils.getApiPath(req.path);
        res.send('get info api:'+path);
    })
        .post(function(req, res) {
            var path = utils.getApiPath(req.path);
            res.send('edit info api'+path);
        })
        .delete(function(req, res) {
                var path = utils.getApiPath(req.path);
                res.send('delete api'+path);
        });

    app.all('/api/*', function(req,res){
        var path = utils.getApiPath(req.path);
        res.send(path);
    });

};