/**
 * Created by Administrator on 2017/3/8.
 */
import fetch from 'node-fetch';
import FormData from 'form-data';

const client = function(options) {
    var clientOption = Object.assign({},cilent.cilentOption,options);

    fetch(clientOption.url, { method: 'POST', body: form, headers: form.getHeaders() }).then((req)=>{
        if (clientOption.complete) {
            clientOption.complete(req);
        }
        if (req.ok) {
            if(clientOption.success) {
                clientOption.success(req.json());
            }
        } else {
            console.error('Network response was not ok.');
        }
    }).catch((req)=>{
        if (clientOption.error) {
            clientOption.error(req);
        }
    });
};

client.prototype.optionsDefault = {
    method:'GET'
};

module.exports = {

};
