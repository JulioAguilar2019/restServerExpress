const { response, request } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');

const usersGet = (req, res = response) => {
  const { q, name = 'no name', apikey, page = 1, limit } = req.query;
  res.json({
    msg: 'api World - Controller',
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const usersPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  user.password = await encryptPassword(password);

  await user.save();

  res.status(201).json({
    user,
  });
};

const usersPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    rest.password = await encryptPassword(password);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    msg: 'put World - Controller',
    user,
  });
};

const usersDelete = (req = request, res = response) => {
  res.json({
    msg: 'delete World - Controller',
  });
};

const usersPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch World - Controller',
  });
};

const encryptPassword = async (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};
