'use client'

import { FaRegSnowflake, FaSnowflake } from 'react-icons/fa'
import useBackgroundAnimation from './useBackgroundAnimation'

const BackgroundAnimationToggle = ({ children, className }) => {
	const { enabled, toggle } = useBackgroundAnimation()
	const common = `cursor-pointer transition-opacity hover:opacity-80 ${className ?? ''}`

	if (enabled) {
		return (
			<FaSnowflake
				className={`w-8 h-8 text-blue-600 dark:text-blue-300 ${common}`}
				role='button'
				aria-pressed='true'
				title='Disable background animation'
				onClick={toggle}
			/>
		)
	}

	return (
		<FaRegSnowflake
			className={`w-8 h-8 text-gray-600 dark:text-gray-300 ${common}`}
			role='button'
			aria-pressed='false'
			title='Enable background animation'
			onClick={toggle}
		/>
	)
}

export default BackgroundAnimationToggle
