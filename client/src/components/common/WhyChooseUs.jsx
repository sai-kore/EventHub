import {
  FaClock,
  FaMobileAlt,
  FaUsers,
  FaBell,
} from "react-icons/fa";

const features = [
  {
    icon: <FaClock />,
    title: "Quick Registration",
    desc: "Register in seconds.",
  },
  {
    icon: <FaBell />,
    title: "Instant Updates",
    desc: "Never miss an event.",
  },
  {
    icon: <FaUsers />,
    title: "Community",
    desc: "Connect with students.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Responsive",
    desc: "Works on every device.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-gray-100 py-24">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose EventHub?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item) => (

            <div
              key={item.title}
              className="bg-white rounded-xl p-8 shadow hover:shadow-xl transition"
            >

              <div className="text-4xl text-blue-600 mb-5">
                {item.icon}
              </div>

              <h3 className="font-semibold text-xl mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;