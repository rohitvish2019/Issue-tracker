const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
router.get('/create', projectController.create);
router.post('/create-new', projectController.createNew);
router.get('/description/:id', projectController.description);
module.exports = router;