const express = require('express')
const sequelize = require('sequelize');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');

const router = express.Router();

//get all spots
router.get(
    '/',
    async (req, res) => {
        const spots = await Spot.findAll();
        return res.json({spots});
    }
);

router.get(
    '/:id',
    async (req, res) => {
        const id = req.params.id
        const spots = await Spot.findAll({
            where: { id },
            include: [{
                model: Review,
                attributes: []
                // where: { spotId: id },

            },{
                model: User,
                as: "Owner",
                attributes: {exclude: ["email", "createdAt", "updatedAt", "hashedPassword"]}
            }],
            attributes: {
                // where: { spotId: Spot.id },
                include: [

                    [
                        sequelize.fn("COUNT",
                        sequelize.col("Reviews.spotId")),
                        "numReviews",
                    ],
                    [
                        sequelize.fn("AVG",
                        sequelize.col("Reviews.stars")),
                        "avgStarRating"
                    ]
                ],
            },
            group: [sequelize.col('Spot.id')]

        });
        return res.json({spots});
    }
);


module.exports = router;
