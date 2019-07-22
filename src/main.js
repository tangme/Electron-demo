const fs = require("fs");
const path = require('path');
const ReadDevice = require('./readDevice/readDevice');

const fileSrc = `C:\\avis1.txt`;
// const fileSrc = './assets/avis1.txt';

function readJsonData(callback) {
    let t = path.parse(fileSrc);
    console.log(t);
    fs.readFile(fileSrc, (err, data) => {
        if (err) {
            if(err.errno == -4058){
                callback && callback({code:0,msg:`未找到指定文件：${err.path}`});
            }else{
                callback && callback({ code: 0, msg: err.message });
            }
            console.log(err);
        } else {
            var s = data.toString();
            let resultStr = ReadDevice.analyzeStr(s);
            callback && callback({ code: 1, data: resultStr});
        }
    });
}

module.exports.readJsonData = readJsonData;