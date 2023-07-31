import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    amount: Number,
});

export const Group = mongoose.model('group', groupSchema);