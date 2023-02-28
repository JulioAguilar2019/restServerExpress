const validateFields = require('../middlewares/validate-fields');
const validateJTW = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
  ...validateFields,
  ...validateJTW,
  ...validateRoles,
};
