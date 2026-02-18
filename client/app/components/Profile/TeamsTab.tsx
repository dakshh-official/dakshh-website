import { useEffect, useState } from 'react';
import HandDrawnCard from '../HandDrawnCard'
import { Team } from '@/types/interface';
import Image from 'next/image';

const TeamsTab = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);
	const [copiedId, setCopiedId] = useState<string | null>(null);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch("/api/registration/my-teams", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});
				const data = await response.json();

				if (response.ok) {
					setTeams(data.teams || []);
				}
			} catch (error) {
				console.error("Failed to fetch events:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	const copyTeamCode = (teamCode: string, registrationId: string) => {
		navigator.clipboard.writeText(teamCode);
		setCopiedId(registrationId);
		setTimeout(() => setCopiedId(null), 2000);
	};

	return (
		<HandDrawnCard className="w-full space-y-6">
			<div className="text-center space-y-2">
				<h2 className="text-3xl font-bold text-white">My Teams</h2>
				<p className="text-gray-300 hand-drawn-text">List of Teams you are a part of</p>
			</div>

			{loading ? (
				<div className="flex flex-col items-center justify-center py-12 space-y-4">
					<div className="w-12 h-12 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
					<p className="text-gray-400 hand-drawn-text">Loading your journey...</p>
				</div>
			) : teams.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
					{teams.map((reg: Team) => (
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

									<div className="flex items-center gap-2 flex-wrap">
										<span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
											{reg.eventId.category}
										</span>
										{reg.teamCode && (
											<span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
												Team Event
											</span>
										)}
									</div>

									{reg.teamCode && (
										<div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
											<div className="flex items-center justify-between gap-2">
												<div className="flex-1">
													<p className="text-xs text-gray-400 mb-1">Team Code</p>
													<p className="text-sm font-mono text-white font-semibold">
														{reg.teamCode}
													</p>
												</div>
												<button
													onClick={() => copyTeamCode(reg.teamCode!, reg._id)}
													className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm transition-colors flex items-center gap-2"
												>
													{copiedId === reg._id ? (
														<>
															<span>✓</span>
															<span>Copied</span>
														</>
													) : (
														<>
															<span>📋</span>
															<span>Copy</span>
														</>
													)}
												</button>
											</div>
										</div>
									)}

									<div className="grid grid-cols-2 gap-2 text-sm">
										<div className="rounded-lg border border-gray-700 bg-gray-900/40 p-2">
											<p className="text-[11px] text-gray-400">Team Size</p>
											<p className="text-white font-semibold">
												{reg.teamSize ?? reg.members?.length ?? reg.team.length}
											</p>
										</div>
										<div className="rounded-lg border border-gray-700 bg-gray-900/40 p-2">
											<p className="text-[11px] text-gray-400">Team Limit</p>
											<p className="text-white font-semibold">
												{reg.eventId.maxMembersPerTeam ?? "-"}
											</p>
										</div>
									</div>

									{reg.members && reg.members.length > 0 && (
										<div className="rounded-lg border border-gray-700 bg-gray-900/30 p-3">
											<p className="text-xs text-gray-400 mb-2">Teammates</p>
											<div className="space-y-1">
												{reg.members.map((member) => {
													const displayName = member.fullName || member.username || "Unknown";
													return (
														<div
															key={member._id}
															className="flex items-center justify-between text-sm text-gray-200"
														>
															<span>{displayName}</span>
															{member.isLeader && (
																<span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">
																	Leader
																</span>
															)}
														</div>
													);
												})}
											</div>
										</div>
									)}

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
												Created: {new Date(reg.createdAt).toLocaleDateString()}
											</span>
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
						<div className="text-6xl">👥</div>
						<h3 className="text-xl font-semibold text-white">No Teams yet</h3>
						<p className="text-gray-400">
							Join or create a Team
						</p>
					</div>
				</HandDrawnCard>
			)}
		</HandDrawnCard>
	)
}

export default TeamsTab;