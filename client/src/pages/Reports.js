// src/pages/Reports.js
import { useState, useEffect } from "react";
import API from "../utils/api";
import ReportTable from "../components/ReportTable";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get("/expenses");
        setReports(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <ReportTable reports={reports} />
    </div>
  );
};

export default Reports;
