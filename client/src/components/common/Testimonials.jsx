const testimonials = [
  {
    name: "Rahul",
    course: "Computer Engineering",
    text: "The best platform for college event registrations.",
  },
  {
    name: "Sneha",
    course: "IT Department",
    text: "Very easy to use and beautifully designed.",
  },
  {
    name: "Aman",
    course: "Electronics",
    text: "I registered for every hackathon through EventHub.",
  },
];

function Testimonials() {
  return (
    <section className="py-24">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-center text-4xl font-bold mb-14">
          What Students Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="rounded-xl shadow-lg p-8 bg-white"
            >

              <p className="italic mb-6">
                "{item.text}"
              </p>

              <h4 className="font-semibold">
                {item.name}
              </h4>

              <span className="text-gray-500">
                {item.course}
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;