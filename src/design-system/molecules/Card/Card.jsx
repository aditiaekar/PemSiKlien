export default function Card({ title, children, className = "" }) {
  // komponen Card
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
      {" "}
      {/* wrapper kartu */}
      {title && <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">{title}</h2>} {/* judul opsional */}
      {children} {/* konten */}
    </div>
  );
}
