const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// import { singlePublicFileUpload, singleMulterUpload } from '../../awsS3';

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

    let token = setTokenCookie(res, user);
    return res.json({
      id:user.id,
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
    let token = setTokenCookie(res, user)
    return res.json({
      id:user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token:token
    });
  } else return res.json({});
}
);

// Sign up
router.post(
    '/signup',
    // singleMulterUpload("image"),
    validateSignup,
    async (req, res, next) => {
      const { firstName, lastName, email, password } = req.body;
      // const profileImageUrl = await singlePublicFileUpload(req.file);
      const existinguser = await User.getOneBy(email)
      if (existinguser){
        const err = new Error('User already exists');
        err.status = 403;
        err.title = 'User already exists';
        err.errors = ['email": "User with that email already exists'];
        return next(err);
      }

      const user = await User.signup({ firstName, lastName, email, password, /*profileImageUrl*/});
      let token = setTokenCookie(res, user);
      // user.update({
      //   token: token
      // })

      return res.json({
        id: user.id,
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
    const Spots = await user.getSpots();
    return res.json({Spots});
  }
);

//get all reviews of the current user
router.get(
  '/my/reviews',
  restoreUser,
  async (req, res, next) => {
      const { user } = req
      const Reviews = await user.getReviews({
        include: [{
          model: User,
          attributes: ["id", "firstName", "lastName"]
        },{
          model: Spot,
          attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
        },{
          model: Image,
          attributes: ["url"]

        }]

      });
      return res.json({Reviews});
  }
);

//Get all of the Current User's Bookings
router.get(
  '/my/bookings',
  restoreUser,
  async (req, res, next) => {
      const { user } = req
      const Bookings = await user.getBookings({
        include: [{
          model: Spot,
          attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price", "previewImage"]
        }]

      });
      return res.json({Bookings});
  }
);

module.exports = router;
