const express = require('express')
const sequelize = require('sequelize');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Image } = require('../../db/models');
const { Review } = require('../../db/models');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { route } = require('./users');
const router = express.Router();

const validateEditRview = [
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

//edit a review
router.put(
    '/:id',
    validateEditRview,
    requireAuth,
    restoreUser,
    async(req, res, next) => {
        const { user } = req;
        const theReview = await Review.findByPk(req.params.id)

        //Couldn't find a Review with the specified id
        if(!theReview){
            const err = new Error();
            err.title = "Review couldn't be found";
            err.errors = ["Review couldn't be found"];
            err.status = 404;
            return next(err);
        }

        //Autherization
        if (user.id !== theReview.userId){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }

        const reviewInfo = req.body
        theReview.update(
            reviewInfo
        )
        return res.json(theReview);
    }
)

router.delete(
    '/:id',
    requireAuth,
    restoreUser,
    async(req, res, next) => {
        const { user } = req;
        const theReview = await Review.findByPk(req.params.id)

        //Couldn't find a Review with the specified id
        if(!theReview){
            const err = new Error();
            err.title = "Review couldn't be found";
            err.errors = ["Review couldn't be found"];
            err.status = 404;
            return next(err);
        }

        //Autherization
        if (user.id !== theReview.userId){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }
        await theReview.destroy()
        return res.json({message: "Successfully deleted"});
    }
)

router.post(
    '/:reviewid/images',
    restoreUser,
    async (req, res, next) => {
        const {user} = req
        const reviewId = req.params.reviewid
        const theReview = await Review.findByPk(reviewId)
        if(!theReview){
            const err = new Error("Review couldn't be found");
            err.title = "Review couldn't be found";
            err.errors = ["Review couldn't be found"];
            err.status = 404;
            return next(err);
        }

        if (user.id !== theReview.userId){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }

        const theNumberImage = await Image.findAll({
            where: { imageableId: reviewId },
        })
        console.log(theNumberImage)

        if (theNumberImage.length >= 10){
            const err = new Error('Maximum number of images for this resource was reached');
            err.title = 'Maximum number of images for this resource was reached';
            err.errors = ['Maximum number of images for this resource was reached'];
            err.status = 400;
            return next(err);
        }

        const imageInfo = req.body
        const image = await theReview.createImage({url: imageInfo.url})
        await theReview.addImage(image)
        return res.json(
            image
        );
    }
);

module.exports = router;
