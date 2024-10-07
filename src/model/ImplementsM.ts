import mongoose from 'mongoose'

const implementSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    image: {
        type: String,
        require: true
    },
    implementType: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: String,
        require: true,
        trim: true
    },
    implementPower: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true,
        trim: true
    }
})
const Implements = mongoose.model('Implements', implementSchema)

export { Implements }
