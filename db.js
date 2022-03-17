const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:8080");

const ninjaSchema = new Schema({
    name: {
        type:String,
        required:true,
        minlength: 2

    },
    age: {
        type: Number,
        required:true,
        min:0,
        max:100

    },
    village: {
        type: String,
        required:true

    },

    jutsu:{
        type:String,
        required:true
    }
    


});

module.exports = mongoose.model("Ninja", ninjaSchema);