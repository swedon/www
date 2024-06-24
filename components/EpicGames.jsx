'use client'

import { useEffect, useState } from 'react'

const freeGamesPromotionsUrl = 'https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en'

const FreeGamesPromotions = () => {
	const [items, setItems] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetch(freeGamesPromotionsUrl, {
					method: 'GET',
					// mode: 'no-cors',
					headers: {
						// 'Access-Control-Allow-Methods': 'PUT, GET, HEAD, POST, DELETE, OPTIONS',
						'Access-Control-Allow-Origin': '*',
						// 'Access-Control-Allow-Headers': '*',
						// 'Access-Control-Expose-Headers': '*',
						'Content-Type': 'application/json',
					},
				})
					.then(response => response.json())
					.then(result => setItems(result.data.Catalog.searchStore.elements))
					.catch(error => console.error(error))
			} catch (error) {
				console.error(error)
			}
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
