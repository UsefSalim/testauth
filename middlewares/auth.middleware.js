const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.admin = (req, res, next) => {
  res.role = 'Admin';
  next();
};
exports.user = (req, res, next) => {
  res.role = 'User';
  next();
};

exports.auth = async (req, res, next) => {
  const token = req.cookies.logToken;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (!err && decodedToken.data.role === res.role) {
        // console.log(decodedToken.data.id);
        res.currentUser = await User.findOne({
          _id: decodedToken.data.id,
        }).select('-password');
        next();
      } else {
        res.cookie('token', '', { maxAge: 1 });
        return res.status(401).json(`private root need  login`);
      }
    });
  } else {
    res.cookie('token', '', { maxAge: 1 });
    return res.status(400).json(`private root need  login`);
  }
};
