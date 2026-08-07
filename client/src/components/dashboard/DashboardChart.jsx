import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardChart({ events }) {
  const data = events.map((event) => ({
    name: event.eventTitle || event.title || "Unknown Event",
    registrations: event.registrationCount ?? event.capacity ?? 0,
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">Top Event Participation</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="registrations" radius={6} fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;
