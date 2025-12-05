export default function Input({ id, name, type = "text", value, onChange, placeholder, required, className = "" }) {
  // atom Input (controlled)
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange} // controlled props
      placeholder={placeholder}
      required={required} // attr umum
      className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${className}`} // tailwind
    />
  );
}
