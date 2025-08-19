'use client'

import FreeGamesPromotions from '@/components/EpicGames'

export default function Start() {
	return (
		<div className=''>
			<h1 className='text-3xl font-bold text-center'>Free Games to claim</h1>
			<div className='container mx-auto p-4'>
				<h1 className='text-3xl font-bold text-center bg-gray-200 text-dark p-4 rounded'>Epic Games</h1>
				<div className='mt-2'>
					<FreeGamesPromotions></FreeGamesPromotions>
				</div>
			</div>
		</div>
	)
}
