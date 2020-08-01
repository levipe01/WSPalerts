/* eslint-disable max-len */
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

const sourceDataFile = path.join(__dirname, './bull_bear_source_data.csv');

const sourceData = [];
const bullBearData = [];
let i = 0;

fs.createReadStream(sourceDataFile)
  .pipe(csv())
  .on('data', (row) => {
    sourceData[i] = row;
    i += 1;
  })
  .on('end', () => {
    for (let j = 0; j < sourceData.length; j += 1) {
      for (let k = 1; k < Object.keys(sourceData[j]).length; k += 1) {
        const curr = sourceData[j][Object.keys(sourceData[j])[k]];
        sourceData[j][Object.keys(sourceData[j])[k]] = (curr === 'null') ? null : Number(curr);
      }
    }

    for (let l = 1; l < Object.keys(sourceData[0]).length; l += 1) {
      let m = 0;
      while (sourceData[m][Object.keys(sourceData[m])[l]] === null) { m += 1; }
      let anchorVal = sourceData[m][Object.keys(sourceData[m])[l]];
      let testVal = anchorVal;

      do {
        m += 1;
        testVal = sourceData[m][Object.keys(sourceData[m])[l]];
        (testVal < anchorVal * 1.2 && testVal > anchorVal * 0.8) ? bullBearData.push([sourceData[m][Object.keys(sourceData[m])[0]], null, null, Object.keys(sourceData[m])[l]]) : null;
      } while (testVal < anchorVal * 1.2 && testVal > anchorVal * 0.8);
      let currBull = (testVal > anchorVal * 1.2);
      let reversalTarget = (currBull) ? sourceData[m][Object.keys(sourceData[m])[l]] * 0.8 : sourceData[m][Object.keys(sourceData[m])[l]] * 1.2;
      while (m < sourceData.length) {
        testVal = sourceData[m][Object.keys(sourceData[m])[l]];
        if (currBull === true && (testVal <= reversalTarget)) {
          currBull = false;
          reversalTarget = testVal * 1.2;
        } else if (currBull === false && (testVal >= reversalTarget)) {
          currBull = true;
          reversalTarget = testVal * 0.8;
        } else if (currBull === true && (testVal > (reversalTarget / 80) * 100)) {
          reversalTarget = testVal * 0.8;
        } else if (currBull === false && (testVal < (reversalTarget / 120) * 100)) {
          reversalTarget = testVal * 1.2;
        }
        bullBearData.push([sourceData[m][Object.keys(sourceData[m])[0]], currBull, reversalTarget, Object.keys(sourceData[m])[l]]);
        m += 1;
      }
    }
    console.log('CSV file successfully processed');
  });
