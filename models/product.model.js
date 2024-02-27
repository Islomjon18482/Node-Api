const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter product name"]
        },
        price: {
            type: Number,
            required: [true, "Enter product price"],
            default: 0
        }
    },
    {
        timetamps: true
    }
)

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product