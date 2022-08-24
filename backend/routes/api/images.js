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

router.delete(
    '/:id',
    requireAuth,
    restoreUser,
    async(req, res, next) => {
        const { user } = req;
        const theImage = await Image.findByPk(req.params.id)

        //Couldn't find a image with the specified id
        if(!theImage){
            const err = new Error();
            err.title = "Image couldn't be found";
            err.errors = ["Image couldn't be found"];
            err.status = 404;
            return next(err);
        }

        const imageType = theImage.imageableType;
        const imageableId = theImage.imageableId;
        let theOwner;

        if(imageType === 'spot'){
            const theSpot = await Spot.findByPk(imageableId);
            theOwner = theSpot.ownerId
        }
        if(imageType === 'review'){
            const theReview = await Review.findByPk(imageableId);
            theOwner = theReview.userId
        }

        //Autherization
        if (user.id !== theOwner){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }
        await theImage.destroy()
        return res.json({message: "Successfully deleted"});
    }
)


module.exports = router
