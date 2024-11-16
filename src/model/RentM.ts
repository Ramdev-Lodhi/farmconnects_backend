import mongoose, { Schema } from 'mongoose'

const rentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userM'
    },
    userInfo: [
        {
            name: {
                type: String,
                trim: true
            },
            mobile: {
                type: String
            },
            email: {
                type: String,
                trim: true,
                lowercase: true
            }
        }
    ],
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
    },
    district: {
        type: String
    },
    sub_district: {
        type: String
    },
    village: {
        type: String
    },
    pincode: {
        type: String
    },
    image: {
        type: String
    },
    serviceRequests: [
        {
            requestedBy: {
                type: Schema.Types.ObjectId,
                ref: 'UserM'
            },
            requestStatus: {
                type: String,
                enum: ['Pending', 'Approved', 'Rejected'],
                default: 'Pending'
            }
            // requestedFrom: {
            //     type: Date,
            //     required: true
            // },
            // requestedTo: {
            //     type: Date,
            //     required: true
            // }
        }
    ]
})
const Rent = mongoose.model('Rent', rentSchema)
export { Rent }
