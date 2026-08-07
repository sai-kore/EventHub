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
    name: event.title,

    capacity: event.capacity,
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">Event Capacity</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="capacity" radius={6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;
