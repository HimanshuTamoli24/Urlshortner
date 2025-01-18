import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {  // Change from 'url' to 'redirectUrl'
        type: String,
        required: true,
        unique: true,
    },
    visitHistory: [
        { timestamps: { type: Number } }
    ],
},
    { timestamps: true }
);

const Url = mongoose.model('Url', urlSchema);

export default Url;
