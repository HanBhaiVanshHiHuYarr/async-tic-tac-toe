const express = require('express')
const router = express.Router();
const gameController = require('../controllers/gameController')


router.get('/home/:username',gameController.allusers)
router.post('/creategame', gameController.createController)
router.put('/updategame', gameController.updateController)

module.exports = router;
