import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    description: string;
    createdAt: Date;
    deadline: Date;
    priority: 'Low' | 'Medium' | 'High';
    tags: string[];
    isCompleted: boolean;
}

const TodoSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    deadline: { type: Date, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    tags: [{ type: String }],
    isCompleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
