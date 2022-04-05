const {Schema, model} = require("mongoose")

const CategorySchema = new Schema({
    name:{
        type: String,
        unique: [true, "Category name required"],   
    }
},{
    timestamps: true
})


const Category = model("Category", CategorySchema )

module.exports = Category;