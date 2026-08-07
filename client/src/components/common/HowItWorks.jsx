import { FaSearch, FaUserCheck, FaCalendarCheck } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch size={35} />,
    title: "Browse Events",
    desc: "Explore all upcoming workshops, hackathons and college events.",
  },
  {
    icon: <FaUserCheck size={35} />,
    title: "Register",
    desc: "Register instantly with a single click.",
  },
  {
    icon: <FaCalendarCheck size={35} />,
    title: "Attend & Enjoy",
    desc: "Receive updates and participate without hassle.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {steps.map((step) => (

            <div
              key={step.title}
              className="rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 transition"
            >
              <div className="text-blue-600 mb-6 flex justify-center">
                {step.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600">
                {step.desc}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;