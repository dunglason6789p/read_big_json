const fs = require('fs');
const filePath = 'big_json.json';

const stream = fs.createReadStream(filePath, {flags: 'r', encoding: 'utf-8'});
let buf = '';

let count_ev_data = 0;
stream.on('data', function (d) {
  const d_str = d.toString();
  buf += d_str; // when data is read, stash it in a string buffer
  if ((count_ev_data++) % 100 === 0) {
    console.log(`count_ev_data=${count_ev_data}, buf.len=${buf.length}`);
  }
});

stream.on('close', function(d) {
  console.log('Stream closed !')
  try {
    const objectFromJson = JSON.parse(buf);
    const userNode = objectFromJson.user;
    const userNodeAsJson = JSON.stringify(userNode);
    fs.writeFileSync('output.json', userNodeAsJson, 'utf-8');
  } catch (e) {
    console.error(e);
  }
});

stream.on('open', function(d) {
  console.log('Stream open !');
});
