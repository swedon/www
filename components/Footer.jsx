'use client'

import React from 'react'

const Footer = () => {
	return (
		<footer className='px-4 sm:px-6 py-6 mt-10'>
			<div className='flex justify-between items-center text-sm'>
				<div className=''>
					<span>&copy; {new Date().getFullYear()} </span>
					<a className='font-semibold text-lg' href='https://swedon.se/'>
						SWEDON
					</a>
					, All rights reserved.
				</div>
			</div>
		</footer>
	)
}

export default Footer
