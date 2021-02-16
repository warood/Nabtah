const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({

    nameP :String ,
    pic :String,
    category :String,
    price :Number,
    description :String,

});

const Product = mongoose.model('Product' , product);
// to export Product model
module.exports = Product