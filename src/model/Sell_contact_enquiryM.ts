import mongoose, { Schema } from 'mongoose'

const sellContactSchema = new mongoose.Schema({
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

    sellerInfo: {
        sellerID: {
            type: String
        },
        sell_image: {
            type: String,
            trim: true
        },
        sellmodelName: {
            type: String,
            trim: true
        },
        sellBrand: {
            type: String,
            trim: true
        }
    }
})
const SellContact = mongoose.model('Sell_contact_enquiry', sellContactSchema)
export { SellContact }
