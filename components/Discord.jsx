'use client'

import React from 'react'
import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa'

const DiscordLink = 'https://discord.com/invite/VrPBwWz'

const DiscordButton = ({ children, href, className, classNameIcon }) => {
	return (
		<Link
			href={href ? href : DiscordLink}
			type='button'
			className={`flex items-center justify-center bg-[--color-discord] text-[--color-white] font-bold uppercase p-1 pl-2 pr-2 m-0 ${className}`}
			title={children ? children : DiscordLink}
		>
			{children}
			<FaDiscord className={`w-8 h-8 inline-block ${classNameIcon}`} />
		</Link>
	)
}

export default DiscordButton
export { DiscordLink }
