import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <div />
          <div>
            <Link to="/" className="inline-block bg-white text-slate-700 px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50">
              View Site
            </Link>
          </div>
        </div>

        {children}

      </main>

    </div>
  );
}

export default AdminLayout;