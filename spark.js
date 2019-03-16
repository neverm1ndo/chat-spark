'use strict'

const fs = require('fs');
const iconv = require('iconv-lite');


module.exports = function(options) {
  let bite_size = 256,
      readbytes = 0,
      file;

  let lastLineFeed,
      lineArray;
  let valueArray = [];

  fs.open(options.path, 'r', function(err, fd) { file = fd; readfile(); });

  function readfile() {
      let stats = fs.fstatSync(file);
      if (stats.size < readbytes+1) {
          setTimeout(readfile, 1000);
      }
      else {
          fs.read(file, new Buffer(bite_size), 0, bite_size, readbytes, processor);
      }
  }


function processor(err, bytecount, buff) {
    lastLineFeed = iconv.decode(buff, options.encoding).toString().lastIndexOf('\n');
    if (lastLineFeed > -1){
        lineArray = iconv.decode(buff, options.encoding).toString().slice(0,lastLineFeed).split('\n');
        for (let i=0 ; i<lineArray.length; i++){
            valueArray.push(lineArray[i].split(','));
        }
        readbytes+=lastLineFeed+1;
    } else {
        readbytes+=bytecount;
    }
    console.log(valueArray[valueArray.length - 1][0]);
    process.nextTick(readfile);
  }
}
