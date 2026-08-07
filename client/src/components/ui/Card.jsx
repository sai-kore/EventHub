function Card({ children }) {
  return (
    <div className="rounded-2xl bg-white shadow-md p-6">
      {children}
    </div>
  );
}

export default Card;