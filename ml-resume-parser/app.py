from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from parser import parse_resume

# Optional: Download nltk data automatically
import nltk
nltk.download('stopwords')
nltk.download('wordnet')

app = Flask(__name__)
CORS(app)

@app.route('/parse', methods=['POST'])
def parse():
    data = request.get_json()
    file_path = data.get('file_path')

    if not file_path or not os.path.exists(file_path):
        return jsonify({'error': 'Invalid file path provided.'}), 400

    result = parse_resume(file_path)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
