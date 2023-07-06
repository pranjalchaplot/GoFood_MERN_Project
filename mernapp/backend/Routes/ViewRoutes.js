const express = require('express')
const User = require('../models/User');
const mongoDB = require("../db");


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JsonWebTokenSecret } = require('../../ENV');

const router = express.Router();

router.post("/foodData",
    async (request, response) => {

        try {
            response.send([global.food_items, global.foodCategory]);
        }
        catch (ex) {
            console.error(error.message);
            res.send("Server Error");
        }

    }
);

module.exports = router;