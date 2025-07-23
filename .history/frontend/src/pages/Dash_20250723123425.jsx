const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Revenue" value="$1,250.00" change="+12.5%" />
        <Card title="New Customers" value="1,234" change="-20%" />
        <Card title="Active Accounts" value="45,678" change="+12.5%" />
        <Card title="Growth Rate" value="4.5%" change="+4.5%" />
      </div>

      {/* Graph placeholder */}
      <div className="bg-zinc-900 rounded-xl p-4">
        <div className="text-lg font-medium mb-2">Total Visitors</div>
        <div className="h-40 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400">
          (Insert Chart Here)
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 rounded-xl p-4">
        <div className="text-lg font-medium mb-2">Documents</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-zinc-400">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-700">
                <th className="py-2 px-3">Section</th>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Reviewer</th>
              </tr>
            </thead>
            <tbody>
              <Row section="Cover page" type="Cover" status="In Progress" reviewer="Eddie" />
              <Row section="Table of contents" type="Table" status="Done" reviewer="Eddie" />
              <Row section="Executive summary" type="Narrative" status="Done" reviewer="Jake" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, change }) => (
  <div className="bg-zinc-900 p-4 rounded-xl space-y-2">
    <div className="text-zinc-400 text-sm">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className={`text-sm ${change.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
      {change}
    </div>
  </div>
);

const Row = ({ section, type, status, reviewer }) => (
  <tr className="border-b border-zinc-800">
    <td className="py-2 px-3">{section}</td>
    <td className="py-2 px-3">{type}</td>
    <td className="py-2 px-3">
      <span className={`px-2 py-1 rounded text-xs ${status === "Done" ? "bg-green-600" : "bg-yellow-600"}`}>
        {status}
      </span>
    </td>
    <td className="py-2 px-3">{reviewer}</td>
  </tr>
);

export default Dashboard;
