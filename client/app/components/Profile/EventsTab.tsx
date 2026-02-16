"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HandDrawnCard from "../HandDrawnCard";
import { Registration } from "@/types/interface";

const EventsTab = () => {
	const [registrations, setRegistrations] = useState<Registration[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch("/api/registration/my-events", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});
				const data = await response.json();

				if (response.ok) {
					setRegistrations(data.registrations || []);
				}
			} catch (error) {
				console.error("Failed to fetch events:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	console.log(registrations);

	return (
		<HandDrawnCard className="w-full space-y-6">
			<div className="text-center space-y-2">
				<h2 className="text-3xl font-bold text-white">My Events</h2>
				<p className="text-gray-300 hand-drawn-text">List of events you have registered to</p>
			</div>

			{loading ? (
				<div className="flex flex-col items-center justify-center py-12 space-y-4">
					<div className="w-12 h-12 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
					<p className="text-gray-400 hand-drawn-text">Loading your journey...</p>
				</div>
			) : registrations.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
					{registrations.map((reg: Registration) => (
						<HandDrawnCard key={reg._id}>
							<div className="space-y-4">
								{reg.eventId.banner && (
									<div className="relative w-full h-48 rounded-lg overflow-hidden">
										<Image
											src={reg.eventId.banner}
											alt={reg.eventId.eventName}
											fill
											className="object-cover"
										/>
									</div>
								)}

								<div className="space-y-2">
									<h3 className="text-xl font-bold text-white">
										{reg.eventId.eventName}
									</h3>

									<div className="flex items-center gap-2">
										<span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
											{reg.eventId.category}
										</span>
										{reg.isTeam && (
											<span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
												Team Event
											</span>
										)}
									</div>

									<div className="space-y-1 text-sm text-gray-300">
										<div className="flex items-center text-left gap-2">
											<span className="text-gray-400">📅</span>
											<span>{reg.eventId.date}</span>
										</div>
										<div className="flex items-center text-left gap-2">
											<span className="text-gray-400">🕐</span>
											<span>{reg.eventId.time}</span>
										</div>
										<div className="flex items-center text-left gap-2">
											<span className="text-gray-400">📍</span>
											<span>{reg.eventId.venue}</span>
										</div>
									</div>

									<div className="pt-2 border-t border-gray-700">
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-400">
												Registered: {new Date(reg.createdAt).toLocaleDateString()}
											</span>
											{reg.verified ? (
												<span className="text-green-400">✓ Verified</span>
											) : (
												<span className="text-yellow-400">⏳ Pending</span>
											)}
										</div>
									</div>
								</div>
							</div>
						</HandDrawnCard>
					))}
				</div>
			) : (
				<HandDrawnCard>
					<div className="flex flex-col items-center justify-center py-12 space-y-4">
						<div className="text-6xl">📅</div>
						<h3 className="text-xl font-semibold text-white">No events yet</h3>
						<p className="text-gray-400">
							Register for events to see them here
						</p>
					</div>
				</HandDrawnCard>
			)}
		</HandDrawnCard>
	);
};

export default EventsTab;