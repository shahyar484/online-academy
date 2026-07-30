const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');

const academyController = require('./academy.controller');

const validate = require('../../middlewares/validate');

const {createAcademySchema} = require('./academy.validation');

router.post(
    '/',
    auth,
    validate(createAcademySchema),
    academyController.create
);

module.exports = router;