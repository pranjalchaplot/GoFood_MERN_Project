const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User')

const app = express();

router.post("/createuser", async (request, response) => {
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
})

module.exports = router;