import mongoose, {Schema} from "mongoose"

const UserSchema = new Schema({
        name: {type: String, required: true},
        cpf: {type: String, required: true},
        cellphone: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        confirmPassword: {type: String, required: true},
        state: {type: String, required: true},
        city: {type: String, required: true},
        address: {type: String, required: true},
        houseNumber: {type: String, required: true},
        district: {type: String, required: true},
        zip: {type: String, required: true},
    },
    {
        timestamps: true,
    }
)

const UserInfo = mongoose.models.UserInfo || mongoose.model("UserInfo", UserSchema)
export default UserInfo