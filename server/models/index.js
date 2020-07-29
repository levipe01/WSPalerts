/* eslint-disable max-len */
/* eslint-disable no-console */
const axios = require('axios').default;
const config = require('../../config.js');
const mongo = require('../../database/mongo/index.js');

module.exports = {
  addAlert: (ticker) => {
    const options = {
      token: `${config.app.api}`,
      ruleSet: `${ticker}`,
      type: 'any',
      ruleName: '52_week_high',
      conditions: [
        ['latestPrice', '>', 309.82],
      ],
      outputs: [
        {
          frequency: 30,
          method: 'webhook',
          url: 'https://2750660c5c4d.ngrok.io/addStory',
        },
      ],
      additionalKeys: ['latestPrice', 'peRatio', 'nextEarningsDate'],
    };

    return axios.post('https://cloud.iexapis.com/stable/rules/create', options)
      .then((res) => res)
      .catch((err) => err);
  },

  addStory: (story) => mongo.addStory(story)
    .then((res) => res)
    .catch((err) => err),
};
