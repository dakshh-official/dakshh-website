// // 'use client';

// // import Navbar from '@/app/components/Navbar';
// // import { DotOrbit } from '@paper-design/shaders-react';
// // import Crewmates from '@/app/components/Crewmates';
// // import { useParams } from 'next/navigation';
// // import { useEffect, useState } from 'react';
// // import toast from 'react-hot-toast';

// // import EventShell from '@/app/components/Events/EventShell';
// // import EventHeader from '@/app/components/Events/EventHeader';
// // import EventDescription from '@/app/components/Events/EventDescription';
// // import EventActions from '@/app/components/Events/EventActions';

// // import RulesModal from '@/app/components/Events/modals/RulesModal';
// // import PocModal from '@/app/components/Events/modals/PocModal';
// // import ReadMoreModal from '@/app/components/Events/modals/ReadMoreModal';
// // import EventSidePanel from '@/app/components/Events/EventsSidePanel';

// // const EventPage = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const [event, setEvent] = useState<any>(null);
// //   const [showRules, setShowRules] = useState(false);
// //   const [showPoc, setShowPoc] = useState(false);
// //   const [showDesc, setShowDesc] = useState(false);

// //   useEffect(() => {
// //     if (!id) return;

// //     fetch(`/api/events/${id}`)
// //       .then(res => res.json())
// //       .then(setEvent)
// //       .catch(e => toast.error(e.message));
// //   }, [id]);

// //   return (
// //     <div className="w-full min-h-screen relative" data-main-content>
// //       {/* NAVBAR */}
// //       <Navbar />

// //       {/* BACKGROUND PANEL */}
// //       <div className="fixed top-32 left-1/2 -translate-x-1/2 
// //                 h-[92vh] w-[64vw] max-w-3xl 
// //                 z-0 rounded-[40px] overflow-hidden">
					

// //         <DotOrbit
// //           width="100%"
// //           height="100%"
// //           colors={['#ffffff', '#006aff', '#fff675']}
// //           colorBack="#000000"
// //           stepsPerColor={4}
// //           size={0.2}
// //           sizeRange={0.5}
// //           spreading={1}
// //           speed={0.5}
// //           scale={0.35}
// //         />
// //       </div>

// // 	<div className="relative z-10 h-full overflow-hidden">
// // 		<Crewmates />

// //       {/* CONTENT PANEL */}
// //       <div className="relative z-10 mt-32 flex justify-center">
// //         <div className="w-[72vw] max-w-4xl">
// //           {event && (
// //             <EventShell>
// //               <EventHeader event={event} />

// //               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-8">
// //                 <div className="lg:col-span-2">
// //                   <EventDescription
// //                     event={event}
// //                     onReadMore={() => setShowDesc(true)}
// //                   />
// //                   <EventActions
// //                     onRules={() => setShowRules(true)}
// //                     onPoc={() => setShowPoc(true)}
// //                   />
// //                 </div>

// //                 <EventSidePanel event={event} />
// //               </div>
// //             </EventShell>
// //           )}
// //         </div>
// //       </div>

// //       {/* MODALS */}
// //       {showRules && (
// //         <RulesModal
// //           rules={event.rules}
// //           onClose={() => setShowRules(false)}
// //         />
// //       )}

// //       {showPoc && (
// //         <PocModal
// //           pocs={event.pocs}
// //           onClose={() => setShowPoc(false)}
// //         />
// //       )}

// //       {showDesc && (
// //         <ReadMoreModal
// //           text={event.description}
// //           onClose={() => setShowDesc(false)}
// //         />
// //       )}
// //     </div>
// // 	</div>
// //   );
// // };

// // export default EventPage;


// 'use client';

// import Navbar from '@/app/components/Navbar';
// import { DotOrbit } from '@paper-design/shaders-react';
// import Crewmates from '@/app/components/Crewmates';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';

// import EventShell from '@/app/components/Events/EventShell';
// import EventHeader from '@/app/components/Events/EventHeader';
// import EventDescription from '@/app/components/Events/EventDescription';
// import EventActions from '@/app/components/Events/EventActions';
// import EventSidePanel from '@/app/components/Events/EventsSidePanel';

// import RulesModal from '@/app/components/Events/modals/RulesModal';
// import PocModal from '@/app/components/Events/modals/PocModal';
// import ReadMoreModal from '@/app/components/Events/modals/ReadMoreModal';

// const EventPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [event, setEvent] = useState<any>(null);
//   const [showRules, setShowRules] = useState(false);
//   const [showPoc, setShowPoc] = useState(false);
//   const [showDesc, setShowDesc] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     fetch(`/api/events/${id}`)
//       .then(res => res.json())
//       .then(setEvent)
//       .catch(e => toast.error(e.message));
//   }, [id]);

//   return (
//     <div className="w-full min-h-screen relative">
//       <Navbar />

// 	{/* BACKGROUND PANEL (DECORATIVE ONLY) */}
// 	<div
// 		className="
// 			absolute
// 			top-24
// 			left-1/2 -translate-x-1/2
// 			w-[92vw] sm:w-[80vw] lg:w-[64vw]
// 			max-w-4xl
// 			h-[480px] sm:h-[520px] lg:h-[620px]
// 			rounded-[28px] sm:rounded-[40px]
// 			overflow-hidden
// 			z-0
// 	"
//       >
//         <DotOrbit
//           width="100%"
//           height="100%"
//           colors={['#ffffff', '#006aff', '#fff675']}
//           colorBack="#000000"
//           stepsPerColor={4}
//           size={0.2}
//           sizeRange={0.5}
//           spreading={1}
//           speed={0.5}
//           scale={0.35}
//         />
//       </div>

// 	<div className="relative z-10 h-full overflow-hidden">
//       <Crewmates />

// 	{/* CONTENT WRAPPER */}
// <div className="relative z-10 mt-32 px-3 sm:px-0 flex justify-center">
//   <div className="w-full max-w-4xl">
//     {event && (
//       <EventShell>
//         <EventHeader event={event} />

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8">
          
//           {/* LEFT CONTENT */}
//           <div className="lg:col-span-2 space-y-6">
//             <EventDescription
//               event={event}
//               onReadMore={() => setShowDesc(true)}
//             />

//             <EventActions
//               onRules={() => setShowRules(true)}
//               onPoc={() => setShowPoc(true)}
//             />
//           </div>

//           {/* RIGHT PANEL */}
//           <EventSidePanel event={event} />

//         </div>
//       </EventShell>
//     )}
//   </div>
// </div>


//     //   {/* CONTENT */}
//     //   <div className="relative z-10 mt-28 sm:mt-32 flex justify-center px-3 sm:px-0">
//     //     <div className="w-full sm:w-[88vw] lg:w-[72vw] max-w-4xl">
//     //       {event && (
//     //         <EventShell>
//     //           <EventHeader event={event} />

//     //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 pt-6 sm:pt-8">
//     //             <div className="lg:col-span-2 space-y-6">
//     //               <EventDescription
//     //                 event={event}
//     //                 onReadMore={() => setShowDesc(true)}
//     //               />

//     //               <EventActions
//     //                 onRules={() => setShowRules(true)}
//     //                 onPoc={() => setShowPoc(true)}
//     //               />
//     //             </div>

//     //             <EventSidePanel event={event} />
//     //           </div>
//     //         </EventShell>
//     //       )}
//     //     </div>
//     //   </div>

//       {/* MODALS */}
//       {showRules && (
//         <RulesModal
//           rules={event.rules}
//           onClose={() => setShowRules(false)}
//         />
//       )}

//       {showPoc && (
//         <PocModal
//           pocs={event.pocs}
//           onClose={() => setShowPoc(false)}
//         />
//       )}

//       {showDesc && (
//         <ReadMoreModal
//           text={event.description}
//           onClose={() => setShowDesc(false)}
//         />
//       )}
//     </div>
// 	</div>
// 	</div>
// 	</div>
//   );
// };

// export default EventPage;

'use client';

import Navbar from '@/app/components/Navbar';
import { DotOrbit } from '@paper-design/shaders-react';
import Crewmates from '@/app/components/Crewmates';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import EventShell from '@/app/components/Events/EventShell';
import EventHeader from '@/app/components/Events/EventHeader';
import EventDescription from '@/app/components/Events/EventDescription';
import EventActions from '@/app/components/Events/EventActions';
import EventSidePanel from '@/app/components/Events/EventsSidePanel';

import RulesModal from '@/app/components/Events/modals/RulesModal';
import PocModal from '@/app/components/Events/modals/PocModal';
import ReadMoreModal from '@/app/components/Events/modals/ReadMoreModal';

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [showRules, setShowRules] = useState(false);
  const [showPoc, setShowPoc] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/events/${id}`)
      .then(res => res.json())
      .then(setEvent)
      .catch(e => toast.error(e.message));
  }, [id]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <Navbar />

      {/* DECORATIVE BACKGROUND CARD */}
      <div
        className="
          absolute
          top-24
          left-1/2 -translate-x-1/2
          w-[92vw] sm:w-[80vw] lg:w-[64vw]
          max-w-4xl
          h-[420px] sm:h-[520px] lg:h-[620px]
          rounded-[28px] sm:rounded-[40px]
          overflow-hidden
          z-0
        "
      >
        <DotOrbit
          width="100%"
          height="100%"
          colors={['#ffffff', '#006aff', '#fff675']}
          colorBack="#000000"
          stepsPerColor={4}
          size={0.2}
          sizeRange={0.5}
          spreading={1}
          speed={0.5}
          scale={0.35}
        />
      </div>

	<div className="relative z-10 h-full overflow-hidden">
      <Crewmates />

      {/* CONTENT */}
      <main className="relative z-10 mt-28 sm:mt-32 px-3 sm:px-0 flex justify-center">
        <div className="w-full max-w-4xl">
          {event && (
            <EventShell>
              <EventHeader event={event} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8">
                
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">
                  <EventDescription
                    event={event}
                    onReadMore={() => setShowDesc(true)}
                  />

                  <EventActions
                    onRules={() => setShowRules(true)}
                    onPoc={() => setShowPoc(true)}
                  />
                </div>

                {/* RIGHT */}
                <EventSidePanel event={event} />

              </div>
            </EventShell>
          )}
        </div>
      </main>

      {/* MODALS */}
      {showRules && (
        <RulesModal
          rules={event.rules}
          onClose={() => setShowRules(false)}
        />
      )}

      {showPoc && (
        <PocModal
          pocs={event.pocs}
          onClose={() => setShowPoc(false)}
        />
      )}

      {showDesc && (
        <ReadMoreModal
          text={event.description}
          onClose={() => setShowDesc(false)}
        />
      )}
    </div>
	</div>
  );
};

export default EventPage;
