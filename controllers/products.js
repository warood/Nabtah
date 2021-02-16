const express = require('express')
const router = express.Router()
const Pro = require('../models/products.js')

router.get("/products", (req, res) => {
    const searchQuery = req.query.search;
    if (searchQuery) {
        Pro.find({
            nameP: searchQuery
        }).then(result => {
            console.log('result:', result);
            res.render("search", { searchResult: result });
        }).catch(err => console.log(err))
    } else {
        Pro.find()

            .then(products => {
                //console.log(products)
                res.render("products", { products: products });
            })
            .catch(err => console.log(err))
    }
})

router.post("/search", (req, res) => {
    console.log('Search:', req.body.search);
    res.redirect(`/home?search=${req.body.search}`)

});

// create new product
router.get('/products/new', (req, res) => {
    res.render("newPro");
});

router.get("/products/:id", (req, res) => {
    var id = req.params.id;
    if (!(id == "logo.jpg")) req.session.crazy = req.params.id

    console.log('Checking Error', req.session.crazy)
    Pro.findById(req.session.crazy)
        .then(products => {
            res.render("show.ejs", { products: products });
        })
        .catch(err => console.log(err))

});


router.post("/products", (req, res) => {
    console.log(req.body);
    const { nameP, pic, category, price, description } = req.body;

    Pro.create({ nameP: nameP, pic: pic, category: category, price: price, description: description }, (err, newP) => {
        console.log("newPro: ", newP);
        res.redirect("/home");
    });
});

//  get the update view
router.get("/products/:id/edit", (req, res) => {
    let id = req.params.id;

    Pro.findById(id)
        .then(products => {
            res.render("edit", { products: products });
        }).catch(err => console.log(err))


});

// update actiony
router.post("/products/:id", (req, res) => {
    const id = req.params.id;
    const { nameP, pic, category, price, description } = req.body;

    Pro.findByIdAndUpdate(id, { nameP, pic, category, price, description })
        .then(products => {
            res.redirect(`/products/${products._id}`);
        }).catch(err => console.log(err))
});

router.get("/products/category/:productsCategory", (req, res) => {
    Pro.find({ category: req.params.productsCategory })
        .then((products) => {
            res.render("showCatg", { category: req.params.productsCategory, products: products });
        })
});




router.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    // deleteOne or remove does the same
    // only null
    Pro.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/home");
        })
        .catch(err => console.log(err))

});

router.get("/products/category/:productsCategory", (req, res) => {
    Pro.find({ category: req.params.productsCategory })
        .then((products) => {
            res.render("products", { category: req.params.productsCategory, products: products });
        })
});


module.exports = router