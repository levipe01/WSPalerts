const router = require('express').Router();
const controllers = require('../controllers/index.js');

router.post('/stock/alert', controllers.addAlert);
router.post('/addStory', controllers.addStory);

module.exports = router;
