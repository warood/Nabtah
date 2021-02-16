const express = require('express')
const router = express.Router()

let alert = require('alert');
const User = require("../models/user");
const Messages = require('../models/blogMessage');



router.post("/blogCheckUser", function (req, res) {
    console.log("session user id: ", req.session.userId);


    if (req.session.userId == null) {
        console.log("you cant go")
        alert('soory you need to log in first')

    }
    else {
        res.render("writeInBlog")
    }
});

router.post("/blog", (req, res) => {
    const message = req.body.message;
    const img = req.body.img;

    Messages.create({ message: message, img: img }, (err, newMessage) => {
        res.redirect("/blog/show");
    })
})

router.get("/blog/show", (req, res) => {
    Messages.find()
        .then(message => {
            res.render("blogPage", { message: message })
        })

})


module.exports = router