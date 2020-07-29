const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bullBear');
const db = mongoose.connection;

db.on('error', () => console.log('Error connecting to topTracks database...'));
db.once('open', () => console.log('Connected to topTracks database...'));

const stockSchema = new mongoose.Schema({
  name: String,
  ticker: String,
  bull: Boolean,
  target: Number,
});

const Stock = mongoose.model('Stock', stockSchema);

// will take in a stock object
const addStock = (stock) => {
  const newStock = new Stock(stock);
  return new Promise((resolve, reject) => {
    newStock.save(
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      },
    );
  });
};

module.exports.addStock = addStock;
