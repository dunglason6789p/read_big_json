const StreamObject = require('stream-json/streamers/StreamObject');
const path = require('path');
const fs = require('fs');

const jsonStream = StreamObject.withParser();

let countUser = 0;
jsonStream.on('data', ({key, value}) => {
  //console.log(key);
  countUser++;
  if (countUser % 1000 === 0) {
    console.log(countUser);
  }
});

jsonStream.on('end', () => {
  console.log('All done');
  console.log(`countUser=${countUser}`);
});

jsonStream.on('error', error => {
  console.error(error);
  console.log(`countUser=${countUser}`);
});

const inputFileName = 'input.json';
fs.createReadStream(inputFileName).pipe(jsonStream.input);
