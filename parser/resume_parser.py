import sys
import re

def parse_resume(file_path):
    import fitz  # PyMuPDF
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()

    name = extract_name(text)
    skills = extract_skills(text)
    experience = extract_experience(text)
    
    return {
        "name": name,
        "skills": skills,
        "experience": experience
    }

def extract_name(text):
    lines = text.split('\n')
    for line in lines:
        if len(line.split()) >= 2:
            return line.strip()
    return "Unknown"

def extract_skills(text):
    skills = ['Python', 'Java', 'React', 'Node.js', 'MongoDB', 'SQL', 'Django', 'AWS', 'Docker']
    found = [skill for skill in skills if skill.lower() in text.lower()]
    return ', '.join(found)

def extract_experience(text):
    exp_match = re.search(r'(\d+)\s+years', text, re.I)
    return f"{exp_match.group(1)} years" if exp_match else "Not found"

if __name__ == '__main__':
    file_path = sys.argv[1]
    result = parse_resume(file_path)
    print(result)
