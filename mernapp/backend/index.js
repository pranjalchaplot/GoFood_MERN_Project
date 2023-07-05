const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db");
mongoDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.use(express.json());
app.use("/api", require('./Routes/CreateUser'));
app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})