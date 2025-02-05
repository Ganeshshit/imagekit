import mongoose from "mongoose";
import bcrypt from "bcryptjs"
export interface IUser{
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

}


const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        
    }
})
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;