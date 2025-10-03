const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    reusme_name: {
        type: String,
        required: true
    },
    job_desc: {
        type: String,
        required: true
    },
    score: {
        type: String,
    },
    feedback: {
        type: String,
    }
}, { timestamps: true });

const Resume = mongoose.model('resume', resumeSchema);

module.exports = Resume;
