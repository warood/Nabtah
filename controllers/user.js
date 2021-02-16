const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
let alert = require('alert'); 
router.get("/signup", (req, res)=>{
  res.render("signup_login")
})

router.get("/login", (req, res)=>{
  res.render("signup_login")
})



router.get("/logout", function (req, res) {
// remove the session user id
req.session.userId = null;
alert('you have logged out successfully')
res.redirect("/signup");
});


router.post("/signup", (req, res) => {
    const { username,email, password } = req.body
    console.log("I received this username, password :", username,email, password);
    // hash password user enters at sign up
    bcrypt.genSalt((err, salt) => {
        // changes every time
        console.log("bcrypt salt:", salt);
        bcrypt.hash(password, salt, (err, passwordHash) => {
            console.log("password:", password);
            console.log("passwordHash:", passwordHash);
            User.create({ username: username, email: email, password: passwordHash }, (err, newUser) => {
                console.log("newUser: ", newUser);
                req.session.userId = newUser._id;
                res.redirect("/signup");
            });
        });
    });
});


router.get('/forgot' , (req,res)=>{
  res.render("forgot.ejs")
})

router.post("/forgot" , (req,res)=>{
  email = req.body.email;
  User.findOne({email:email}, function (err, foundUser) {
    console.log(foundUser);

    if (!foundUser) {
      console.log('No user with email ' + email);
    
     
    }  

else{res.redirect("reset");}
   
  });
})


router.get("/reset" , (req,res)=>{
  res.render("reset")
})

router.post('/reset' , (req,res)=>{


  User.findOne({email: req.body.email}, function (err, foundUser) {
    password = req.body.password;
    console.log(foundUser);
    bcrypt.genSalt((err, salt) => {
      // changes every time
      console.log("bcrypt salt:", salt);
      bcrypt.hash(password, salt, (err, passwordHash) => {
          console.log("password:", password);
          console.log("passwordHash:", passwordHash);
          User.updateOne({ email :req.body.email },{password: passwordHash }, (err, newUser) => {
            
              res.redirect("/home");
          });
      });
  });
    if (!foundUser) {
      console.log('No user with email ' + email);
    
  
    }  

  })

})


module.exports = router