const { Router } = require('express');
const { check } = require('express-validator');
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require('../controllers/user.controller');
const { isValidRole, emailExist } = require('../helpers/database-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', usersGet);

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'must have 6 letters or more').isLength({ min: 6 }),
    check('email', 'email invalid').isEmail(),
    check('email').custom(emailExist),
    // check('role', 'is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields,
  ],

  usersPost
);

router.put('/:id', usersPut);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;
