//初始化服务器
var express = require('express');
var contextPath  = process.cwd();
var apiServer = require('./api_server.js');


module.exports = {
    init: function(){
        var app = express();
        var router = express.Router();

        app.use("/static",express.static(contextPath+"/dist"));
        var server = app.listen(3000, function () {
            var host = server.address().address;
            var port = server.address().port;
            console.log('start sever on '+host+':'+port);
        });
        apiServer(app);
        app.get('/*', function (req, res) {
            res.sendfile(contextPath+'/dist/root.html');
        });

    }
};