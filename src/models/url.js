import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    
    redirectUrl: {
        type: String,
        required: true,
        unique: true,
    },
    visitHistory: [
        { timestamps: { type: Date, default: Date.now } }
    ],
},
    { timestamps: true }
);
const Url = mongoose.model('Url', urlSchema);
export default Url;