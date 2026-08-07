function Stats() {
  const stats = [
    { number: "100+", label: "Events" },
    { number: "5000+", label: "Students" },
    { number: "50+", label: "Organizers" },
    { number: "20+", label: "Clubs" },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-xl bg-white p-6 text-center shadow"
          >
            <h2 className="text-4xl font-bold text-blue-700">
              {item.number}
            </h2>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;