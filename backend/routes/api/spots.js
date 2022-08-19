const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const router = express.Router();

//get all spots
router.get(
    '/',
    async (req, res) => {
        const spots = await Spot.findAll();
        return res.json({spots});
    }
);



module.exports = router;
