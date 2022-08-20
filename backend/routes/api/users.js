const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('First Name is required'),
    check('lastName')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Last Name is required'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// Log in
router.post(
  '/login',
  validateLogin,
  async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login({ email, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['Invalid credentials'];
      return next(err);
    }

    let token = await setTokenCookie(res, user);
    return res.json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token:token
    })
  }
);

// Log out
router.delete(
  '/my',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Log out success' });
  }
);

// Restore session user
router.get(
'/my',
restoreUser,
(req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject()
    });
  } else return res.json({});
}
);

// Sign up
router.post(
    '/signup',
    validateSignup,
    async (req, res, next) => {
      const { firstName, lastName, email, password } = req.body;

      const existinguser = await User.getOneBy(email)
      if (existinguser){
        const err = new Error('User already exists');
        err.status = 403;
        err.title = 'User already exists';
        err.errors = ['email": "User with that email already exists'];
        return next(err);
      }

      const user = await User.signup({ firstName, lastName, email, password });
      // let token = await setTokenCookie(res, user);
      // user.update({
      //   token: token
      // })

      return res.json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token:token
      })
    }
);

//get current user's spots
router.get(
  '/my/spots',
  restoreUser,
  async (req, res, next) => {
    const { user } = req
    const spots = await user.getSpots();
    return res.json({spots});
  }
);

module.exports = router;
