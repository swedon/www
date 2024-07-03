'use client'

import { useEffect, useState } from 'react'

//https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions
const FreeGamesPromotions = () => {
	const [items, setItems] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://raw.githubusercontent.com/swedon/www/main/public/data/epicgames.json')
			const jsonData = await response.json()
			setItems(jsonData.data.Catalog.searchStore.elements)
		}

		fetchData()
	}, [])

	return (
		<div className='grid grid-cols-3 gap-4'>
			{items.length > 0 &&
				items.map(game => (
					<div key={game.id} className='bg-white p-4 rounded shadow'>
						<img src={game.keyImages[0].url} alt={game.title} className='w-full h-40 object-cover mb-4' />
						<h2 className='text-xl font-bold'>{game.title}</h2>
						<p className='text-gray-500'>{game.description}</p>
						<a href={game.url} className='text-blue-500 hover:underline'>
							Learn More
						</a>
					</div>
				))}
		</div>
	)
}

export default FreeGamesPromotions
