const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    const secret = process.env.SECRETORPRIVATEKEY;

    const options = {
      expiresIn: '4h',
    };

    const resolvePromise = (err, token) => {
      if (err) {
        console.log(err);
        reject('Could not generate the token');
      } else {
        resolve(token);
      }
    };

    jwt.sign(payload, secret, options, resolvePromise);
  });
};

module.exports = generateJWT;
