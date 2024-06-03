import mongoose, {Schema} from "mongoose"
 
const CreditCardSchema = new Schema({
        cardNumber: {type: String, required: true},
        cardHolderName: {type: String, required: true},
        expirationDate: {type: String, required: true},
        cvc: {type: String, required: true},
        userId: {type: String, required: true},
        iv: {type: String, required: true},
    },
    {
        timestamps: true,
    }
)

const CreditCard = mongoose.models.CreditCard || mongoose.model("CreditCard", CreditCardSchema)
export default CreditCard