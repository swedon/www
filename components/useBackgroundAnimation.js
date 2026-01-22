'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'bg-animation-enabled'
const EVENT_NAME = 'bg-animation-toggle'

function readStored() {
	if (typeof window === 'undefined') return true
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY)
		if (raw === null) return true
		return raw === 'true'
	} catch {
		return true
	}
}

function writeStored(enabled) {
	try {
		window.localStorage.setItem(STORAGE_KEY, String(enabled))
	} catch {
		// ignore
	}
}

export default function useBackgroundAnimation() {
	const [enabled, setEnabled] = useState(true)

	useEffect(() => {
		setEnabled(readStored())
	}, [])

	useEffect(() => {
		if (typeof document === 'undefined') return
		document.documentElement.dataset.bgAnimation = enabled ? 'on' : 'off'
	}, [enabled])

	useEffect(() => {
		const onStorage = (e) => {
			if (e.key !== STORAGE_KEY) return
			setEnabled(readStored())
		}
		const onCustom = () => setEnabled(readStored())

		window.addEventListener('storage', onStorage)
		window.addEventListener(EVENT_NAME, onCustom)
		return () => {
			window.removeEventListener('storage', onStorage)
			window.removeEventListener(EVENT_NAME, onCustom)
		}
	}, [])

	const set = useCallback((next) => {
		setEnabled(next)
		writeStored(next)
		window.dispatchEvent(new Event(EVENT_NAME))
	}, [])

	const toggle = useCallback(() => {
		set(!readStored())
	}, [set])

	return { enabled, setEnabled: set, toggle }
}
