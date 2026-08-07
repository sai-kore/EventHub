import { useEffect, useState } from "react";
import { User, Mail, Shield, Ticket, LogOut } from "lucide-react";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import useAuth from "../hooks/useAuth";
import { getMyRegistrations } from "../services/registrationService";

function Profile() {
  const { user, logout } = useAuth();
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const data = await getMyRegistrations();
        if (isMounted) {
          setTotalRegistrations(data?.registrations?.length || 0);
        }
      } catch (err) {
        console.error("Failed to fetch registrations count:", err);
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <div className="mx-auto max-w-xl py-12 px-6">
        <h1 className="mb-8 text-3xl font-bold text-center">User Profile</h1>

        <Card className="p-8">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl font-bold shadow-inner">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="text-gray-500" size={20} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Name</p>
                <p className="font-semibold text-gray-800">{user?.name || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="text-gray-500" size={20} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="font-semibold text-gray-800">{user?.email || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Shield className="text-gray-500" size={20} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Role</p>
                <p className="font-semibold text-gray-800 capitalize">
                  {user?.role || "User"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Ticket className="text-gray-500" size={20} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Registrations</p>
                <p className="font-semibold text-gray-800">{totalRegistrations}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 py-3"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </Card>
      </div>
    </Layout>
  );
}

export default Profile;