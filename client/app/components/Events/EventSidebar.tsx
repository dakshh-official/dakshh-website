'use client';

const EventSidebar = ({ event }: any) => {
    return (
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-lg font-semibold text-white">Event Details</h3>

            <div className="text-sm text-gray-300 space-y-2">
                <p><span className="text-white">Venue:</span> {event.venue}</p>
                <p><span className="text-white">Duration:</span> {event.duration}</p>
                <p><span className="text-white">Prize Pool:</span> {event.prizePool}</p>
                <p>
                    <span className="text-white">Fees:</span>{' '}
                    {event.isPaidEvent ? `₹${event.fees}` : 'Free'}
                </p>

                {event.clubs?.length > 0 && (
                    <p>
                        <span className="text-white">Organised by:</span>{' '}
                        {event.clubs.join(', ')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default EventSidebar;