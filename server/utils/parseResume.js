// Dummy resume parser (replace with ML parser logic)
async function parseResume(fileBuffer) {
  return {
    name: "John Doe",
    skills: ["JavaScript", "Node.js", "MongoDB"],
    experience: 3
  };
}

module.exports = parseResume;
