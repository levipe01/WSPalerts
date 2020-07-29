/* eslint-disable no-console */
const model = require('../models/index.js');

module.exports = {
  addAlert: (req, res) => {
    model.addAlert(req.query.ticker)
      .then((data) => {
        res.status(200).send(data.data);
      })
      .catch(() => {
        res.status(404).json('Error');
      });
  },

  webhooks: (req, res) => {
    console.log(req.res.req.body.data);
    // res.status(200).json(req);
  },
};
