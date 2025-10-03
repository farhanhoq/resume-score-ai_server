const ResumeModel = require('../Models/resume');
const multer = require("multer");
const pdfparse = require('pdf-parse');
const path = require("path");
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
})

exports.addResume = async (req, res) => {
    try {
        const { user, job_desc } = req.body;
        
        const pdfBuffer = req.file.buffer || null;
        const pdfPath = req.file.path;
        const fs = require('fs');
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfparse(dataBuffer);

        console.log(req.file.originalname)

        const prompt = `
            You are a resume screening assistant.
            Compare the following resume text with the provided Job Description (JD) and give a match score (0-100) and feedback. Divide the feedback into sections: "Strengths" and "Areas for Improvement".

            Resume:
            ${pdfData.text}

            Job Description:
            ${job_desc}

            Provide the response in the following  format:
            Score: <score>
            Strengths:
            Areas for Improvement:

            `
            ;

            const response = await cohere.chat({
                model: 'command-r-plus-08-2024',
                message: prompt,
                max_tokens: 2000,
                temperature: 0.3,
            });

            let result = response.text;
            // console.log(result)

            const match = result.match(/Score:\s*(\d+)/);
            const score = match ? parseInt(match[1], 10) : 'N/A';

            const strengthMatch = result.match(/Strengths:\s*([\s\S]*)Areas for Improvement:/);
            const improvementMatch = result.match(/Areas for Improvement:\s*([\s\S]*)/);

            const strengths = strengthMatch ? strengthMatch[1].trim() : 'N/A';
            const areasForImprovement = improvementMatch ? improvementMatch[1].trim() : 'N/A';

            const newResume = new ResumeModel({
                user,
                resume_name: req.file.originalname,
                job_desc,
                score,
                strength: strengths,
                improvement: areasForImprovement
            });

            await newResume.save();

            fs.unlinkSync(pdfPath); // Delete the file after processing

            res.status(200).json({ message: 'Analytics Complete', data: newResume });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Server error', message: err.message });
        }
}

exports.getAllResumeForUser = async (req, res) => {
    try {
        const { user } = req.params;
        let resumes = await ResumeModel.find({ user: user }).sort({ createdAt: -1 });
        res.status(200).json({ data: resumes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}