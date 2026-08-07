import { useEffect, useState } from "react";

import AdminLayout from "../../components/layout/AdminLayout";
import { getDashboard } from "../../services/dashboardService";
import Loader from "../../components/ui/Loader";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardChart from "../../components/dashboard/DashboardChart";
import RecentEvents from "../../components/dashboard/RecentEvents";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const data = await getDashboard();
        if (isMounted) {
          setDashboard(data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    }

    loadDashboard();

    return () => {
      isMounted = false; // Cleanup flag
    };
  }, []);

  if (!dashboard) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-10">
        <DashboardHeader />

        <DashboardStats stats={dashboard.stats} />

        <DashboardChart events={dashboard.latestEvents} />

        <RecentEvents events={dashboard.latestEvents} />
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
