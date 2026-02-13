import React from 'react'
import Navbar from '../components/Navbar';
import { DotOrbit } from '@paper-design/shaders-react';
import Crewmates from '../components/Crewmates';

const Events = () => {
	return (
		<div className="w-full min-h-screen relative" data-main-content>
			<Navbar />
			<div className="fixed inset-0 w-full h-full z-0">
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
			<div className="relative z-10 min-h-[300vh]">
				<Crewmates />
			</div>
		</div>
	)
}

export default Events;