import mongoose from 'mongoose'

const BannerSchema = new mongoose.Schema({
    banner: {
        type: String
    }
})

const Banner = mongoose.model('Banner', BannerSchema)
export { Banner }
