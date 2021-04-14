const fs = require('fs');
const inputFileName = 'outputYYY_1.txt';

const stream = fs.createReadStream(inputFileName, {flags: 'r', encoding: 'utf-8'});

const outputFileName = 'outputYYY_1.txt';
let count_ev_data = 0;
let isWriting = false;
stream.on('data', function (d) {
  const d_str = d.toString();
  const str_user = ',"user":';
  if (d_str.indexOf(str_user) >= 0) {
    console.log('found node "user"!');
    const cut = d_str.slice(d_str.indexOf(str_user)+str_user.length)
  }
  if (d_str.indexOf(',"fakeData":') >= 0) {
    console.warn('found node "fakeData"!');
  }
  if ((count_ev_data++) % 10000 === 0) {
    console.log(`count_ev_data=${count_ev_data}`);
  }
});

stream.on('close', function(d) {
  console.log('Stream closed !')
});

stream.on('open', function(d) {
  console.log('Stream open !');
});
