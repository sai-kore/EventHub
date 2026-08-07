function EmptyState({
  message = "No data found",
}) {
  return (
    <div className="py-20 text-center">

      <h2 className="text-xl text-gray-500">
        {message}
      </h2>

    </div>
  );
}

export default EmptyState;