'use client';

const RulesModal = ({ rules = [], onClose }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-zinc-900 rounded-xl p-6 max-w-lg w-full border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">
          Rules & Regulations
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 max-h-64 overflow-y-auto">
          {rules.map((rule: string, i: number) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>

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

export default RulesModal;
