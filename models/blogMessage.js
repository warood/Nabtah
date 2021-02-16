const mongoose =require("mongoose");
const { modelName } = require("./user");
const Schema = mongoose.Schema ;

const Message = new Schema({
    message :String,
    img:String
})

const Messages = mongoose.model("Messages" ,Message );
module.exports = Messages ;