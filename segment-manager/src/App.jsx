import { useState } from 'react';
import SegmentModal from './components/SegmentModal';

// Toast component for messages
function Toast({ message, type, show, onClose }) {
  if (!show) return null;
  return (
    <div
      className={`fixed top-4 right-4 px-5 py-3 rounded shadow-lg text-white z-50 transition-all ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
      onClick={onClose}
    >
      {message}
    </div>
  );
}

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <button
        className="w-64 py-3 font-semibold rounded-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white text-xl shadow transition-all duration-200"
        onClick={() => setShowModal(true)}
      >
        Save Segment
      </button>
      <SegmentModal show={showModal} onClose={() => setShowModal(false)} showToast={showToast} />
      <Toast {...toast} onClose={() => setToast((prev) => ({ ...prev, show: false }))} />
    </div>
  );
}
