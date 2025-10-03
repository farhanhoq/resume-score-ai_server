const Resume = require('../Models/resume');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const cohere = require('cohere-ai');

exports.addResume = async (req, res) => {
    try {
        const { user, job_desc } = req.body;

    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error',message: err.message });
    }
}