function RecentEvents({ events }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">Recent Events</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Event</th>

            <th>Date</th>

            <th>Venue</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event._id} className="border-t">
              <td className="py-4">{event.title}</td>

              <td>{new Date(event.date).toLocaleDateString()}</td>

              <td>{event.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentEvents;
