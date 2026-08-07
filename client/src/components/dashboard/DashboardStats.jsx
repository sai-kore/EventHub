import { Calendar, Users, Ticket, Activity } from "lucide-react";

import StatsCard from "../ui/StatsCard";

function DashboardStats({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Events"
        value={stats.totalEvents}
        icon={<Calendar size={36} />}
      />

      <StatsCard
        title="Users"
        value={stats.totalUsers}
        icon={<Users size={36} />}
      />

      <StatsCard
        title="Registrations"
        value={stats.totalRegistrations}
        icon={<Ticket size={36} />}
      />

      <StatsCard
        title="Active"
        value={stats.totalEvents}
        icon={<Activity size={36} />}
      />
    </div>
  );
}

export default DashboardStats;
