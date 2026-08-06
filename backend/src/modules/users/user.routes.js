const express = require('express');

const auth = require('../../middlewares/auth');
const userController = require('./user.controller');

const router = express.Router();

router.get(
    '/me',
    auth,
    userController.me
);

module.exports = router;