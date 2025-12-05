export default function Form({ onSubmit, children, className = "" }) {
  // wrapper form
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      {/* gap antar field */}
      {children} {/* isi form */}
    </form>
  );
}
