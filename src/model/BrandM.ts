import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
    name: {
        type: String
    },
    logo: {
        type: String
    }
})

const Brand = mongoose.model('brand', brandSchema)
export { Brand }
