import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getUsers, updateUserRole } from "../../services/adminService";
import toast from "react-hot-toast";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data.users || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleRole = async (user) => {
    const newRole = user.role === "admin" ? "attendee" : "admin";
    try {
      await updateUserRole(user._id, newRole);
      toast.success(`Updated ${user.email} to ${newRole}`);
      loadUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        <Card>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="space-y-4">
              {users.length === 0 && <p>No users found.</p>}
              {users.map((u) => (
                <div key={u._id} className="flex items-center justify-between gap-4 p-3 rounded-md border">
                  <div>
                    <div className="font-semibold">{u.name || "—"}</div>
                    <div className="text-sm text-slate-500">{u.email}</div>
                    <div className="text-xs text-slate-400">Joined: {new Date(u.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm ${u.role === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      {u.role}
                    </div>
                    <Button onClick={() => toggleRole(u)}>{u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}

export default ManageUsers;
