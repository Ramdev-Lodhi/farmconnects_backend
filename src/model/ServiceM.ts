import mongoose from 'mongoose'

const rentalSchema = new mongoose.Schema({
    service: {
        type: String,
        require: true,
        trim: true
    },
    image: {
        type: String
    }
})
const Service = mongoose.model('Service', rentalSchema)
export { Service }
