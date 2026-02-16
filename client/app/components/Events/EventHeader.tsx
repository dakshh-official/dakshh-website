'use client';

const EventHeader = ({ event }: any) => {

    const teamText =
        event.maxMembersPerTeam === 1
            ? '1 Member'
            : `${event.minMembersPerTeam} - ${event.maxMembersPerTeam} Members`;

    return (
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-md">

            {/* Banner */}
            {event.banner && (
                <div
                    className="h-56 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.banner})` }}
                />
            )}

            <div className="p-6 space-y-3">
                <h1 className="text-3xl font-bold text-white">
                    {event.eventName}
                </h1>

                <p className="text-gray-400">
                    {event.category} • {event.date} • {event.time}
                </p>

                {event.isTeamEvent && (
                    <p className="text-sm text-blue-400">
                        Team Size: {teamText}
                    </p>
                )}
            </div>
        </div>
    );
};

export default EventHeader;
