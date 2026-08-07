import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Input({
  label,
  type = "text",
  icon,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      {label && (
        <label className="font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-3.5 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          {...props}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-3.5 text-slate-500"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;