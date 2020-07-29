/* eslint-disable max-len */
/* eslint-disable no-console */

const axios = require('axios').default;
const config = require('../../config.js');

// const Request = require('request-promise-native');

// module.exports = {
//   addAlert: (ticker) => {
//     Request({
//       method: 'POST',
//       url: 'https://cloud.iexapis.com/stable/rules/create',
//       json: {
//         token: `${config.app.api}`,
//         ruleSet: `${ticker}`,
//         type: 'any',
//         ruleName: 'My Rule',
//         conditions: [
//           ['changePercent', '>', 0.9],
//           ['latestPrice', '<', 100],
//         ],
//         outputs: [
//           {
//             frequency: 60,
//             method: 'webhook',
//             url: 'https://2750660c5c4d.ngrok.io/webhooks',
//           },
//         ],
//       },
//     })
//       .then((res) => {
//         console.log('res', res);
//         return res;
//       })
//       .catch((err) => console.log('err', err));
//   },
// };

module.exports = {
  addAlert: (ticker) => {
    const options = {
      token: `${config.app.api}`,
      ruleSet: `${ticker}`,
      type: 'any',
      ruleName: '52-Week High',
      conditions: [
        ['latestPrice', '>', 399.82],
      ],
      outputs: [
        {
          frequency: 30,
          method: 'webhook',
          url: 'https://2750660c5c4d.ngrok.io/webhooks',
        },
      ],
      additionalKeys: ['latestPrice', 'peRatio', 'nextEarningsDate'],
    };

    return axios.post('https://cloud.iexapis.com/stable/rules/create', options)
      .then((res) => res)
      .catch((err) => err);
  },
};
