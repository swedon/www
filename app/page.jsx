'use client'

import { useState, useEffect } from 'react'

import DiscordButton, { DiscordLink } from '@/components/Discord'

export default function LandingPage() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<div className='flex flex-col items-center justify-center space-y-10 mt-0 animate__animated animate__zoomIn'>
			<div className='flex flex-col items-center space-y-6 mt-20'>
				<p className='bg-[--color-dark] text-white px-6 py-6 sm:py-4 lg:px-6 rounded-lg dark:bg-[--color-white] dark:text-black text-lg font-medium animate__animated animate__zoomIn animate__slow animate__delay'>
					{DiscordLink}
				</p>
			</div>
			<DiscordButton
				className='flex items-center justify-center space-x-2 text-3xl font-bold uppercase py-[10px] pr-[15px] pl-[15px] animate__animated animate__flash animate__slower animate__delay-1s'
				classNameIcon='w-12 h-12 ml-1'
				title='Discord'
			>
				Discord
			</DiscordButton>
		</div>
	)
}
