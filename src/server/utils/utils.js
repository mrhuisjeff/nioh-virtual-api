/**
 * Created by Administrator on 2017/3/1.
 */

module.exports = {
    getApiPath:function(path) {
        return path.substr(path.indexOf('/api'));
    }
};