const { response, request } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const generateJWT = require('../helpers/generate-jwt');
const { googleVerifyToken } = require('../helpers/google-verify');

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

const googleSingIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, picture, name } = await googleVerifyToken(id_token);

    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user
      const data = {
        name,
        email,
        password: 'defaultPassword',
        picture,
        google: true,
        role: 'USER_ROLE',
      };

      user = new User(data);
      await user.save();
    }

    // If the user is not active
    if (!user.state) {
      return res.status(401).json({
        msg: 'User / Password are not correct - state: false',
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      msg: 'googleSingIn',
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
  googleSingIn,
};
