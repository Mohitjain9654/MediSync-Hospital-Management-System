import React, { useEffect, useState } from "react";
import axios from "axios";

const BillingList = () => {
  const [billing, setBilling] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/billing");
        setBilling(response.data);
      } catch (error) {
        console.error("Error fetching billing:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="data-table-container">
      <h2 className="table-title">Billing</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {billing.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.bill_id}</td>
              <td>{bill.patient_id}</td>
              <td>{bill.amount}</td>
              <td>{bill.payment_status}</td>
              <td>{bill.billing_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingList;
