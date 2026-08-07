const EmptyState = ({
  title = "Nothing here",
  message = "No data available.",
}) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;