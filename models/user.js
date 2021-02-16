const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:  { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password:{ type: String},
    cart: [{type : mongoose.Schema.Types.ObjectId , ref : 'Product'  }]

});




var User = mongoose.model("User", UserSchema);

// export user model
module.exports = User;