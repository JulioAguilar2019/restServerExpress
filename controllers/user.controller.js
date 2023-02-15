const { response, request } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');

const usersGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const isActive = { state: true };

  if (isNaN(limit) || isNaN(from)) {
    return res.status(400).json({
      msg: 'limit and from must be numbers',
    });
  }

  const [total, users] = await Promise.all([
    User.countDocuments(isActive),
    User.find(isActive).limit(Number(limit)).skip(Number(from)),
  ]);

  res.json({ total, users });
};

const usersPost = async (req = request, res = response) => {
  const { name, lastName, email, password, role } = req.body;
  const user = new User({ name, lastName, email, password, role });

  user.password = await encryptPassword(password);

  await user.save();

  res.status(201).json({
    user,
  });
};

const usersPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...rest } = req.body;
  if (password) {
    rest.password = await encryptPassword(password);
  }

  const user = await User.findByIdAndUpdate(id, rest);
  res.json({ msg: 'User information updated', user });
};

const usersDelete = async (req = request, res = response) => {
  const { id } = req.params;

  //delete from database (physical delete)
  // const users = await User.findByIdAndDelete(id);

  //change state to false (logical delete)
  const users = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    users,
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
