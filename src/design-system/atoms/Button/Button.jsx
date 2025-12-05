export default function Button({ type = "button", onClick, children, className = "", disabled = false }) {
  // atom Button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} // props utama
      className={`px-4 py-2 rounded transition ${disabled ? "opacity-70 cursor-not-allowed" : ""} ${className}`} // style & state
    >
      {children} {/* label/ikon */}
    </button>
  );
}
