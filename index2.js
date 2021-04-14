const {chain}  = require('stream-chain');

const {parser} = require('stream-json');
const {pick}   = require('stream-json/filters/Pick');
const {ignore} = require('stream-json/filters/Ignore');
const {streamValues} = require('stream-json/streamers/StreamValues');

const fs   = require('fs');

const pipeline = chain([
  fs.createReadStream('big_json.json'),
  parser(),
  streamValues(),
  data => {
    console.log("DONE???");
    const value = data.value;
    // keep data only for the accounting department
    return value && value.department === 'accounting' ? data : null;
  }
]);

let counter = 0;
pipeline.on('data', () => ++counter);
pipeline.on('end', () =>
  console.log(`The accounting department has ${counter} employees.`));
