const express = require('express')
const sequelize = require('sequelize');

const { Booking } = require('../../db/models');
const { Spot } = require('../../db/models');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { route } = require('./users');
const { DATEONLY } = require('sequelize');
const router = express.Router();

router.put(
    '/:id',
    restoreUser,
    requireAuth,
    async(req, res, next) =>{
        const { user } = req;
        const theBooking = await Booking.findByPk(req.params.id)

        //Couldn't find a Review with the specified id
        if(!theBooking){
            const err = new Error();
            err.title = "Booking couldn't be found";
            err.errors = ["Booking couldn't be found"];
            err.status = 404;
            return next(err);
        }

        //Autherization
        if (user.id !== theBooking.userId){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }


        //Can't edit a booking that's past the end date
        const bookingEndDate = Date.parse(theBooking.endDate)

        if (Date.parse(theBooking.endDate) < Date.now()){
            const err = new Error("Past bookings can't be modified");
            err.title = "Past bookings can't be modified";
            err.errors = ["Past bookings can't be modified"];
            err.status = 400;
            return next(err);
        }



        const bookingInfo = req.body
        theBooking.update(
            bookingInfo
        )
        return res.json({theBooking});
    }
)

router.delete(
    '/:id',
    requireAuth,
    restoreUser,
    async(req, res, next) => {
        const { user } = req;
        const theBooking = await Booking.findByPk(req.params.id)

        //Couldn't find a Review with the specified id
        if(!theBooking){
            const err = new Error();
            err.title = "Booking couldn't be found";
            err.errors = ["Booking couldn't be found"];
            err.status = 404;
            return next(err);
        }

        let bookingSpot = await Spot.findByPk(theBooking.spotId)
        let spotOwnerId = bookingSpot.ownerId

        //Autherization
        if ((user.id !== theBooking.userId) && (user.id !== spotOwnerId)){
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }

        //started booking cannot delete
        if (Date.parse(theBooking.startDate) < Date.now()){
            const err = new Error("Bookings that have been started can't be deleted");
            err.title = "Bookings that have been started can't be deleted";
            err.errors = ["Bookings that have been started can't be deleted"];
            err.status = 400;
            return next(err);
        }

        await theBooking.destroy()
        return res.json({message: "Successfully deleted"});
    }
)

module.exports = router;
