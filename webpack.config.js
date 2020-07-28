const path = require('path');

module.exports = {
  context: __dirname,
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: path.join(__dirname, 'client/src'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
};