import os
from pyresparser import ResumeParser

def parse_resume(file_path):
    try:
        data = ResumeParser(file_path).get_extracted_data()
        return data
    except Exception as e:
        return {"error": str(e)}
