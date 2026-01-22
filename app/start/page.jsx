'use client'

import FreeGamesPromotions from '@/components/EpicGames'

export default function Start() {
	return (
		<section className='space-y-4'>
			<h1 className='text-3xl font-bold text-center'>Free Games to claim</h1>
			<div className='card p-4'>
				<h2 className='text-2xl font-bold text-center'>Epic Games</h2>
				<div className='mt-4'>
					<FreeGamesPromotions />
				</div>
			</div>
		</section>
	)
}
