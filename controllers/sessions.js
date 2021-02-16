const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require("../models/user");
let alert = require('alert');

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(req.session)
    User.findOne({ username })
        .then((foundUser) => {
            console.log("Authenticate username, password", username, password);
            if (!foundUser) {
                res.status(500).send("Authentication error: no user found");
            } else if (bcrypt.compareSync(password, foundUser.password)) {
                console.log("Authenticate foundUser: ", foundUser);
                req.session.userId = foundUser._id;
                alert('you have logged in successfully')
                res.redirect("/home");
            } else {
                res.status(500).send("Authentication error: wrong password");
            }
        })
        .catch((err) => console.log(err));



});





module.exports = router