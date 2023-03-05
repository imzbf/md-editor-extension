let fs = require('fs');
let path = require('path');

exports.removeDir = (dirpath) => {
  let fileList = fs.readdirSync(dirpath);
  fileList.forEach((x) => {
    let p = path.resolve(dirpath, x);
    let pinfo = fs.statSync(p);
    if (pinfo.isFile()) {
      fs.unlinkSync(p);
    } else if (pinfo.isDirectory()) {
      removeDir(p);
    }
  });
  fs.rmdirSync(dirpath);
};
