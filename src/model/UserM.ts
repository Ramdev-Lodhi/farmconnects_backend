import mongoose from 'mongoose'

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String
        // validate: {
        //     validator: function (v: string) {
        //         return /^[0-9]{10}$/.test(v)
        //     },
        //     message: (props: { value: string }) => `${props.value} is not a valid mobile number!`
        // }
    },
    password: {
        type: String
    }
})

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    mobile: {
        type: String
        // required: true,
        // validate: {
        //     validator: function (v: string) {
        //         return /^[0-9]{10}$/.test(v)
        //     },
        //     message: (props: { value: string }) => `${props.value} is not a valid mobile number!`
        // }
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        trim: true,
        lowercase: true
        // validate: {
        //     validator: function (v: string | undefined | null) {

        //         return v == null || v.length === 0 || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        //     },
        //     message: (props: { value: string }) => `${props.value} is not a valid email address!`
        // }
    },

    image: {
        type: String
    },
    pincode: {
        type: String 
        // required: true,
        // validate: {
        //     validator: function (v: number) {
        //         // Specify v as a number
        //         return /^[0-9]{6}$/.test(v.toString()) // Example regex for a 6-digit pincode
        //     },
        //     message: (props: { value: string }) => `${props.value} is not a valid pincode!`
        // }
    },
    state: {
        type: String
        // required: true,
    },
    district: {
        type: String
        // required: true,
    },
    sub_district: {
        type: String
        // required: true,
    },
    village: {
        type: String
        // required: true,
    }
})

const Login = mongoose.model('Login', loginSchema)
const Register = mongoose.model('User', registerSchema)

export { Login, Register }
