const Role = require('../models/role');
const User = require('../models/user.model');

const isValidRole = async (role = '') => {
  const isAValidRole = await Role.findOne({ role });
  if (!isAValidRole) {
    throw new Error(`Role ${role} does not exist`);
  }
};

const emailExist = async (email) => {
  const emailFound = await User.findOne({ email });
  if (emailFound) {
    throw new Error(`Email ${email} already exist`);
  }
};

const userExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`User with id ${id} does not exist`);
  }
};

module.exports = {
  isValidRole,
  emailExist,
  userExistById,
};
