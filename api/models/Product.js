const {Schema, model} = require("mongoose");

const ProductSchema = new Schema({
    title:{
        type: String,
        required: [true, "Product title required"]
    },
    brand:{
        type: String,
        required: [true, "Product brand required"]
    },
    model:{
        type: String,
        required: [true, "Product model required"]
    },
    description:{
        type: Text,
        text: true,
        required: [true, "Product description required"]
    },
    price:{
        type: Number,
        required: [true, "Product price required"]
    },
    stock:{
        type: Number,
        required: [true, "Product stock required"]
    },
    imgUrl:{
        type: String,
    },
    comments:{
        type: Text,
    },
},{
    timestamps: true
})




const Product = model("Product", ProductSchema)

module.exports = Product;