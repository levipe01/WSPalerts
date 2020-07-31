const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

const sourceDataFile = path.resolve(__dirname, './bull_bear_source_data.csv');

const sourceData = [];
let i = 0;

fs.createReadStream(sourceDataFile)
  .pipe(csv())
  .on('data', (row) => {
    sourceData[i] = Object.values(row);
    i += 1;
  })
  .on('end', () => {
    console.log('CSV file successfully processed', sourceData);
  });
