import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const uploadResume = (formData) => API.post("/resumes/upload", formData);
export const getAllResumes = () => API.get("/resumes/list");
export const filterResumes = (skill) => API.get(`/resumes/filter?skill=${skill}`);
export const searchResumes = (keyword) => API.get(`/resumes/search?keyword=${keyword}`);
