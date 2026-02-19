"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface LandingEjectionProps {
	setDisplayHeroSection: Dispatch<SetStateAction<boolean>>;
}

const LandingEjection = ({ setDisplayHeroSection }: LandingEjectionProps) => {
	const skipEjection = () => {
		setDisplayHeroSection(true);
	};

	return (
		<>
			{/* Full-screen clickable overlay - click anywhere to skip */}
			<div
				className="fixed inset-0 z-40 cursor-pointer"
				onClick={skipEjection}
				onKeyDown={(e) => e.key === "Enter" && skipEjection()}
				role="button"
				tabIndex={0}
				aria-label="Skip intro"
			/>
			<motion.div
				initial={{ x: "100vw", rotate: 0 }}
				animate={{ x: "-100vw", rotate: 360 * 4 }}
				transition={{
					duration: 8,
					ease: "linear",
					repeat: 0
				}}
				onAnimationComplete={skipEjection}
				className="z-50 absolute pointer-events-none"
			>
				<Image
					src="/8.png"
					alt="Eject"
					width={130}
					height={130}
				/>
			</motion.div>
		</>
	)
}

export default LandingEjection;