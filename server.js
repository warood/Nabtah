const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 4000;
const mongoSessisonStore = require("connect-mongo")(session);
require("dotenv").config();

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts)

var User = require("./models/user");
var Product = require("./models/products")


app.set("view engine", "ejs");


app.use(methodOverride("_method"));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


 


mongoose.connect(
  process.env.MONGO_CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(`MongoDb connected to ${process.env.MONGO_CONNECTION_URL}`)
);



app.use(session({
  store: new mongoSessisonStore({ mongooseConnection: mongoose.connection }),
  secret: "feedmeseymour", //some random string
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 },
}));





app.use(require('./controllers/user'))
app.use(require('./controllers/sessions'))
app.use(require('./controllers/products'))
app.use(require('./controllers/cart'))
app.use(require('./controllers/blog'))
app.use(require('./controllers/about'))
//app.use(express.static("public"))




app.get("/home", (req, res) => {
  const searchQuery = req.query.search;
  if (searchQuery) {
    Product.find({
      nameP: searchQuery
    }).then(result => {
      console.log('result:', result);
      res.render("search", { searchResult: result });
    }).catch(err => console.log(err))
  } else {
    Product.find()

      .then(products => {
        //console.log(products)
        res.render("home", { products: products });
      })
      .catch(err => console.log(err))
  }
})

app.get("/about", (req, res) => {
  res.render("about")
})


app.get("/cart", (req, res) => {
  res.render("cart")
})

app.get("/", (req, res) => {

  Product.find({})

    .then(products => {
      //console.log(products)
      //console.log('it is work')
      res.render("home", { products: products });
    })
    .catch(err => console.log(err))

})




app.listen(port, () => console.log(`server is running ${port}`));