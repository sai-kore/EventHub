import useAuth from "../../hooks/useAuth";

function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back,
          <span className="text-blue-600"> {user?.name}</span>
        </h1>

        <p className="mt-2 text-gray-500">Here's what's happening today.</p>
      </div>
    </div>
  );
}

export default DashboardHeader;
