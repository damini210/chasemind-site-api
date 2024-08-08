const express = require('express');
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/contacts',authMiddleware, contactController.listContacts);
router.post('/contacts', contactController.createContact);


module.exports = router;
