import mongoose from 'mongoose'

const loginSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true
        },
        mobile: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    image: {
        type: String
    },
    pincode: {
        type: String
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    sub_district: {
        type: String
    },
    village: {
        type: String
        // required: true,
    },
    deviceTokens: [
        {
            type: String
        }
    ]
})

const Login = mongoose.model('Login', loginSchema)
const Register = mongoose.model('User', registerSchema)

export { Login, Register }
