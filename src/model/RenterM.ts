import mongoose, { Schema } from 'mongoose'

const rentalSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserM'
    },
    OwnerID: {
        type: Schema.Types.ObjectId,
        ref: 'UserM'
    },
    RentID: {
        type: Schema.Types.ObjectId,
        ref: 'RentM'
    },
    serviceType: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: String,
        require: true,
        trim: true
    },
    address: {
        type: String
    },
    description: {
        type: String,
        required: true
    }
})
const Rental = mongoose.model('Rental', rentalSchema)
export { Rental }
