'use client'

import { useTranslations } from 'next-intl'
import { IoCodeSlash, IoEyeOff } from 'react-icons/io5'
import useBackgroundAnimation from './useBackgroundAnimation'

const BackgroundAnimationToggle = ({ className }) => {
	const { enabled, toggle } = useBackgroundAnimation()
	const t = useTranslations('background')
	const Icon = enabled ? IoCodeSlash : IoEyeOff
	const label = enabled ? t('disable') : t('enable')

	return (
		<button type='button' className={`icon-button ${className ?? ''}`} aria-label={label} aria-pressed={enabled} title={label} onClick={toggle}>
			<Icon />
		</button>
	)
}

export default BackgroundAnimationToggle
