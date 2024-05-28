'use client'

import { RiMailSendFill } from 'react-icons/ri'
import { FaRegSmile } from 'react-icons/fa'

export default function Contact() {
	async function handleSubmit(e) {
		e.preventDefault()

		const title = document.getElementById('title').value
		const message = document.getElementById('message').value
		const email = document.getElementById('email').value

		const webhookUrl = 'https://discord.com/api/webhooks/1245108062000386069/pc67h7es4YEqC2ZaKECMMauC1o7-0HI4LwzMGbT3TXBAEZ5LHIHLbEdftDJN4JSes2Dq'
		const webhookBody = {
			embeds: [
				{
					title: title,
					fields: [
						{ name: '', value: message },
						{ name: 'Email', value: email },
					],
				},
			],
		}

		if (!title || !message || !email) {
			return
		}

		const response = await fetch(webhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(webhookBody),
		})

		if (response.ok) {
			document.getElementById('alert').classList.remove('hidden')
			document.getElementById('submit').classList.add('hidden')
		}
	}

	return (
		<form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
			<div className='space-y-12 bg-white text-black p-6 m-6 rounded-lg sm:w-[50%]'>
				<div className=''>
					<h2 className='text-base font-semibold leading-7 text-center'>Get in touch</h2>
					<p className='mt-1 text-sm leading-6 text-gray-600'></p>

					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<div className='col-span-full'>
							<label htmlFor='title' className='block text-sm font-medium leading-6 '>
								Title
							</label>
							<div className='mt-2'>
								<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
									<input
										type='text'
										name='title'
										id='title'
										autoComplete='none'
										className='block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
										placeholder=''
									/>
								</div>
							</div>
						</div>

						<div className='col-span-full'>
							<label htmlFor='message' className='block text-sm font-medium leading-6 '>
								Message
							</label>
							<div className='mt-2'>
								<textarea
									id='message'
									name='message'
									rows={3}
									className='block w-full rounded-md border-0 bg-transparent py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									defaultValue={''}
								/>
							</div>
						</div>

						<div className='col-span-full'>
							<label htmlFor='email' className='block text-sm font-medium leading-6 '>
								Email
							</label>
							<div className='mt-2'>
								<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
									<input
										type='email'
										name='email'
										id='email'
										autoComplete='email'
										className='block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
										placeholder=''
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='flex flex-col items-center justify-center'>
					<button
						id='submit'
						type='submit'
						className='flex items-center justify-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
					>
						<RiMailSendFill /> Send
					</button>

					<div
						id='alert'
						role='alert'
						className='relative block w-full p-4 mb-4 font-bold leading-5 text-white bg-green-500 rounded-lg opacity-100 hidden animate__animated animate__fadeIn'
					>
						<div className='flex items-center mr-12'>
							Message sent! <FaRegSmile className='ml-2 text-lg' />
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}
