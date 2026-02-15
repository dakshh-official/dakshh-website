// 'use client';

// const EventHeader = ({ event }: any) => {

//     const teamText =
//         event.maxMembersPerTeam === 1
//             ? '1 Member'
//             : `${event.minMembersPerTeam} - ${event.maxMembersPerTeam} Members`;

//     return (
//         <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-md">

//             {/* Banner */}
//             {event.banner && (
//                 <div
//                     className="h-56 bg-cover bg-center"
//                     style={{ backgroundImage: `url(${event.banner})` }}
//                 />
//             )}

//             <div className="p-6 space-y-3">
//                 <h1 className="text-3xl font-bold text-white">
//                     {event.eventName}
//                 </h1>

//                 <p className="text-gray-400">
//                     {event.category} • {event.date} • {event.time}
//                 </p>

//                 {event.isTeamEvent && (
//                     <p className="text-sm text-blue-400">
//                         Team Size: {teamText}
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default EventHeader;

// 'use client';

// const EventHeader = ({ event }: any) => {

//     event.banner = "https://res.cloudinary.com/dc23g63i8/image/upload/v1771098903/TechTussle_becjob.png"
//   return (
//     <header className="flex flex-col gap-2 border-b border-white/10 pb-6">
      
//       {event.banner && (
//         <div className="relative h-40 sm:h-52 rounded-2xl overflow-hidden">
//             <img
//             src={event.banner}
//             alt={event.eventName}
//             className="absolute inset-0 w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black/40" />
//         </div>
//         )}

      
//       <h1 className="text-7xl font-extrabold tracking-wider text-white mt-2px">
//         {event.eventName}
//       </h1>

//     </header>
//   );
// };

// export default EventHeader;


'use client';

const EventHeader = ({ event }: any) => {
  const teamText =
    event.maxMembersPerTeam === 1
      ? '1 Member'
      : `${event.minMembersPerTeam} - ${event.maxMembersPerTeam} Members`;

       event.banner = "https://res.cloudinary.com/dc23g63i8/image/upload/v1771098903/TechTussle_becjob.png"
  return (
    <div className="space-y-4">
      {/* Banner */}
      {event.banner && (
        <div className="relative h-40 sm:h-52 rounded-2xl overflow-hidden">
          <img
            src={event.banner}
            alt={event.eventName}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="space-y-2">
      <h1
        className="
          text-xl sm:text-2xl md:text-3xl
          font-bold text-white
          break-words
          leading-tight
          max-w-full
        "
      >
        {event.eventName}
      </h1>
      </div>
    </div>
  );
};

export default EventHeader;
