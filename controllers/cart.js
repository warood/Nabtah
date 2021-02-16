const express = require('express')
const { findByIdAndUpdate, count } = require('../models/products')
const Products = require('../models/products')
const router = express.Router()
const User = require('../models/user')


let alert = require('alert');





router.get("/cart", (req, res) => {
  
    User.findById(req.session.userId).populate('cart')
        .then(user => {
            console.log(count1(user.cart))
            res.render("cart", { cart: Array.from(new Set(user.cart)), type: undefined, count1: count1(user.cart) });
        })
        .catch(err => console.log(err))
});

router.post('/addToCart/:id', (req, res) => {
    console.log("add to cart");
    const productId = req.params.id;

    if (req.session.userId == null) {
        alert("sorry you have to log in first")
    }
    else {
        User.findByIdAndUpdate(req.session.userId, { $push: { cart: productId } }).then(result => {
            res.redirect('/cart')

            console.log(result)
        }).catch(err => console.log(err))
    }

})


router.post('/cart/delete/:id', (req, res) => {
    let productId = req.params.id;
    console.log('deleting item')
    User.findByIdAndUpdate(
        req.session.userId,
        { $pull: { cart: productId } },
    ).then(user => {
        res.redirect('/cart')
        console.log(user)
    }).catch(err => console.log(err))
})


/// help fun
const count1 = (a) => {
    let counts = {}
    for (let i = 0; i < a.length; i++) {
        if (counts[a[i].nameP]) { counts[a[i].nameP] += 1 }
        else { counts[a[i].nameP] = 1 }
    }
    return counts
}

module.exports = router