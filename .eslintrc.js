/**
 * These rules enforce the Airbnb Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/airbnb/javascript
 */

module.exports = {
                  'extends': [
                    "airbnb-base",
                    'plugin:react/recommended',
                  ],
                  "rules": {
                    "no-console": "off",
                    'max-len': ["error", { "code": 130 }],
                  },
                  "parser": "babel-eslint",
                  "env": {
                    "browser": true,
                    "node": true
                  },
                  };