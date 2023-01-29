const { response, request } = require('express');

const usersGet = (req, res = response) => {
  const { q, name = 'no name', apikey } = req.query;
  res.json({
    msg: 'api World - Controller',
    q,
    name,
    apikey,
  });
};

const usersPost = (req = request, res = response) => {
  const { name, age } = req.body;

  res.status(201).json({
    msg: 'post World - Controller',
    name,
    age,
  });
};

const usersPut = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'put World - Controller',
    id,
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

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};
