/* eslint-disable no-console */
const model = require('../models/index.js');

module.exports = {
  addAlert: (req, res) => {
    model.addAlert(req.query.ticker)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  webhooks: (req, res) => {
    console.log(req)
    // res.status(200).json(req);
  },
};
