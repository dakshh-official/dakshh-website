'use client';

const EventActions = ({ onRules, onPoc }: any) => {
  return (
    <div className="flex gap-4 pt-6">
      <button className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
        Register Now
      </button>

      <button
        onClick={onRules}
        className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10"
      >
        Rules
      </button>

      <button
        onClick={onPoc}
        className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10"
      >
        POCs
      </button>
    </div>
  );
};

export default EventActions;
