// 'use client';

// const EventShell = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <section className="
//       relative
//       mx-auto
//       mt-24
//       max-w-6xl
//       rounded-[28px]
//       bg-black/70
//       backdrop-blur-xl
//       border border-white/10
//       shadow-[0_0_80px_rgba(0,0,0,0.8)]
//       p-10
//     ">
//       {children}
//     </section>
//   );
// };

// export default EventShell;
'use client';

import { ReactNode } from 'react';

const EventShell = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className="
        relative
        w-full
        rounded-[28px] sm:rounded-[36px]
        bg-black/80 backdrop-blur-xl
        border border-white/10
        shadow-2xl
        px-4 sm:px-6 lg:px-8
        py-6 sm:py-8 lg:py-10
      "
    >
      {children}
    </section>
  );
};

export default EventShell;
