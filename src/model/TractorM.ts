import mongoose from 'mongoose'

const tractorSchema = new mongoose.Schema({
    brand: {
        type: String,
        require: true,
        trim: true
    },
    name: {
        type: String,
        require: true,
        trim: true
    },
    tractor_image: {
        type: String,
        require: true
    },
    engine: {
        no_of_cylinder: {
            type: Number
        },
        HP_category: {
            type: String
        },
        capacity_cc: {
            type: String
        },
        RPM: {
            type: Number
        },
        cooling: {
            type: String
        },
        fuelType: { type: String }
    },
    transmission: {
        clutch: {
            type: String
        },
        gearBox: {
            type: String
        },
        forwordSpeed: {
            type: String
        },
        reverseSpeed: {
            type: String
        }
    },
    steering: {
        steeringType: {
            type: String
        },
        steeringColumn: {
            type: String
        }
    },
    dimensionsWeight: {
        totalWeight: {
            type: String
        },
        wheelBase: {
            type: String
        }
    },
    hydraulics: {
        liftingCapacity: {
            type: String
        },
        pointLinkage: {
            type: String
        }
    },
    wheelTyres: {
        wheelDrive: {
            type: String
        },
        front: {
            type: String
        },
        rear: {
            type: String
        }
    },
    otherInformation: {
        accessories: {
            type: String
        },
        warranty: { type: Number },
        status: {
            type: String
        }
    },
    brakes: {
        type: String
    },
    powerTakeoff: {
        poweType: { type: String },
        RPM: {
            type: String
        }
    },
    price: {
        type: String
    }
})

const Tractor = mongoose.model('Tractors', tractorSchema)
export { Tractor }
