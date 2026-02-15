'use client';

const ReadMoreModal = ({ text, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-zinc-900 max-w-lg w-full p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Description</h2>

        <p className="text-gray-300 max-h-72 overflow-y-auto">
          {text}
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReadMoreModal;
