import mongoose, { Schema } from 'mongoose'

const selltractorSchema = new mongoose.Schema({
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'userM'
    },
    location: {
        type: String,
        require: true,
        trim: true
    },
    state: {
        type: String,
        require: true,
        trim: true
    },
    name: {
        type: String,
        require: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        require: true,
        trim: true
    },
    modelName: {
        type: String,
        requuire: true,
        trim: true
    },
    manufacturingYear: {
        type: String,
        require: true,
        trim: true
    },
    engineCondition: {
        type: String,
        require: true,
        trim: true
    },
    enginePower: {
        type: String,
        require: true,
        trim: true
    },
    RC: {
        type: String,
        require: true,
        trim: true
    },
    tyreCondition: {
        type: String,
        require: true,
        trim: true
    },
    hoursDriven: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: String,
        require: true,
        trim: true
    },
    image: {
        type: String
    }
})

const SellTractor = mongoose.model('Selltractor', selltractorSchema)
export { SellTractor }
