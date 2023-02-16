const { response, request } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const generateJWT = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User / Password are not correct - email',
      });
    }

    // Verify if the user is active
    if (!user.state) {
      return res.status(400).json({
        msg: 'User / Password are not correct - state: false',
      });
    }

    // Verify the password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password are not correct - password',
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      msg: 'login',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong, please contact the administrator',
    });
  }
};

module.exports = {
  login,
};
