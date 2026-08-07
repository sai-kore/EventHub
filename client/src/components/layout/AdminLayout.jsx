import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">

        {children}

      </main>

    </div>
  );
}

export default AdminLayout;