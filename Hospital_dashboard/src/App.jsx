import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PatientList from "./components/PatientList";
import DoctorList from "./components/DoctorList";
import AddPatientForm from "./components/AddPatientForm";
import RecordsList from "./components/RecordsList";
import BillingList from "./components/BillingList";
import AppointmentsList from "./components/AppointmentsList";
import QueryExecutor from "./components/QueryExecutor";
import ScrambleHeading from "./components/ScrambleHeading"; // 👈 import it
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <ScrambleHeading text="Hospital Dashboard" /> {/* 👈 replaced the h1 */}

        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/patients" className="nav-link">
                Patients
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/doctors" className="nav-link">
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-patient" className="nav-link">
                Add Patient
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/records" className="nav-link">
                Medical Records
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/billing" className="nav-link">
                Billing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AppointmentsList" className="nav-link">
                Appointments List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/query" className="nav-link">
                Run SQL Query
              </Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/patients" element={<PatientList />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/add-patient" element={<AddPatientForm />} />
            <Route path="/records" element={<RecordsList />} />
            <Route path="/billing" element={<BillingList />} />
            <Route path="/AppointmentsList" element={<AppointmentsList />} />
            <Route path="/query" element={<QueryExecutor />} />
            <Route path="/" element={<div>Welcome to the Hospital Dashboard!</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
