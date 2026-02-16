// 'use client';

// const EventSidePanel = ({ event }: any) => {
//   return (
//     <aside className="space-y-4 text-sm text-gray-300">
//       <h3 className="text-lg text-white font-semibold tracking-wide">
//         Event Details
//       </h3>

//       <p><span className="text-white">Venue:</span> {event.venue}</p>
//       <p><span className="text-white">Duration:</span> {event.duration}</p>
//       <p><span className="text-white">Prize:</span> {event.prizePool}</p>
//       <p>
//         <span className="text-white">Fees:</span>{' '}
//         {event.isPaidEvent ? `₹${event.fees}` : 'Free'}
//       </p>

//       {event.clubs?.length > 0 && (
//         <p>
//           <span className="text-white">Organised by:</span>{' '}
//           {event.clubs.join(', ')}
//         </p>
//       )}
//     </aside>
//   );
// };

// export default EventSidePanel;


// 'use client';

// const EventSidePanel = ({ event }: any) => {
//   return (
//     <aside
//       className="
//         h-full
//         rounded-3xl
//         bg-white/5
//         border border-white/10
//         p-6
//         flex flex-col
//         gap-6
//       "
//     >
//       {/* HEADER */}
//       <h3 className="text-xl font-bold tracking-wide text-white">
//         EVENT DETAILS
//       </h3>

//       <div className="h-px bg-white/10" />

//       {/* DETAILS */}
//       <div className="space-y-4 text-[15px] text-gray-200 leading-relaxed">
//         <Detail label="Venue" value={event.venue} />
//         <Detail label="Date" value={event.date} />
//         <Detail label="Time" value={event.time} />
//         <Detail label="Duration" value={event.duration} />

//         {event.isPaidEvent && (
//           <Detail label="Entry Fee" value={`₹${event.fees}`} />
//         )}

//         {event.prizePool && (
//           <Detail label="Prize Pool" value={`₹${event.prizePool}`} />
//         )}
//       </div>

//       <div className="h-px bg-white/10 mt-2" />

//       {/* TEAM INFO */}
//       {event.isTeamEvent && (
//         <div className="mt-2">
//           <p className="text-white font-semibold mb-1">Team Size</p>
//           <p className="text-gray-300 text-sm">
//             {event.minMembersPerTeam} – {event.maxMembersPerTeam} Members
//           </p>
//         </div>
//       )}
//     </aside>
//   );
// };

// const Detail = ({ label, value }: { label: string; value?: string }) => {
//   if (!value) return null;

//   return (
//     <div className="bg-white/5 rounded-xl px-4 py-2">
//       <p className="text-xs uppercase tracking-wider text-gray-400">
//         {label}
//       </p>
//       <p className="text-white font-medium mt-0.5">
//         {value}
//       </p>
//     </div>
//   );
// };

// export default EventSidePanel;


'use client';

const EventSidePanel = ({ event }: any) => {
  return (
    <aside
      className="
        h-full
        rounded-3xl
        bg-white/5
        border border-white/10
        p-5 sm:p-6
        flex flex-col
        gap-4 sm:gap-5
      "
    >
      <h3 className="text-lg sm:text-xl font-semibold text-white">
        Event Details
      </h3>

      <div className="space-y-3 text-sm sm:text-base text-gray-300">
        <p>
          <span className="text-white font-medium">Venue:</span>{' '}
          {event.venue}
        </p>

        <p>
          <span className="text-white font-medium">Duration:</span>{' '}
          {event.duration}
        </p>

        <p>
          <span className="text-white font-medium">Prize Pool:</span>{' '}
          {event.prizePool}
        </p>

        <p>
          <span className="text-white font-medium">Fees:</span>{' '}
          {event.isPaidEvent ? `₹${event.fees}` : 'Free'}
        </p>

        {event.clubs?.length > 0 && (
          <p>
            <span className="text-white font-medium">Organised by:</span>{' '}
            {event.clubs.join(', ')}
          </p>
        )}
      </div>
    </aside>
  );
};

export default EventSidePanel;
