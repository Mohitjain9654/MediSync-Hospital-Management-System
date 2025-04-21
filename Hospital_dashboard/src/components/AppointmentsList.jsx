import React, { useEffect, useState } from "react";
import { getAppointments } from "../services/api";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setAppointments(await getAppointments());
    }
    fetchData();
  }, []);

  return (
    <div className="data-table-container">
      <h2 className="table-title">Appointments</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Date</th>
            <th>Appointment time</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.appointment_id}</td>
              <td>{a.patient_id}</td>
              <td>{a.doctor_id}</td>
              <td>{a.appointment_date}</td>
              <td>{a.appointment_time}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsList;
