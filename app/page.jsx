'use client'

import { useState, useEffect } from 'react'
import DiscordButton, { DiscordLink } from '@/components/Discord'

import FreeGamesPromotions from '@/components/EpicGames'

export default function LandingPage() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<>
			<div className='row flex flex-col items-center justify-center space-y-10 mt-25 animate__animated animate__zoomIn'>
				<div className="col-1 rounded overflow-hidden shadow-lg bg-[var(--color-discord)] text-light animate__animated animate__zoomInUp animate__slow animate__delay">
					<div className="px-10 py-2">
						{/* <div className="font-bold text-xl mb-2">Join our community</div> */}
						<p className="font-bold text-3xl my-10">{DiscordLink}</p>
					</div>
				</div>		
				<DiscordButton
					className='flex items-center justify-center space-x-2 text-3xl font-bold uppercase py-[10px] pr-[15px] pl-[15px] animate__animated animate__flash animate__slower animate__delay-1s'
					classNameIcon='w-12 h-12 ml-1'
					title='Discord'
				>
					Discord
				</DiscordButton>
			</div>
			
			{/* <div className='container mx-auto p-4'>
				<h1 className='text-xl font-bold text-center bg-gray-200 text-dark p-4 rounded'>Epic Games</h1>
				<div className='mt-2'>
					<FreeGamesPromotions></FreeGamesPromotions>
				</div>
			</div> */}
		</>
	)
}
