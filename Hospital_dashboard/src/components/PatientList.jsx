import React, { useEffect, useState } from "react";
import { getPatients, deletePatient, searchPatients } from "../services/api";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    const deleted = await deletePatient(id);
    if (deleted) {
      fetchPatients();
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === "") {
      fetchPatients();
    } else {
      const results = await searchPatients(query);
      setPatients(results);
    }
  };

  return (
    <div>
      <h2 className="table-title">Patients</h2>
      <input
        type="text"
        placeholder="Search by Name or ID"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.patient_id}>
              <td>{patient.patient_id}</td>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.dob}</td>
              <td>{patient.phone}</td>
              <td>{patient.email}</td>
              <td>{patient.address}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(patient.patient_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
