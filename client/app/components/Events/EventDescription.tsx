// 'use client';

// import { useState } from 'react';
// import RulesModal from './RulesModal';
// import PocModal from './PocModal';
// import ReadMoreModal from './ReadMoreModal';

// const EventInfo = ({ event }: any) => {
//     const [showRules, setShowRules] = useState(false);
//     const [showPoc, setShowPoc] = useState(false);
//     const [showDesc, setShowDesc] = useState(false);

//     const shortDesc =
//         event.description.length > 200
//             ? event.description.slice(0, 200) + '...'
//             : event.description;

//     return (
//         <>
//             <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
//                 <h2 className="text-xl font-semibold text-white">Description</h2>

//                 <p className="text-gray-300">
//                     {shortDesc}
//                     {event.description.length > 200 && (
//                         <button
//                             onClick={() => setShowDesc(true)}
//                             className="ml-2 text-blue-400 hover:underline"
//                         >
//                             Read more
//                         </button>
//                     )}
//                 </p>

//                 <div className="flex flex-wrap gap-4 pt-4">
//                     <button
//                         onClick={() => setShowRules(true)}
//                         className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
//                     >
//                         Rules
//                     </button>

//                     <button
//                         onClick={() => setShowPoc(true)}
//                         className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black"
//                     >
//                         POCs
//                     </button>

//                     <button className="ml-auto px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold">
//                         Register Now
//                     </button>
//                 </div>
//             </div>

//             {showRules && <RulesModal rules={event.rules} onClose={() => setShowRules(false)} />}
//             {showPoc && <PocModal pocs={event.pocs} onClose={() => setShowPoc(false)} />}
//             {showDesc && <ReadMoreModal text={event.description} onClose={() => setShowDesc(false)} />}
//         </>
//     );
// };

// export default EventInfo;

'use client';

const EventDescription = ({ event, onReadMore }: any) => {
   if (!event?.description) {
    return (
      <p className="text-sm text-neutral-400">
        No description available.
      </p>
    );
  }

  const short =
    event.description.length > 220
      ? event.description.slice(0, 220) + '...'
      : event.description;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white tracking-wide">
        Instructions
      </h2>

      <p className="text-gray-300 leading-relaxed">
        {short}
        {event.description.length > 220 && (
          <button
            onClick={onReadMore}
            className="ml-2 text-blue-400 hover:underline"
          >
            Read more
          </button>
        )}
      </p>  
      <p className="text-sm text-gray-400 uppercase tracking-wide">
        {event.category} • {event.date} • {event.time}
      </p>

      {event.isTeamEvent && (
        <p className="text-xs text-blue-400">
          Team Size: {event.minMembersPerTeam} - {event.maxMembersPerTeam}
        </p>
      )}

    </div>
  );
};

export default EventDescription;