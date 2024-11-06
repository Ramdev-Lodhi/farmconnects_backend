import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1m' }
})

export const OtpModel = mongoose.model('Otp', otpSchema)