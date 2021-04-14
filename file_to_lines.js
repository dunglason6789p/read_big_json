const fs = require('fs');
const filePath = 'big_json.json';

const stream = fs.createReadStream(filePath, {flags: 'r', encoding: 'utf-8'});

const outputFileName = 'outputLLL_1.txt';
let prev_d_str = '';
let count_ev_data = 0;
let isWriting = false;
stream.on('data', function (d) {
  const d_str = d.toString();
  const joinStr = prev_d_str + d_str;
  if (joinStr.indexOf(',"user":') >= 0) {
    console.log('found node "user"!');
    fs.appendFileSync(outputFileName, prev_d_str);
    fs.appendFileSync(outputFileName, '\n');
    isWriting = true;
  }
  if (isWriting) {
    console.log('Appending...')
    fs.appendFileSync(outputFileName, d_str);
    fs.appendFileSync(outputFileName, '\n');
  }
  if (joinStr.indexOf(',"fakeData":') >= 0) {
    isWriting = false;
    console.warn('found node "fakeData"!');
  }
  if ((count_ev_data++) % 10000 === 0) {
    console.log(`count_ev_data=${count_ev_data}`);
  }
  prev_d_str = d_str;
});

stream.on('close', function(d) {
  console.log('Stream closed !')
});

stream.on('open', function(d) {
  console.log('Stream open !');
});
