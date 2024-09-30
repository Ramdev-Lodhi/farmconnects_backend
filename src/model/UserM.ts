import mongoose from 'mongoose'

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^[0-9]{10}$/.test(v) // Example regex for a 10-digit mobile number
            },
            message: (props: { value: string }) => `${props.value} is not a valid mobile number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    image: {
        type: String
    }
    // pincode: {
    //     type: Number,
    //     required: true,
    //     validate: {
    //         validator: function (v: number) {
    //             // Specify v as a number
    //             return /^[0-9]{6}$/.test(v.toString()) // Example regex for a 6-digit pincode
    //         },
    //         message: (props) => `${props.value} is not a valid pincode!`
    //     }
    // }
})

const Login = mongoose.model('Login', loginSchema)
const Register = mongoose.model('User', registerSchema)

export { Login, Register }
