import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Fetch Patients
export const getPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients`);
    return response.data;  // Assumes the server returns an array of patients
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];  // Return an empty array if there's an error
  }
};

// POST Patient
export const createPatient = async (patientData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/patients`, patientData);
    return response.data;  // Assumes the server returns the created patient data
  } catch (error) {
    console.error("Error creating patient:", error);
    return null;  // Return null if there's an error
  }
};

// Fetch Doctors
export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    return response.data;  // Assumes the server returns an array of doctors
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];  // Return an empty array if there's an error
  }
};

// Fetch Appointments
export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`);
    return response.data;  // Assumes the server returns an array of appointments
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];  // Return an empty array if there's an error
  }
};


// DELETE Patient
export const deletePatient = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/patients/${id}`);
    console.log(`Patient with ID ${id} deleted.`);
  } catch (error) {
    console.error(`Error deleting patient with ID ${id}:`, error);
  }
};

// Search Patients
export const searchPatients = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching patients:", error);
    return [];
  }
};


// Search Doctors
export const searchDoctors = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/doctors/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching doctors:", error);
    return [];
  }
};

// Add a new Doctor
export const createDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/doctors`, doctorData);
    return response.data;  // Assumes the server returns the created doctor data
  } catch (error) {
    console.error("Error creating doctor:", error);
    return null;  // Return null if there's an error
  }
};
