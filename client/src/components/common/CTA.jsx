import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-blue-700 text-white py-24">

      <div className="max-w-5xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold mb-6">
          Ready to Join Your Next Event?
        </h2>

        <p className="text-lg mb-10">
          Discover exciting college events and register with ease.
        </p>

        <Link
          to="/events"
          className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Explore Events
        </Link>

      </div>

    </section>
  );
}

export default CTA;