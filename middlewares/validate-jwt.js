const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJTW = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Token is not valid - user does not exist in DB',
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: 'Token is not valid - user with state: false',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};

module.exports = {
  validateJTW,
};
