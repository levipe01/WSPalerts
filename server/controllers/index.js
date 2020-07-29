/* eslint-disable no-console */
const rosaenlgPug = require('rosaenlg');
const path = require('path');
const model = require('../models/index.js');

module.exports = {
  addAlert: (req, res) => {
    model.addAlert(req.query.ticker)
      .then((data) => {
        res.status(200).json(data.data);
      })
      .catch(() => {
        res.status(404).json('Error');
      });
  },

  webhooks: (req, res) => {
    const { data } = req.res.req.body;
    const dataDir = path.join(__dirname, '../templates/52_week_high.pug');
    const story = rosaenlgPug.renderFile(dataDir, {
      language: 'en_US',
      ticker: data.set,
      price: data.data.latestPrice,
    });
    console.log(story);
    // res.status(200).json(req);
  },
};
