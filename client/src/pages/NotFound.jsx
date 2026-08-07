import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Layout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-gray-600">Page Not Found</p>
        <Link
          to="/"
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </Layout>
  );
}

export default NotFound;