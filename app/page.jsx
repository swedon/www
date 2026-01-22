'use client'
import DiscordButton, { DiscordLink } from '@/components/Discord'

export default function LandingPage() {
	return (
		<section className='p-6'>
			<div className='flex flex-col items-center justify-center space-y-10 mt-25 animate__animated animate__zoomIn'>
				<div className='rounded overflow-hidden shadow-lg bg-[var(--color-discord)] text-white animate__animated animate__zoomInUp animate__slow animate__delay'>
					<div className='px-10 py-2'>
						{/* <div className="font-bold text-xl mb-2">Join our community</div> */}
						<p className='font-bold text-3xl my-10'>{DiscordLink}</p>
					</div>
				</div>		
				<DiscordButton
					className='flex items-center justify-center space-x-2 text-3xl font-bold uppercase py-[10px] pr-[15px] pl-[15px] animate__animated animate__flash animate__slower animate__delay-1s'
					classNameIcon='w-12 h-12 ml-1'
					title='Discord'
				>
					Discord
				</DiscordButton>
			</div>
		</section>
	)
}
