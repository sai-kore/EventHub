import { Search } from "lucide-react";

function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="relative mb-8">

      <Search
        size={20}
        className="absolute left-4 top-4 text-gray-400"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder="Search Events..."
        className="w-full rounded-xl border p-4 pl-12"
      />

    </div>
  );
}

export default SearchBar;