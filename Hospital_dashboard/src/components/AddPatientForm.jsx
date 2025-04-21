import React, { useState } from "react";
import { createPatient } from "../services/api";
import "./AddPatientForm.css";

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createPatient(formData);
    if (result) {
      alert("Patient added successfully!");
      setFormData({
        name: "",
        gender: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Patient</h2>
      <div className="add_patient">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
      <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
      </div>
      <div className="add_patient">
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      </div>
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default AddPatientForm;
