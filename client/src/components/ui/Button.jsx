import { motion } from "framer-motion";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const base =
    "rounded-xl px-5 py-3 font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-slate-800 text-white hover:bg-slate-900",

    danger:
      "bg-red-500 text-white hover:bg-red-600",

    outline:
      "border border-slate-300 hover:bg-slate-100",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default Button;