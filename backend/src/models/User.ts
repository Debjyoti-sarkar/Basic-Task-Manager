import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
}, {
    timestamps: true
});

UserSchema.pre('save', async function (this: IUser) {
    if (!this.isModified('passwordHash')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    } catch (error: any) {
        throw error;
    }
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model<IUser>('User', UserSchema);
