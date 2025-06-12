from flask import Flask, request, jsonify
import spacy
import re

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

@app.route('/parse', methods=['POST'])
def parse_resume():
    content = request.json
    text = content.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    doc = nlp(text)
    name = extract_name(doc)
    email = extract_email(text)
    phone = extract_phone(text)
    skills = extract_skills(text)
    experience = extract_experience(text)

    response = {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "experience": experience
    }
    return jsonify(response)

def extract_name(doc):
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return ""

def extract_email(text):
    email = re.findall(r'\b\S+@\S+\b', text)
    return email[0] if email else ""

def extract_phone(text):
    phone = re.findall(r'\+?\d[\d \-]{8,15}\d', text)
    return phone[0] if phone else ""

def extract_skills(text):
    skill_keywords = ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Java']
    skills = [skill for skill in skill_keywords if re.search(r'\b' + re.escape(skill) + r'\b', text, re.IGNORECASE)]
    return skills

def extract_experience(text):
    exp = re.findall(r'(\d+)\s?(years|yrs)', text, re.IGNORECASE)
    return exp[0][0] + " years" if exp else ""

if __name__ == '__main__':
    app.run(port=5000)
