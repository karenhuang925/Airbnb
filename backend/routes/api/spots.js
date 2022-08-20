const express = require('express')
const sequelize = require('sequelize');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



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

const router = express.Router();

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
        console.log(spotInfo)
        theSpot.update(
            spotInfo
        )
        return res.json({theSpot});
    }
)

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

module.exports = router;
