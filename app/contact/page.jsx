'use client'

import { useState, useEffect } from 'react'
import { RiMailSendFill } from 'react-icons/ri'
import { FaRegSmile } from 'react-icons/fa'

export default function Contact() {
	const [title, setTitle] = useState('')
	const [message, setMessage] = useState('')
	const [email, setEmail] = useState('')
	const [errors, setErrors] = useState({})
	const [isFormValid, setIsFormValid] = useState(false)

	useEffect(() => {
		validateForm(title, message, email)
	}, [title, message, email])

	const validateForm = () => {
		let errors = {}

		if (!title) {
			errors.title = 'Message title is required.'
		}

		if (!message) {
			errors.message = 'Message is required.'
		} else if (message.length < 10) {
			errors.message = 'The message must be at least 10 characters.'
		}

		if (!email) {
			errors.email = 'Enter a valid email address.'
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email is invalid.'
		}

		setErrors(errors)
		setIsFormValid(Object.keys(errors).length === 0)
	}

	async function handleSubmit(e) {
		e.preventDefault()

		const webhookUrl = 'https://discord.com/api/webhooks/1245108062000386069/pc67h7es4YEqC2ZaKECMMauC1o7-0HI4LwzMGbT3TXBAEZ5LHIHLbEdftDJN4JSes2Dq'
		const webhookBody = {
			content: '',
			embeds: [
				{
					title: title,
					description: message,
					fields: [],
					footer: {
						text: email,
					},
					timestamp: new Date().toISOString(),
					color: null,
				},
			],
			attachments: [],
			flags: 4096,
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
		<form className='flex flex-col items-center justify-center'>
			<div className='space-y-12 bg-white text-black p-6 m-6 rounded-lg sm:w-[50%]'>
				<div className=''>
					<h1 className='font-semibold leading-7 text-center text-lg'>Get in touch</h1>
					<p className='mt-1 leading-6 text-gray-600'>Fill out the form below to send a message to the admins.</p>

					<div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<div className='col-span-full'>
							<label htmlFor='title' className='block text-sm font-medium leading-6 '>
								Title
							</label>
							<div className='mt-2'>
								<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600'>
									<input
										className='block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
										type='text'
										name='title'
										id='title'
										autoComplete='none'
										placeholder=''
										value={title}
										onChange={e => setTitle(e.target.value)}
									/>
								</div>
							</div>
							{errors.title && <p className='text-[--color-error] font-semibold'>{errors.title}</p>}
						</div>

						<div className='col-span-full'>
							<label htmlFor='message' className='block text-sm font-medium leading-6 '>
								Message
							</label>
							<div className='mt-2'>
								<textarea
									className='block w-full rounded-md border-0 bg-transparent py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
									id='message'
									name='message'
									rows={3}
									value={message}
									onChange={e => setMessage(e.target.value)}
								/>
							</div>
							{errors.message && <p className='text-[--color-error] font-semibold'>{errors.message}</p>}
						</div>

						<div className='col-span-full'>
							<label htmlFor='email' className='block text-sm font-medium leading-6 '>
								Email
							</label>
							<div className='mt-2'>
								<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600'>
									<input
										className='block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
										type='email'
										name='email'
										id='email'
										autoComplete='email'
										placeholder=''
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
							</div>
							{errors.email && <p className='text-[--color-error] font-semibold'>{errors.email}</p>}
						</div>
					</div>
				</div>

				<div className='flex flex-col items-center justify-center'>
					<button
						id='submit'
						type='submit'
						disabled={!isFormValid}
						onClick={handleSubmit}
						className='flex items-center justify-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
					>
						<RiMailSendFill />
						<p className='ml-1'> Send</p>
					</button>

					<div
						id='alert'
						role='alert'
						className='relative block w-full p-4 mb-4 font-bold leading-5 text-white bg-green-500 rounded-lg opacity-100 hidden animate__animated animate__fadeIn'
					>
						<div className='flex items-center mr-12'>
							Message sent! An admin will be in touch soon. <FaRegSmile className='ml-2 text-lg' />
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}
