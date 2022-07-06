const { check } = require('express-validator');
const Router = require('express');

const { 
    login
} = require('../controllers/auth.controller');

const {
    validateFields
} = require('../middlewares/validate-fields.middleware');

const router = Router();

router.post('/login',
    check('email').isEmail(),
    check('email').notEmpty(),
    check('password').notEmpty(),
    validateFields,
    login
);


module.exports = router;