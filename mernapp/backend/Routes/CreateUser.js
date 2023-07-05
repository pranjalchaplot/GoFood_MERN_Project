const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')

router.post("/createuser",
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('location').isString(),
    async (request, response) => {

        const result = validationResult(request);
        if (result.isEmpty()) {
            try {
                console.log(request.body);
                await User.create({
                    name: request.body.name,
                    password: request.body.password,
                    email: request.body.email,
                    location: request.body.location
                })
                response.json({ success: true });
            }
            catch (ex) {
                console.log(ex);
                response.json({ success: false });
            }
        }
        else response.status(400).json({ errors: result.array() });
    })

module.exports = router;