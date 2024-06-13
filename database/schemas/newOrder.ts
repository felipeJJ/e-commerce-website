import mongoose, { Schema } from "mongoose"

const NewPurchaseOrderSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "userInfo", required: true },
        products: [
            {
                productId: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true }
            }
        ],
        freight: { type: Schema.Types.Mixed, required: true },
        payment: { type: Schema.Types.Mixed, required: true },
        status: { type: String, required: true, default: "Pendente" },
        shippingAddress: {
            recipientName: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true }
        },
        shippedAt: { type: Date },
        trackingNumber: { type: String },
        orderNotes: { type: String },
        statusHistory: [
            {
                status: { type: String},
                date: { type: Date}
            }
        ]
    },
    {
        timestamps: true
    }
);

const PurchaseOrders = mongoose.models.PurchaseOrders || mongoose.model("PurchaseOrders", NewPurchaseOrderSchema)
export default PurchaseOrders
