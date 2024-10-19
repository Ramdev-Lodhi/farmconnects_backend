import mongoose from 'mongoose'

const selltractorSchema = new mongoose.Schema({
    location: {
        type: String,
        require: true,
        trim: true
    },
    state: {
        type: String,
        require: true,
        trim: true
    },
    name: {
        type: String,
        require: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^[0-9]{10}$/.test(v)
            },
            message: (props: { value: string }) => `${props.value} is not a valid mobile number!`
        }
    },

    brand: {
        type: String,
        require: true,
        trim: true
    },
    modelName: {
        type: String,
        requuire: true,
        trim: true
    },
    manufacturingYear: {
        type: Number,
        require: true,
        trim: true
    },
    engineCondition: {
        type: String,
        require: true,
        trim: true
    },
    enginePower: {
        type: Number,
        require: true,
        trim: true
    },
    RC: {
        type: Boolean,
        require: true,
        trim: true
    },
    tyreCondition: {
        type: String,
        require: true,
        trim: true
    },
    hoursDriven: {
        type: String,
        require: true,
        trim: true
    },
    image: {
        type: String
    },
    days: {
        type: String,
        require: true,
        trim: true
    }
})

const SellTractor = mongoose.model('Selltractor', selltractorSchema)
export { SellTractor }
