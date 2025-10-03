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

            console.log(strengths, areasForImprovement);

    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}

