function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <h1 className="text-5xl font-bold">
          EventHub
        </h1>

        <p className="mt-6 text-xl leading-8">
          Organize workshops, hackathons, seminars,
          and cultural events with one powerful platform.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="text-3xl font-bold">
            {title}
          </h2>

          <p className="mt-2 text-slate-500">
            {subtitle}
          </p>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;