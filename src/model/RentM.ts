import mongoose, { Schema } from 'mongoose'

const rentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userM'
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
    rentedStatus: {
        type: Boolean,
        default: false
    },
    state: {
        type: String
        // required: true,
    },
    district: {
        type: String
        // required: true,
    },
    sub_district: {
        type: String
        // required: true,
    },
    village: {
        type: String
        // required: true,
    },
    pincode: {
        type: String
    },
    serviceRequests: [
        {
            requestedBy: {
                type: Schema.Types.ObjectId,
                ref: 'UserM',
                required: true
            },
            requestStatus: {
                type: String,
                enum: ['Pending', 'Approved', 'Rejected'],
                default: 'Pending'
            },
            requestedFrom: {
                type: Date,
                required: true
            },
            requestedTo: {
                type: Date,
                required: true
            }
        }
    ]
})
const Rent = mongoose.model('Rent', rentSchema)
export { Rent }
