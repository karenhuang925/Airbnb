const express = require('express')
const sequelize = require('sequelize');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


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

module.exports = router;
