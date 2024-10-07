import mongoose, { Schema } from 'mongoose'

const purchasesSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userM',
        require
    },
    product: {
        type: String,
        required: true,
        trim: true
    },
    date_of_purchase: {
        type: Date,
        default: Date.now,
        trim: true
    },
    quantity: {
        type: Number,
        require: true,
        trim: true
    },
    product_image: {
        type: String,
        require: true
    },
    product_brand: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true
    }
    // quality:{
    //     type: String,
    //     require:true,
    //     trim:true
    // }
})
const Purchase = mongoose.model('Purchases', purchasesSchema)
export { Purchase }
