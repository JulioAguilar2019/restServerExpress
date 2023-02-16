const { Router } = require('express');

const { check } = require('express-validator');

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
} = require('../controllers/user.controller');

const {
  isValidRole,
  emailExist,
  userExistById,
} = require('../helpers/database-validators');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJTW } = require('../middlewares/validate-jwt');

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

router.put(
  '/:id',
  [
    [
      check('id', 'id is not a mongoID').isMongoId(),
      check('id').custom(userExistById),
      check('role').custom(isValidRole),
      check('email', 'email invalid').isEmail(),
      check('name', 'name is required').not().isEmpty(),
      check('password', 'must have 6 letters or more').isLength({ min: 6 }),
      validateFields,
    ],
  ],
  usersPut
);

router.delete(
  '/:id',
  [
    validateJTW,
    check('id', 'id is not a mongoID').isMongoId(),
    check('id').custom(userExistById),
    validateFields,
  ],
  usersDelete
);

router.patch('/', usersPatch);

module.exports = router;
