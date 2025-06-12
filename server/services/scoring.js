function scoreCandidate(parsedData, jobRequirements) {
  let score = 0;

  const requiredSkills = jobRequirements.skills;
  const candidateSkills = parsedData.skills;

  const matchedSkills = candidateSkills.filter(skill => requiredSkills.includes(skill));
  score += matchedSkills.length * 10;

  if (parsedData.experience) {
    const expNum = parseInt(parsedData.experience.split(' ')[0]);
    score += expNum * 5;
  }

  return {
    score,
    matchedSkills
  };
}

module.exports = { scoreCandidate };
