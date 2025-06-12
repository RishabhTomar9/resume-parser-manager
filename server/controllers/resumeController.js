const Resume = require("../models/Resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");

exports.uploadResume = async (req, res) => {
  const { file } = req;
  const dataBuffer = fs.readFileSync(file.path);
  const uploaderId = req.user.id;

  const data = await pdfParse(dataBuffer);
  const text = data.text;

  const extractedData = {
    name: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text),
    experience: extractExperience(text),
    education: extractEducation(text),
  };

  const newResume = new Resume({
    uploader: uploaderId,
    fileUrl: file.path,
    parsedData: extractedData,
  });

  await newResume.save();
  res.json({ message: "Resume uploaded & parsed successfully", resume: newResume });
};

// Very simple extractors (improve later!)
const extractName = (text) => text.split('\n')[0];
const extractEmail = (text) => text.match(/\S+@\S+\.\S+/)?.[0] || "";
const extractPhone = (text) => text.match(/\d{10}/)?.[0] || "";
const extractSkills = (text) => [];
const extractExperience = (text) => "";
const extractEducation = (text) => "";
