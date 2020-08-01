/* eslint-disable max-len */
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');

const sourceDataFile = path.join(__dirname, './bull_bear_source_data.csv');
const bullBearDataFile = path.join(__dirname, './bull_bear_data.csv');
const priceDataFile = path.join(__dirname, './price_data.csv');

const sourceData = [];
const bullBearData = [];
const priceData = [];

let index = 0;

fs.createReadStream(sourceDataFile)
  .pipe(csv())
  .on('data', (row) => {
    sourceData[index] = row;
    index += 1;
  })
  .on('end', () => {
    console.log('CSV file successfully processed!');
    // iterate over all the object keys (tickers) skipping the first column (dates)
    for (let i = 1; i < Object.keys(sourceData[0]).length; i += 1) {
      let j = 0;
      // find the first non null value in the column
      while (sourceData[j][Object.keys(sourceData[j])[i]] === 'null') { j += 1; }
      // set the init value to calculate if initially in bull or bear market
      const initVal = Number(sourceData[j][Object.keys(sourceData[j])[i]]);
      let testVal = initVal;
      // iterate through the column until the 'testVal' is either lost or gained 20% from the init value
      do {
        j += 1;
        testVal = Number(sourceData[j][Object.keys(sourceData[j])[i]]);
        // if it does not meet the criteria of a bull or bear market on that day push into ouput array [date, null, null, ticker]
        if (testVal < initVal * 1.2 && testVal > initVal * 0.8) { bullBearData.push([sourceData[j][Object.keys(sourceData[j])[0]], null, null, Object.keys(sourceData[j])[i]]); }
      } while (testVal < initVal * 1.2 && testVal > initVal * 0.8);
      // once the initial bull or bear market has been found set the boolean currBull to detrmine if in bull market
      let currBull = (testVal > initVal * 1.2);
      // based of if it is in a bull or bear market set the reversal target needed to switch to inverse market
      let reversalTarget = (currBull) ? Number(sourceData[j][Object.keys(sourceData[j])[i]]) * 0.8 : Number(sourceData[j][Object.keys(sourceData[j])[i]]) * 1.2;
      // set current bull/bear run to 0
      let currRun = 0;
      // set endRun boolean trap to false
      let endRun = false;

      // iterate through the rest of the data in column
      while (j < sourceData.length) {
        testVal = Number(sourceData[j][Object.keys(sourceData[j])[i]]);
        // if currently in bull and meets criteria for reversal => toggle boolean, recalc reversal target, endRun = true
        if (currBull === true && (testVal <= reversalTarget)) {
          currBull = false;
          reversalTarget = testVal * 1.2;
          endRun = true;
        // if currently in bear and meets criteria for reversal => toggle boolean, recalc reversal target, endRun = true
        } else if (currBull === false && (testVal >= reversalTarget)) {
          currBull = true;
          reversalTarget = testVal * 0.8;
          endRun = true;
        // if currently in bull and recent high is surpassed => recalc reversal target
        } else if (currBull === true && (testVal > (reversalTarget / 80) * 100)) {
          reversalTarget = testVal * 0.8;
        // if currently in bear and recent low is surpassed => recalc reversal target
        } else if (currBull === false && (testVal < (reversalTarget / 120) * 100)) {
          reversalTarget = testVal * 1.2;
        }
        // otherwise bull boolean and reversal target stay the same, increment currRun count
        currRun += 1;
        // if endRund is true set currRun to 1
        currRun = endRun ? 1 : currRun;

        // aggregate bull/bear results into comma seperated line and push into array
        let line = `${sourceData[j][Object.keys(sourceData[j])[0]]}, ${currBull}, ${reversalTarget}, ${currRun}, ${Object.keys(sourceData[j])[i]}`;
        line = (i === 1 && j === 0 ? `data:text/csv;charset=utf-8,${line}` : line);
        bullBearData.push(line);

        // aggregate price results into comma seperated line and push into array
        let price = `${sourceData[j][Object.keys(sourceData[j])[0]]}, ${testVal}, ${Object.keys(sourceData[j])[i]}`;
        price = (i === 1 && j === 0 ? `data:text/csv;charset=utf-8,${price}` : price);
        priceData.push(price);

        endRun = false;
        j += 1;
      }
    }

    console.log('Data transformed!');
    // join arrays with line break
    const data = bullBearData.join('\n');
    // write data to output file
    fs.writeFile(bullBearDataFile, data, 'utf8', (err) => {
      if (err) throw err;
      console.log('Bull Bear File has been saved!');
    });

    // join arrays with line break
    const closes = priceData.join('\n');
    // write data to output file
    fs.writeFile(priceDataFile, closes, 'utf8', (err) => {
      if (err) throw err;
      console.log('Pricing File has been saved!');
    });
  });
