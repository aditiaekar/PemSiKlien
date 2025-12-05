export default function Label({ htmlFor, children, className = "" }) {
  // atom Label
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {" "}
      {/* tailwind classes */}
      {children} {/* isi label */}
    </label>
  );
}
