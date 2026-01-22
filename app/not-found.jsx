'use client'

import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex flex-grow items-center justify-center'>
			<div className='card p-8 text-center'>
				<h1 className='mb-4 text-4xl font-bold'>404</h1>
				<p>Oops! The page you are looking for could not be found.</p>
				<Link href='/' className='mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600' type='button'>
					{' '}
					Go back to Home{' '}
				</Link>
			</div>
		</div>
	)
}
