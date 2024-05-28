'use client'

import { DiscordLink } from '@/components/Discord'

export default function Discord() {
	return window.location.replace(DiscordLink)
}
