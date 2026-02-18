import { useEffect, useState } from 'react';
import HandDrawnCard from '../HandDrawnCard'
import { Team } from '@/types/interface';
import Link from 'next/link';

const TeamsTab = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const [openTeamId, setOpenTeamId] = useState<string | null>(null);

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

	const getTeamSize = (team: Team) => team.teamSize ?? team.members?.length ?? team.team.length;

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
				<div className="space-y-3 w-full">
					{teams.map((team: Team) => {
						const isOpen = openTeamId === team._id;
						const teamSize = getTeamSize(team);
						return (
							<div
								key={team._id}
								className="rounded-xl border border-gray-700 bg-black/40 overflow-hidden"
							>
								<div className="px-4 py-3 flex items-center justify-between gap-3">
									<button
										type="button"
										onClick={() => setOpenTeamId(isOpen ? null : team._id)}
										className="flex-1 text-left"
									>
										<div className="flex items-center gap-2 flex-wrap">
											<h3 className="text-base sm:text-lg font-semibold text-white">
												{team.eventId.eventName}
											</h3>
											<span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs">
												{team.eventId.category}
											</span>
										</div>
										<p className="text-xs text-gray-400 mt-1">
											{teamSize}/{team.eventId.maxMembersPerTeam ?? "-"} members
										</p>
									</button>

									<div className="flex items-center gap-2 shrink-0">
										<button
											type="button"
											onClick={() => copyTeamCode(team.teamCode, team._id)}
											className="px-2.5 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-xs transition-colors"
										>
											{copiedId === team._id ? "COPIED" : "COPY CODE"}
										</button>
										<Link
											href={`/events/${team.eventId._id}`}
											className="px-3 py-1.5 bg-cyan/20 hover:bg-cyan/30 text-cyan rounded-lg text-xs sm:text-sm transition-colors"
										>
											View Details
										</Link>
									</div>
								</div>

								{isOpen && (
									<div className="border-t border-gray-700 px-4 py-3 space-y-3">
										<div className="rounded-lg border border-gray-700 bg-gray-900/40 p-3">
											<p className="text-[11px] text-gray-400 mb-1">Team Code</p>
											<p className="text-sm font-mono text-white font-semibold break-all">
												{team.teamCode}
											</p>
										</div>

										<div className="grid grid-cols-2 gap-2 text-sm">
											<div className="rounded-lg border border-gray-700 bg-gray-900/40 p-2">
												<p className="text-[11px] text-gray-400">Team Size</p>
												<p className="text-white font-semibold">{teamSize}</p>
											</div>
											<div className="rounded-lg border border-gray-700 bg-gray-900/40 p-2">
												<p className="text-[11px] text-gray-400">Team Limit</p>
												<p className="text-white font-semibold">
													{team.eventId.maxMembersPerTeam ?? "-"}
												</p>
											</div>
										</div>

										<div className="rounded-lg border border-gray-700 bg-gray-900/30 p-3">
											<p className="text-xs text-gray-400 mb-2">Teammates</p>
											{team.members && team.members.length > 0 ? (
												<div className="space-y-1">
													{team.members.map((member) => {
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
											) : (
												<p className="text-sm text-gray-400">No teammates yet.</p>
											)}
										</div>
									</div>
								)}
							</div>
						);
					})}
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