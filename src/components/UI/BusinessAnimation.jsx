import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt, FaShareAlt, FaCogs, FaChartLine } from 'react-icons/fa';
import logo from '/images/octaneLogo.png'; // Replace with your actual logo path

const tiles = [
	{
		id: 'payment',
		label: 'Payment Options',
		icon: <FaMoneyCheckAlt size={32} />,
		position: 'top-left',
	},
	{
		id: 'socials',
		label: 'Socials',
		icon: <FaShareAlt size={32} />,
		position: 'top-right',
	},
	{
		id: 'tech',
		label: 'Tech',
		icon: <FaCogs size={32} />,
		position: 'bottom-left',
	},
	{
		id: 'gtm',
		label: 'GTM',
		icon: <FaChartLine size={32} />,
		position: 'bottom-right',
	},
];

const tilePositionStyles = {
	'top-left': 'top-0 left-0 rounded-tr-[50%]',
	'top-right': 'top-0 right-0 rounded-tl-[50%]',
	'bottom-left': 'bottom-0 left-0 rounded-br-[50%]',
	'bottom-right': 'bottom-0 right-0 rounded-bl-[50%]',
};

export default function BusinessAnimation() {
	const [hoveredTile, setHoveredTile] = useState(null);

	// Memoize expensive calculations
	const tileTransforms = useMemo(() => {
		const containerPx = 448;
		const tilePx = 0.48 * containerPx;
		const centerOffset = (containerPx - tilePx) / 2;
		
		return {
			'top-left': { x: centerOffset, y: centerOffset },
			'top-right': { x: -centerOffset, y: centerOffset },
			'bottom-left': { x: centerOffset, y: -centerOffset },
			'bottom-right': { x: -centerOffset, y: -centerOffset },
		};
	}, []);

	// Memoize payment logos to prevent recreation
	const paymentLogos = useMemo(() => [
		'/images/BrandLogos/l1.png',
		'/images/BrandLogos/l2.png',
		'/images/BrandLogos/l3.png',
	], []);

	return (
		<div className="relative w-[28rem] h-[28rem] mx-auto grid grid-cols-2 grid-rows-2 place-items-center">
			{tiles.map((tile) => {
				const isActive = hoveredTile === tile.id;
				const isInactive = hoveredTile && hoveredTile !== tile.id;
				
				const transform = isActive ? tileTransforms[tile.position] : { x: 0, y: 0 };

				return (
					<motion.div
						key={tile.id}
						onMouseEnter={() => setHoveredTile(tile.id)}
						onMouseLeave={() => setHoveredTile(null)}
						className={`absolute w-[48%] h-[48%] backdrop-blur-lg bg-white/10 border-none shadow-lg flex flex-col items-center justify-center text-white cursor-pointer ${tilePositionStyles[tile.position]} ${isInactive ? 'blur-sm' : ''}`}
						animate={{
							scale: isActive ? 2 : 1,
							x: transform.x,
							y: transform.y,
							zIndex: isActive ? 50 : 10,
							opacity: isInactive ? 0.4 : 1,
						}}
						transition={{ 
							type: 'spring', 
							stiffness: 300, 
							damping: 25,
							mass: 0.8,
							duration: 0.3
						}}
						style={{ 
							borderRadius: '1rem',
							willChange: 'transform, opacity',
							transform: 'translateZ(0)',
							backfaceVisibility: 'hidden',
							perspective: '1000px'
						}}
					>
						<motion.div
							animate={isActive && tile.id === 'payment' ? { y: -20 } : { y: 0 }}
							transition={{ 
								type: 'spring', 
								stiffness: 300, 
								damping: 25,
								duration: 0.2
							}}
							className="mb-2 flex flex-col items-center"
						>
							{tile.icon}
							<div className="text-base font-medium mt-1">{tile.label}</div>
						</motion.div>
						
						{/* Show payment logos if Payment Options is active */}
						{isActive && tile.id === 'payment' && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ 
									delay: 0.1, 
									duration: 0.25,
									ease: "easeOut"
								}}
								className="flex gap-3 mt-4"
							>
								{paymentLogos.map((src, idx) => (
									<img 
										key={src} 
										src={src} 
										alt="Payment Logo" 
										className="w-10 h-7 object-contain rounded shadow" 
										style={{ 
											background: 'white',
											transform: 'translateZ(0)' // Force hardware acceleration
										}} 
									/>
								))}
							</motion.div>
						)}
					</motion.div>
				);
			})}

			{/* Central Logo */}
			<div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-black/20 backdrop-blur-lg p-2 shadow-lg -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
				<img 
					src={logo} 
					alt="Logo" 
					className="w-full h-full object-contain rounded-full"
					style={{ transform: 'translateZ(0)' }} // Force hardware acceleration
				/>
			</div>
		</div>
	);
}
