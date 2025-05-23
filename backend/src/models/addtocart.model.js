import mongoose,{ Schema} from "mongoose";

const cartSchema = new Schema(
    {

        postId: {
            type: Schema.Types.ObjectId,
            ref:"Post",
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true
        }

    
},{timestamps: true})

export const Cart = mongoose.model("Cart",cartSchema);
