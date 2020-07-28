const express = require('express');
const morgan = require('morgan');
const router = require('./router/index.js');
const config = require('../config.js');

const app = express();
const { port } = config.app;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('./client/dist'));
// app.use('/data', router);

app.listen(port, () => console.log('Port:', port));
