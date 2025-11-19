export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}
