export default function Modal({ open, onClose, title, children }) {
  if (!open) return null; // tidak render jika tertutup
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      {" "}
      {/* overlay */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {" "}
        {/* konten modal */}
        <div className="flex justify-between items-center p-4 border-b">
          {" "}
          {/* header */}
          <h2 className="text-lg font-semibold">{title}</h2> {/* judul */}
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            &times;
          </button>{" "}
          {/* tombol tutup */}
        </div>
        <div className="p-4">{children}</div> {/* body */}
      </div>
    </div>
  );
}
