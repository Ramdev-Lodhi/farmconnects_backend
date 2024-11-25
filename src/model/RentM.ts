import mongoose, { Schema } from 'mongoose'

const rentSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'userM'
        },
        userInfo: {
            name: { type: String, trim: true },
            mobile: { type: String },
            email: { type: String, trim: true, lowercase: true }
        },
        serviceType: { type: String, required: true, trim: true },
        price: { type: String, required: true, trim: true },
        rentedStatus: { type: Boolean, default: true },
        state: { type: String },
        district: { type: String },
        sub_district: { type: String },
        village: { type: String },
        pincode: { type: String },
        image: { type: String },
        serviceRequests: [
            {
                requestedBy: { type: Schema.Types.ObjectId, ref: 'UserM' },
                name: { type: String, trim: true },
                mobile: { type: String },
                location: { type: String, trim: true },
                requestStatus: {
                    type: String,
                    enum: ['Pending', 'Approved', 'Rejected'],
                    default: 'Pending'
                },
                requestedFrom: { type: Date, required: true },
                requestedTo: { type: Date, required: true }
            }
        ]
    },
    {
        timestamps: true
    }
)
const Rent = mongoose.model('Rent', rentSchema)
export { Rent }
