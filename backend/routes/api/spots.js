const express = require('express')
var { Sequelize } = require('sequelize');
const { Op } = require("sequelize")
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { Image } = require('../../db/models');
const { Booking } = require('../../db/models');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateCreateOrEditSpot = [
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
        // .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        // .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longtitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .notEmpty()
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({min: 0})
        .withMessage('Price is required'),
    check('previewImage')
        .exists({ checkFalsy: true })
        .isURL()
        .withMessage('Preview image is required'),
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

const validateQuery = [
    check('page')
        .isInt({min:0, max:10})
        .withMessage("Page must be greater than or equal to 0"),
    check('size')
        .isInt({min:0, max:20})
        .withMessage("Size must be greater than or equal to 0"),
    check('maxLat')
        .isFloat()
        .withMessage("Maximum latitude is invalid"),
    check('minLat')
        .isFloat()
        .withMessage("Minimum latitude is invalid"),
    check('maxLng')
        .isFloat()
        .withMessage("Maximum longitude is invalid"),
    check('minLng')
        .isFloat()
        .withMessage("Minimum longitude is invalid"),
    check('minPrice')
        .isFloat({min:0})
        .withMessage("Minimum price must be greater than 0"),
    check('maxPrice')
        .isFloat({min:0})
        .withMessage("Maximum price must be greater than 0"),
    handleValidationErrors
];


//get all spots
router.get(
    '/',
    // validateQuery,
    async (req, res) => {

        let query = {
            where: {},
            include: []
        };
        const page = req.query.page === undefined ? 0 : parseInt(req.query.page);
        const size = req.query.size === undefined ? 20 : parseInt(req.query.size);
        if (page >= 1 && size >= 1) {
            query.limit = size;
            query.offset = size * (page - 1);
        }

        const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

        if(minLat && maxLat) {
            check('maxLat')
                .isFloat({min:-90, max:90})
                .withMessage("Maximum latitude is invalid"),
            check('minLat')
                .isFloat({min:-90, max:90})
                .withMessage("Minimum latitude is invalid"),
            handleValidationErrors
            query.where.lat = {[Op.between]:[minLat, maxLat]};
        }
        else if(minLat) {
            // if (minLat )
            check('minLat')
                .isFloat({min:-90,max:90})
                .withMessage("Minimum latitude is invalid"),
            handleValidationErrors
            query.where.lat = {[Op.between]:[-90, maxLat]};}
        else if(maxLat) {
            check('maxLat')
                .isFloat({min:-90,max:90})
                .withMessage("Maximum latitude is invalid"),
            handleValidationErrors
            query.where.lat = {[Op.between]:[minLat, 90]};}
        if(minLng && maxLng) {
            check('maxLng')
                .isFloat({min:-180,max:180})
                .withMessage("Maximum latitude is invalid"),
            check('minLng')
                .isFloat({min:-180,max:180})
                .withMessage("Minimum latitude is invalid"),
            handleValidationErrors
            query.where.lng = {[Op.between]:[minLng, maxLng]};}
        else if(minLng) {
            check('maxLng')
                .isFloat({min:-180,max:180})
                .withMessage("Maximum latitude is invalid"),
            handleValidationErrors
            query.where.lng = {[Op.between]:[minLng, 180]};}
        else if(maxLng) {
            check('minLng')
                .isFloat({min:-180, max:180})
                .withMessage("Minimum latitude is invalid"),
            handleValidationErrors
            query.where.lng = {[Op.between]:[-180, maxLng]};}
        if(minPrice && maxPrice) {
            check('minPrice')
                .isFloat({min:0})
                .withMessage("Minimum price must be greater than 0"),
            check('maxPrice')
                .isFloat({min:0})
                .withMessage("Maximum price must be greater than 0"),
            handleValidationErrors
            query.where.price = {[Op.between]:[minPrice, maxPrice]};}
        else if(minPrice) {
            check('minPrice')
                .isFloat({min:0})
                .withMessage("Minimum price must be greater than 0"),
            handleValidationErrors
            query.where.price = {[Op.and]:{[Op.gt]:minPrice}};}
        else if(maxPrice) {
            check('maxPrice')
                .isFloat({min:0})
                .withMessage("Maximum price must be greater than 0"),
            handleValidationErrors
            query.where.price = {[Op.and]:{[Op.lt]:maxPrice}};}

        const Spots = await Spot.findAll(
            query,
        );
        return res.json({
            Spots,
            page,
            size
        });
    }
);


//get spot by id
router.get(
    '/:id',
    async (req, res, next) => {
        const id = req.params.id
        const theSpot = await Spot.findOne({
            where: { id },
            attributes: {
                include: [[
                        Sequelize.fn("COUNT",
                        Sequelize.col("Reviews.spotId")),
                        "numReviews",
                    ],[
                        Sequelize.fn("AVG",
                        Sequelize.col("Reviews.stars")),
                        "avgStarRating"
                    ]]
                },
            group: ["Spot.id", "Owner.id", "Images.id"],
            include: [{
                model: Review,
                attributes: []
            },{
                model: User,
                as: "Owner",
                attributes: {exclude: ["email", "createdAt", "updatedAt", "hashedPassword"]}
            },{
                model: Image,
                attributes: ["url"]
            }],
        });
        if(!theSpot){
            const err = new Error();
            err.title = "Spot couldn't be found";
            err.errors = ["Spot couldn't be found"];
            err.status = 404;
            return next(err);
        }
        return res.json(theSpot);
    }
);


//create a spot
router.post(
    '/',
    restoreUser,
    validateCreateOrEditSpot,
    async (req, res) => {
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
            price:spotInfo.price,
            previewImage:spotInfo.previewImage
        })
        return res.json(
            spot
        );
    }
);

//edit a spot
router.put(
    '/:id',
    requireAuth,
    validateCreateOrEditSpot,
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
        return res.json({
            id:theSpot.id,
            ownerId:theSpot.ownerId,
            address:theSpot.address,
            city:theSpot.city,
            state:theSpot.state,
            country:theSpot.country,
            lat:theSpot.lat,
            lng:theSpot.lng,
            name:theSpot.name,
            description:theSpot.description,
            price:theSpot.price,
            createdAt:theSpot.createdAt,
            updatedAt:theSpot.updatedAt,
            previewImage:theSpot.previewImage
        });
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

        const Reviews = await Review.findAll({
            where: { spotId },
            include: [{
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },{
                model: Image,
                attributes: ["url"]
            }],
        });
        return res.json({Reviews});
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
            where: { spotId, userId: user.id }
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
        return res.json(
            newReview
        );
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


        const {user} = req

        if (user.id !== theSpot.ownerId){

            const Bookings = await Booking.findAll({
                where: { spotId },
                attributes: {exclude: ['id', 'userId', 'createdAt', 'updatedAt']}
            })
            return res.json({Bookings});
        }



        else {
            const Bookings = await Booking.findAll({
                where: { spotId },
                include: [{
                    model: User,
                    attributes: ["id", "firstName", "lastName"]
                }],
            });
            return res.json({Bookings});
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

        const BookingInfo = req.body

        const existingBooking = await Booking.findAll({
            where: { spotId },
        })

        for (let i = 0; i < existingBooking.length; i++){
            if ( BookingInfo.startDate >= existingBooking[i].startDate
                &&
                BookingInfo.startDate <= existingBooking[i].endDate ){
                    const err = new Error("Booking time conflict");
                    err.title = "Booking time conflict";
                    err.errors = ["Start date conflicts with an existing booking"];
                    err.status = 403;
                    return next(err);
            }
            if ( BookingInfo.endDate >= existingBooking[i].startDate
                &&
                BookingInfo.endDate <= existingBooking[i].endDate ){
                    const err = new Error("Booking time conflict");
                    err.title = "Booking time conflict";
                    err.errors = ["End date conflicts with an existing booking"];
                    err.status = 403;
                    return next(err);

            }
            if ( BookingInfo.startDate < existingBooking[i].startDate
                &&
                BookingInfo.endDate > existingBooking[i].startDate ){
                    const err = new Error("Booking time conflict");
                    err.title = "Booking time conflict";
                    err.errors = ["spot is already booked for the specified dates"];
                    err.status = 403;
                    return next(err);
            }
    }


        if (existingBooking.startDate ){
            const err = new Error("Sorry, this spot is already booked for the specified dates");
            err.title = "Start date conflicts with an existing booking";
            err.errors = ["Start date conflicts with an existing booking"];
            err.status = 403;
            return next(err);
        }

        if(BookingInfo.startDate >= BookingInfo.endDate){
            const err = new Error('Booking start date is later or equal than end Date');
            err.title = 'Booking start date is later or equal than end Date';
            err.errors = ['Booking start date is later or equal than end Date'];
            err.status = 403;
            return next(err);
        }
        const newBooking = await Booking.create({
            userId: user.id,
            spotId: spotId,
            startDate:BookingInfo.startDate,
            endDate: BookingInfo.endDate,
        })
        return res.json(
            newBooking
        );
    }
);

// add an image to spot
router.post(
    '/:spotid/images',
    restoreUser,
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

        if (user.id !== theSpot.ownerId){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }

        const imageInfo = req.body
        const image = await theSpot.createImage({url: imageInfo.url})
        await theSpot.addImage(image)
        return res.json(
            {
                id:image.id,
                imageableType:image.imageableType,
                imageableId:image.imageableId,
                url:image.url
            }
        );
    }
);

module.exports = router;
