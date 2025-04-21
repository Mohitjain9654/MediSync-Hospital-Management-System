import React, { useEffect, useState } from "react";
import { getDoctors, searchDoctors, createDoctor } from "../services/api";
import "./Doctor.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    address: "",
  });

  // Fetch all doctors
  const fetchDoctors = async () => {
    const data = await getDoctors();
    setDoctors(data);
  };

  // Fetch doctors on initial load
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === "") {
      fetchDoctors(); // Reset to all doctors when the search term is empty
    } else {
      const results = await searchDoctors(query);
      setDoctors(results);
    }
  };

  // Handle adding a new doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    const addedDoctor = await createDoctor(newDoctor);
    if (addedDoctor) {
      fetchDoctors(); // Fetch updated list of doctors after adding new one
      setNewDoctor({
        name: "",
        specialization: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Doctors</h2>

      {/* Add Doctor Form */}
      <form onSubmit={handleAddDoctor}>
        <div className="add_patient">
          
        <input
          type="text"
          placeholder="Name"
          value={newDoctor.name}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Specialization"
          value={newDoctor.specialization}
          onChange={(e) =>
            setNewDoctor({ ...newDoctor, specialization: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newDoctor.phone}
          onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
          required
        />
        </div>
        <div className="add_patient">
        <input
          type="email"
          placeholder="Email"
          value={newDoctor.email}
          onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={newDoctor.address}
          onChange={(e) => setNewDoctor({ ...newDoctor, address: e.target.value })}
          required
        />
        <button type="submit">Add Doctor</button>
        </div>
      </form>

      {/* Search Doctors */}
      <input
        type="text"
        placeholder="Search by Name or ID"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Doctors Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.doctor_id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.email}</td>
              <td>{doctor.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
