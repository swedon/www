'use client'

import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='min-h-100 flex flex-grow items-center justify-center'>
			<div className='rounded-lg bg-white p-8 text-center shadow-xl shadow-gray-500/40 dark:shadow-white-500/40'>
				<h1 className='mb-4 text-4xl font-bold text-black'>404</h1>
				<p className='text-black'>Oops! The page you are looking for could not be found.</p>
				<Link href='/' className='mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600' type='button'>
					{' '}
					Go back to Home{' '}
				</Link>
			</div>
		</div>
	)
}
