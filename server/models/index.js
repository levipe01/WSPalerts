/* eslint-disable max-len */
/* eslint-disable no-console */

const axios = require('axios').default;
const config = require('../../config.js');
const Request = require('request-promise-native');

module.exports = {
  addAlert: (ticker) => {
    Request({
      method: 'POST',
      url: 'https://cloud.iexapis.com/stable/rules/create',
      json: {
        token: `${config.app.api}`,
        ruleSet: `${ticker}`,
        type: 'any',
        ruleName: 'My Rule',
        conditions: [
          ['changePercent', '<', -1.0],
          ['latestPrice', '<', 100],
        ],
        outputs: [
          {
            frequency: 60,
            method: 'webhook',
            url: 'https://361efae28ccf.ngrok.io/webhooks',
          },
        ],
      },
    }).then((res) => res)
      .catch((err) => console.log(err));
  },
};

// module.exports = {
//   addAlert: (ticker) => {
//     const options = {
//       token: `${config.app.api}`,
//       ruleSet: `${ticker}`,
//       type: 'any',
//       ruleName: 'My Rule',
//       conditions: [
//         ['changePercent', '>', 0.5],
//         ['latestPrice', '<', 100],
//       ],
//       outputs: [
//         {
//           frequency: 30,
//           method: 'webhook',
//           url: 'http://8d1a6ce9d72a.ngrok.io',
//         },
//       ],
//     };
//     console.log(options)
//     axios.post('https://cloud.iexapis.com/stable/rules/create', options)
//       .then((res) => res)
//       .catch((err) => console.log(err));
//   },
// };
