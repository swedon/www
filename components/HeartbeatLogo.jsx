'use client'

export default function HeartbeatLogo({ description }) {
	return (
		<div className='heartbeat-stage'>
			<svg className='heartbeat-svg' viewBox='0 0 1200 280' role='img' aria-labelledby='heartbeat-title'>
				<title id='heartbeat-title'>SWEDON</title>
				<desc>{description}</desc>
				<defs>
					<linearGradient id='heartbeatGradient' x1='0%' x2='100%' y1='0%' y2='0%'>
						<stop offset='0%' stopColor='var(--color-heartbeat-signal)' stopOpacity='0.35' />
						<stop offset='24%' stopColor='var(--color-heartbeat-signal)' stopOpacity='0.75' />
						<stop offset='54%' stopColor='var(--color-heartbeat-signal)' stopOpacity='1' />
						<stop offset='76%' stopColor='var(--color-heartbeat-signal)' stopOpacity='0.75' />
						<stop offset='100%' stopColor='var(--color-heartbeat-signal)' stopOpacity='0.35' />
					</linearGradient>
					<filter id='signalGlow' x='-20%' y='-80%' width='140%' height='260%'>
						<feGaussianBlur stdDeviation='4' result='blur' />
						<feMerge>
							<feMergeNode in='blur' />
							<feMergeNode in='SourceGraphic' />
						</feMerge>
					</filter>
					<filter id='textGlow' x='-8%' y='-35%' width='116%' height='170%'>
						<feGaussianBlur stdDeviation='5' result='blur' />
						<feMerge>
							<feMergeNode in='blur' />
							<feMergeNode in='SourceGraphic' />
						</feMerge>
					</filter>
					<clipPath id='heartbeatTraceReveal'>
						<rect x='-240' y='0' width='0' height='280'>
							<animate attributeName='x' dur='5.2s' repeatCount='indefinite' values='-240;-240;1240;1440' keyTimes='0;0.04;0.86;1' />
							<animate attributeName='width' dur='5.2s' repeatCount='indefinite' values='0;200;200;0' keyTimes='0;0.04;0.86;1' />
						</rect>
					</clipPath>
				</defs>

				<g className='heartbeat-line-layer'>
					<path
						className='heartbeat-ekg-trace'
						clipPath='url(#heartbeatTraceReveal)'
						fill='none'
						opacity='0.33'
						stroke='url(#heartbeatGradient)'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='4'
						d='M-240 145 H120 L146 145 L168 88 L196 218 L226 112 L258 145 H418 L444 145 L466 120 L490 170 L514 145 H690 L716 145 L738 96 L764 214 L792 118 L820 145 H1440'
					/>
				</g>

				<g className='heartbeat-word-layer'>
					<g
						className='heartbeat-base-letters'
						fill='var(--color-swedon-base)'
						fontSize='138'
						fontWeight='950'
						letterSpacing='0.08em'
						stroke='none'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<text className='swedon-base-letter' x='265' y='170' textAnchor='middle'>
							S
						</text>
						<text className='swedon-base-letter' x='413' y='170' textAnchor='middle'>
							W
						</text>
						<text className='swedon-base-letter' x='557' y='170' textAnchor='middle'>
							E
						</text>
						<text className='swedon-base-letter' x='676' y='170' textAnchor='middle'>
							D
						</text>
						<text className='swedon-base-letter' x='806' y='170' textAnchor='middle'>
							O
						</text>
						<text className='swedon-base-letter' x='940' y='170' textAnchor='middle'>
							N
						</text>
					</g>

					<g
						className='heartbeat-live-letters'
						fill='var(--color-swedon-live)'
						filter='url(#textGlow)'
						fontSize='138'
						fontWeight='950'
						letterSpacing='0.08em'
						stroke='none'
					>
						<text className='swedon-live-letter' x='265' y='170' textAnchor='middle'>
							S
							<animate
								attributeName='opacity'
								dur='5.2s'
								repeatCount='indefinite'
								values='0;0;1;1;0;0'
								keyTimes='0;0.174;0.241;0.314;0.394;1'
							/>
						</text>
						<text className='swedon-live-letter' x='413' y='170' textAnchor='middle'>
							W
							<animate
								attributeName='opacity'
								dur='5.2s'
								repeatCount='indefinite'
								values='0;0;1;1;0;0'
								keyTimes='0;0.256;0.323;0.396;0.476;1'
							/>
						</text>
						<text className='swedon-live-letter' x='557' y='170' textAnchor='middle'>
							E
							<animate
								attributeName='opacity'
								dur='5.2s'
								repeatCount='indefinite'
								values='0;0;1;1;0;0'
								keyTimes='0;0.336;0.403;0.476;0.556;1'
							/>
						</text>
						<text className='swedon-live-letter' x='676' y='170' textAnchor='middle'>
							D
							<animate
								attributeName='opacity'
								dur='5.2s'
								repeatCount='indefinite'
								values='0;0;1;1;0;0'
								keyTimes='0;0.402;0.469;0.542;0.622;1'
							/>
						</text>
						<text className='swedon-live-letter' x='806' y='170' textAnchor='middle'>
							O
							<animate
								attributeName='opacity'
								dur='5.2s'
								repeatCount='indefinite'
								values='0;0;1;1;0;0'
								keyTimes='0;0.474;0.541;0.614;0.694;1'
							/>
						</text>
						<text className='swedon-live-letter' x='940' y='170' textAnchor='middle'>
							N
							<animate
								attributeName='opacity'
								dur='5.2s'
								repeatCount='indefinite'
								values='0;0;1;1;0;0'
								keyTimes='0;0.549;0.616;0.689;0.769;1'
							/>
						</text>
					</g>
				</g>
			</svg>
		</div>
	)
}
