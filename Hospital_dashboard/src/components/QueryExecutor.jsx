import React, { useState } from "react";
import axios from "axios";

const QueryExecutor = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/query`, { query });
      const data = response.data.rows || []; // ✅ Make sure you're reading the correct key
      if (data.length > 0) {
        setColumns(Object.keys(data[0]));
        setResult(data);
      } else {
        setResult([]);
        setColumns([]);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Error executing query.");
      setResult([]);
      setColumns([]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">SQL Query Executor</h2>
      <form onSubmit={handleQuerySubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded resize-none h-32"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Write your SQL query here..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Run Query
        </button>
      </form>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      {result.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((col) => (
                  <th key={col} className="px-4 py-2 border">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-2 border">{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QueryExecutor;
