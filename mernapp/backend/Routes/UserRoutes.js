const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JsonWebTokenSecret } = require('../../ENV');

router.post("/createuser",
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('location').isString(),
    async (request, response) => {

        const result = validationResult(request);
        if (result.isEmpty()) {
            const salt = await bcrypt.genSalt(10);
            let encryptedPass = await bcrypt.hash(request.body.password, salt);
            try {
                await User.create({
                    name: request.body.name,
                    password: encryptedPass,
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
        else {
            return response.status(400).json({ errors: result.array() });
        }
    }
);

router.post("/loginuser",
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (request, response) => {
        const result = validationResult(request);

        if (result.isEmpty()) {
            let email = request.body.email;
            try {
                let userData = await User.findOne({ email });

                if (!userData) {
                    return response.status(400).json({ errors: "Login Credentials Invalid" });
                }

                const pwdCompare = await bcrypt.compare(request.body.password, userData.password);

                if (!pwdCompare) {
                    return response.status(400).json({ errors: "Login Credentials Invalid" });
                }

                const data = {
                    user: {
                        id: userData.id
                    }
                };

                let authToken = jwt.sign(data, JsonWebTokenSecret);

                response.json({
                    success: true,
                    authToken: authToken
                });
            }
            catch (ex) {
                console.log(ex);
                response.json({ success: false });
            }
        }
        else {
            return response.status(400).json({ errors: result.array() });
        }
    }
);

module.exports = router;