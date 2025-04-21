const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
        },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    })