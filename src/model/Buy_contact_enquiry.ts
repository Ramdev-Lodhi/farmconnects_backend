import mongoose, { Schema } from 'mongoose'

const buyContactSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userM'
    },
    name: {
        type: String,
        trim: true
    },
    mobile: {
        type: String
    },
    location: {
        type: String,
        trim: true
    },
    budget: {
        type: String,
        trim: true
    },

    dealerInfo: {
        // dealerID: {
        //     type: String
        // },
        image: {
            type: String,
            trim: true
        },
        modelName: {
            type: String,
            trim: true
        },
        Brand: {
            type: String,
            trim: true
        }
    }
})
const BuyContact = mongoose.model('Buy_contact_enquiry', buyContactSchema)
export { BuyContact }
