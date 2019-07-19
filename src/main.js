const fs = require("fs");
const path = require('path');
const ReadDevice = require('./readDevice/readDevice');

// const fileSrc = `C:\\avis1.txt`;
const fileSrc = './assets/avis1.txt';

function readJsonData(callback) {
    let t = path.parse(fileSrc);
    console.log(t);
    fs.readFile(fileSrc, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var s = data.toString();
            let resultStr = ReadDevice.analyzeStr(s);
            callback && callback(resultStr);
        }
    });
}

module.exports.readJsonData = readJsonData;