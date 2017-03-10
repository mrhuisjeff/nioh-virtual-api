var utils = require('./utils/utils.js');
var contextPath  = process.cwd();
var fs = require('fs');

module.exports = function(app){
    app.route('/server/api/:path').get(function(req, res) {
        var path = req.params.path;
        res.send('get info api:'+path);
    })
        .post(function(req, res) {
            var path = req.params.path;
            res.send('edit info api'+path);
        })
        .delete(function(req, res) {
                var path = req.params.path;
                res.send('delete api'+path);
        });

    app.post('/server/upload', function(req,res){
        // 获得文件的临时路径
        var tmp_path = req.files.thumbnail.path;
        // 指定文件上传后的目录 - 示例为"images"目录。
        var target_path = './public/images/' + req.files.thumbnail.name;
        // 移动文件
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // 删除临时文件夹文件,
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
            });
        });
    });

    app.all('/api/:path', function(req,res){
        var path = req.params.path;
        res.send(path);
    });

};