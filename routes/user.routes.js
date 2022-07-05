const { Router } = require('express');
const { check } = require('express-validator');

const {
    isValidRole,
    isEmailAlreadyRegistered,
    existsUserById
} = require('../helpers/db-validators.helper');

const { validateFields } = require('../middlewares/validate-fields.middleware');

const { 
    usersGetAll,
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
} = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGetAll);
router.get('/:id', usersGet);
router.post('/',
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required (length min 6 characters)').isLength({min: 6}),
    check('email', 'Incorrect email').isEmail(),
    check('email').custom(isEmailAlreadyRegistered),
    check('role').custom(isValidRole),
    validateFields,
    usersPost
);
router.put('/:id',
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existsUserById),
    check('role').custom(isValidRole),
    validateFields,
    usersPut
);
router.patch('/:id', usersPatch);
router.delete('/:id',
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existsUserById),
    validateFields,
    usersDelete
);



module.exports = router;