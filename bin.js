'use strict'

const spark = require('.');
const figlet = require('figlet');
const fs = require('fs');

const options = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const prog = JSON.parse(fs.readFileSync('./package.json', 'utf8'));


function Line(length, char) {
    let str = '';
    for (let i = 0; i < length; i++) {  str += char; }
    return str;
};

function Logo() {
  figlet('SPARK', function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log('\x1b[31m%s\x1b[0m',data)
    console.log(prog.name, 'v.'+prog.version, 'by '+prog.author, prog.license, '2019');
    console.log(Line(process.stdout.columns, '_'));
    console.log(`Watching for file changes on ${options.path}`);
  });
  return true;
};

Logo();
spark(options);
