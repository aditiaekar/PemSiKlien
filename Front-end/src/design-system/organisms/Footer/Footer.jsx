export default function Footer({ children }) {
  // organism Footer
  return (
    <footer className="bg-white text-center py-4 shadow-inner text-sm text-gray-600">
      {" "}
      {/* wrapper */}
      {children} {/* konten footer */}
    </footer>
  );
}
