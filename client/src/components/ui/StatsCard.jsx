import Card from "./Card";

function StatsCard({
  title,
  value,
  icon,
}) {
  return (
    <Card>

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-blue-600">
          {icon}
        </div>

      </div>

    </Card>
  );
}

export default StatsCard;