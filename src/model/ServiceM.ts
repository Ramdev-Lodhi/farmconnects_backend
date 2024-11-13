import mongoose from 'mongoose'

const rentalSchema = new mongoose.Schema({
    service: {
        type: String,
        require: true,
        trim: true
    }
})
const Service = mongoose.model('Service', rentalSchema)
export { Service }
