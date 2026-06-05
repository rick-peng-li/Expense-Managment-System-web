// src/components/ReportTable.js
const ReportTable = ({ reports }) => {
  if (!reports || reports.length === 0) return <p>No reports found.</p>;

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Type</th>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r) => (
          <tr key={r._id}>
            <td className="border px-4 py-2">{new Date(r.date).toLocaleDateString()}</td>
            <td className="border px-4 py-2">{r.type}</td>
            <td className="border px-4 py-2">{r.category}</td>
            <td className="border px-4 py-2">${r.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;
