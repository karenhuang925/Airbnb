const express = require('express')
const sequelize = require('sequelize');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { Image } = require('../../db/models');
const { Booking } = require('../../db/models');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateEditSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State address is required'),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country address is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Latitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .notEmpty()
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description address is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Price address is required'),
    handleValidationErrors
];

const validatePostReview = [
    check('content')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text address is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];
const validatePostBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .isDate()
        .withMessage('Start date must be a date'),
    check('endDate')
        .exists({ checkFalsy: true })
        .isDate()
        .withMessage("End date must be a date"),
    handleValidationErrors
];


//get all spots
router.get(
    '/',
    async (req, res) => {
        const spots = await Spot.findAll();
        return res.json({spots});
    }
);


//get spot by id
router.get(
    '/:id',
    async (req, res) => {
        const id = req.params.id
        const spots = await Spot.findAll({
            where: { id },
            include: [{
                model: Review,
                attributes: []
            },{
                model: User,
                as: "Owner",
                attributes: {exclude: ["email", "createdAt", "updatedAt", "hashedPassword"]}
            }],
            attributes: {
                include: [[
                        sequelize.fn("COUNT",
                        sequelize.col("Reviews.spotId")),
                        "numReviews",
                    ],[
                        sequelize.fn("AVG",
                        sequelize.col("Reviews.stars")),
                        "avgStarRating"
                    ]],},
            group: [sequelize.col('Spot.id')]
        });
        return res.json({spots});
    }
);


//create a spot
router.post(
    '/',
    restoreUser,
    async (req, res) => {
        // console.log(req)
        const {user} = req
        const spotInfo = req.body
        const spot = await Spot.create({
            ownerId:user.id,
            address:spotInfo.address,
            city:spotInfo.city,
            state:spotInfo.state,
            country:spotInfo.country,
            lat:spotInfo.lat,
            lng:spotInfo.lng,
            name:spotInfo.name,
            description:spotInfo.description,
            price:spotInfo.price
        })
        return res.json({
            spot
        });
    }
);

//edit a spot
router.put(
    '/:id',
    requireAuth,
    validateEditSpot,
    async (req, res, next) => {
        const theSpot = await Spot.findByPk(req.params.id)
        if(!theSpot){
            const err = new Error();
            err.title = "Spot couldn't be found";
            err.errors = ["Spot couldn't be found"];
            err.status = 404;
            return next(err);
        }
        const {user} = req

        if (user.id !== theSpot.ownerId){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }
        const spotInfo = req.body
        theSpot.update(
            spotInfo
        )
        return res.json({theSpot});
    }
)

//delete spot
router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const theSpot = await Spot.findByPk(req.params.id)
        if(!theSpot){
            const err = new Error();
            err.title = "Spot couldn't be found";
            err.errors = ["Spot couldn't be found"];
            err.status = 404;
            return next(err);
        }
        const {user} = req

        if (user.id !== theSpot.ownerId){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }

        await theSpot.destroy();

        return res.json({message: "Successfully deleted"});
    }
)

//get all reviews by a Spot's id
router.get(
    '/:spotid/reviews',
    async (req, res, next) => {
        const spotId = req.params.spotid
        const theSpot = await Spot.findByPk(spotId)
        if(!theSpot){
            const err = new Error();
            err.title = "Spot couldn't be found";
            err.errors = ["Spot couldn't be found"];
            err.status = 404;
            return next(err);
        }

        const reviews = await Review.findAll({
            where: { spotId },
            include: [{
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },{
                model: Image,
                attributes: ["url"]
            }],
        });
        return res.json({reviews});
    }
);

//Create a review from a Spot based on the Spot's id

router.post(
    '/:spotid/reviews',
    restoreUser,
    validatePostReview,
    async (req, res, next) => {
        const {user} = req
        const spotId = req.params.spotid
        const theSpot = await Spot.findByPk(spotId)
        if(!theSpot){
            const err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            err.errors = ["Spot couldn't be found"];
            err.status = 404;
            return next(err);
        }

        const existingReviews = await Review.findAll({
            where: { spotId, userid: user.id }
        })
        if (existingReviews.length !== 0){
            const err = new Error("User already has a review for this spot");
            err.title = "User already has a review for this spot";
            err.errors = ["User already has a review for this spot"];
            err.status = 403;
            return next(err);
        }

        const reviewInfo = req.body
        const newReview = await Review.create({
            userId:user.id,
            spotId:spotId,
            content:reviewInfo.content,
            stars: reviewInfo.stars,
        })
        return res.json({
            newReview
        });
    }
);

//Get all Bookings for a Spot based on the Spot's id
router.get(
    '/:spotid/bookings',
    restoreUser,
    requireAuth,
    async(req, res, next) => {
        const spotId = req.params.spotid
        const theSpot = await Spot.findByPk(spotId)
        if(!theSpot){
            const err = new Error();
            err.title = "Spot couldn't be found";
            err.errors = ["Spot couldn't be found"];
            err.status = 404;
            return next(err);
        }

        // const {existingBooking} = await Booking.findAll({
        //     where: { spotId }
        // })
        // console.log(existingBooking.startDate)

        const {user} = req

        if (user.id !== theSpot.ownerId){
            const bookings = await Booking.findAll({
                where: { spotId },
                attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']}
            })
            return res.json({bookings});
        }

        else {
            const bookings = await Booking.findAll({
                where: { spotId },
                include: [{
                    model: User,
                    attributes: ["id", "firstName", "lastName"]
                }],
            });
            return res.json({bookings});
        }
    }
)

//Create a Booking from a Spot based on the Spot's id

router.post(
    '/:spotid/bookings',
    restoreUser,
    validatePostBooking,
    async (req, res, next) => {
        const {user} = req
        const spotId = req.params.spotid
        const theSpot = await Spot.findByPk(spotId)
        if(!theSpot){
            const err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            err.errors = ["Spot couldn't be found"];
            err.status = 404;
            return next(err);
        }

        if (user.id === theSpot.ownerId){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Cannot book your own spot'];
            err.status = 403;
            return next(err);
        }

        // const existingBooking = await Booking.findAll({
        //     where: { spotId }
        // })
        // console.log(existingBooking)

        // if (existingBooking.startDate ){
        //     const err = new Error("Sorry, this spot is already booked for the specified dates");
        //     err.title = "Start date conflicts with an existing booking";
        //     err.errors = ["Start date conflicts with an existing booking"];
        //     err.status = 403;
        //     return next(err);
        // }

        const BookingInfo = req.body
        const newBooking = await Booking.create({
            userId: user.id,
            spotId: spotId,
            startDate:BookingInfo.startDate,
            endDate: BookingInfo.endDate,
        })
        return res.json({
            newBooking
        });
    }
);

module.exports = router;
