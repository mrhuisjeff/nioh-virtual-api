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
        // ����ļ�����ʱ·��
        var tmp_path = req.files.thumbnail.path;
        // ָ���ļ��ϴ����Ŀ¼ - ʾ��Ϊ"images"Ŀ¼��
        var target_path = './public/images/' + req.files.thumbnail.name;
        // �ƶ��ļ�
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // ɾ����ʱ�ļ����ļ�,
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