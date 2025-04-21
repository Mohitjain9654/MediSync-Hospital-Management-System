import React, { useEffect, useState } from "react";
import axios from "axios";

const RecordsList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/records");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="data-table-container">
      <h2 className="table-title">Medical Records</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Date</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.record_id}</td>
              <td>{record.patient_id}</td>
              <td>{record.doctor_id}</td>
              <td>{record.visit_date}</td>
              <td>{record.diagnosis}</td>
              <td>{record.prescription}</td>
              <td>{record.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsList;
