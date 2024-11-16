import mongoose from 'mongoose'

const implemnetBrandSchema = new mongoose.Schema({
    name: {
        type: String
    },
    logo: {
        type: String
    }
})

const ImplementBrand = mongoose.model('implementBrand', implemnetBrandSchema)
export { ImplementBrand }
