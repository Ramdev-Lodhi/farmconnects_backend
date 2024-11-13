import mongoose from 'mongoose'

const rentalSchema = new mongoose.Schema({
    serviceType: {
        type: String,
        require: true,
        trim: true
    }
})
const Service = mongoose.model('Service', rentalSchema)
export { Service }
