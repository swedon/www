'use client'

import { DiscordLink } from '@/components/Discord'

export default function Discord() {
	if (typeof window !== 'undefined') {
		return window.location.replace(DiscordLink)
	}
	return null
}
