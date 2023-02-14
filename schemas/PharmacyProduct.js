const mongoose = require("mongoose")

const pharmacyProductSchema = new mongoose.Schema({
    productId:{
        type:String,
    },
    link:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    title: {
        type: String,
        required:true
    },
    manufacturer: {
        type: String,
        required:true
    },
    retailCompany: {
        type: String,
        required:true
    },
    prices:{
        regularPrice: {
            type:Number,
            default: 0,
            required:true
        },
        discountPrice: {
            type:Number,
            default: 0,
            required:true
        },
        clubCardPrice: {
            type:Number,
            default: 0,
            required:true
        }
    },
    overallPriceHistory:[
        Object
    ],
    regularPriceHistory:[
        {
            date:String,
            price:Number
        }
    ],
    discountPriceHistory:[
        {
            date:String,
            price:Number
        }
    ],
    clubCardPriceHistory:[
        {
            date:String,
            price:Number
        }
    ],
    matchedProducts:[
        {
            matchedProductId:mongoose.SchemaTypes.ObjectId,
        }
    ]
})


module.exports = mongoose.model("PharmacyProducts",pharmacyProductSchema,'all-pharmacy-products')