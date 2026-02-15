'use client';

const PocModal = ({ pocs, onClose }: any) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-zinc-900 rounded-xl p-6 max-w-md w-full border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">
                    Points of Contact
                </h2>

                {pocs.map((poc: any, i: number) => (
                    <div key={i} className="mb-3">
                        <p className="text-white font-semibold">{poc.name}</p>
                        <p className="text-gray-300 text-sm">{poc.mobile}</p>
                    </div>
                ))}

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

export default PocModal;