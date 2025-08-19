'use client'

import React, { Fragment, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'

import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'

import { MdMenu, MdContactPage } from 'react-icons/md'
import { FaChevronDown, FaHome } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

import DiscordButton from './Discord'

import logoWhite from '@/public/s-logo-white.svg'
import logoBlack from '@/public/s-logo-black.svg'

import ThemeSwitcher from './ThemeSwitcher'

const links = [
	{ id: 1, text: 'Start', description: '', href: '/start', icon: FaHome },
	{ id: 2, text: 'Contact', description: '', href: '/contact', icon: MdContactPage },
]

const Navbar = ({ children }) => {
	const [mounted, setMounted] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const { systemTheme, theme } = useTheme()

	const pathname = usePathname()
	const currentTheme = theme === 'system' ? systemTheme : theme
	const logo = currentTheme === 'dark' ? logoWhite : logoBlack

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ')
	}

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <>{children}</>
	}

	return (
		<header
			className={`w-full text-[--color-dark] dark:text-[--color-light] ${pathname !== '/' ? 'bg-[--color-light] dark:bg-[--color-dark]' : ''}`}
		>
			<nav
				className={`mx-auto flex items-center justify-between p-4 lg:px-8 ${
					pathname !== '/' ? 'bg-[--color-light] dark:bg-[--color-dark]' : ''
				}`}
				aria-label='Global'
			>
				<div className='flex lg:flex-1'>
					<Link
						href='/'
						className={`flex items-center font-bold text-4xl ${pathname === '/' ? 'animate__animated animate__zoomInLeft' : ''}`}
					>
						<span className='sr-only'>SWEDON</span>
						<Image
							src={logo}
							alt='S'
							className={`object-none m-0 p-0 h-14 w-auto text-sm flex items-center -mr-1 ${
								pathname === '/' ? 'animate__animated animate__fadeInLeftBig' : ''
							}`}
						/>
						WEDON
					</Link>
				</div>

				<div className='flex lg:hidden'>
					<button
						type='button'
						className='inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-outline-black bg-dark-100 dark:bg-dark-900 dark:text-white'
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className='sr-only'>Open main menu</span>
						<MdMenu className='h-6 w-6' aria-hidden='true' />
					</button>
				</div>

				<div className='hidden lg:flex lg:gap-x-12 ml-6 flex items-center gap-x-1 text-lg font-semibold leading-6'>
					{links.map(item => {
						if (item.children) {
							return (
								<Popover className='relative' key={item.id}>
									<PopoverButton className='flex items-center gap-x-1 text-lg font-semibold leading-6'>
										{item.icon && <item.icon className='h-5 w-5 flex-none text-gray-400 mr-1' aria-hidden='true' />}
										{item.text}
										<FaChevronDown className='h-5 w-5 flex-none text-gray-400' aria-hidden='true' />
									</PopoverButton>

									<Transition
										as={Fragment}
										enter='transition ease-out duration-200'
										enterFrom='opacity-0 translate-y-1'
										enterTo='opacity-100 translate-y-0'
										leave='transition ease-in duration-150'
										leaveFrom='opacity-100 translate-y-0'
										leaveTo='opacity-0 translate-y-1'
									>
										<PopoverPanel className='absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg shadow-gray-500/40 dark:shadow-white-500/40 ring-1 ring-gray-800/40 dark:ring-neutral-400/20 bg-[--color-light] dark:bg-[--color-dark] text-[--color-dark] dark:text-[--color-light]'>
											<div className='p-4'>
												{item.children &&
													item.children.map(child => (
														<Link
															key={child.text + child.id}
															onClick={() => {
																setMobileMenuOpen(!mobileMenuOpen)
															}}
															href={child.href}
															className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6'
														>
															<div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg'>
																{child.icon && (
																	<child.icon className='h-6 w-6 group-hover:text-indigo-600' aria-hidden='true' />
																)}
															</div>
															<div className='flex-auto'>
																<p className='block font-semibold'>{child.text}</p>
																<p className='mt-1'>{child.description}</p>
															</div>
														</Link>
													))}
											</div>
										</PopoverPanel>
									</Transition>
								</Popover>
							)
						} else {
							return (
								<Link
									key={item.id}
									onClick={() => {
										setMobileMenuOpen(!mobileMenuOpen)
									}}
									href={item.href}
									className='flex cursor-pointer capitalize text-x justify-center items-center'
								>
									{item.icon && <item.icon className='h-5 w-5 flex-none text-gray-400 mr-2' aria-hidden='true' />}
									{item.text}
								</Link>
							)
						}
					})}
				</div>

				<div className='hidden lg:flex lg:flex-1 lg:justify-end'>
					<span className='text-sm leading-6 text-gray-900 mr-2'>
						<DiscordButton href='/discord' />
					</span>
					<ThemeSwitcher />
				</div>
			</nav>

			<Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
				<DialogPanel className='fixed inset-0 inset-y-0 left-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 text-[--color-dark] dark:text-[--color-light] bg-[--color-light] dark:bg-[--color-dark]'>
					<div className='flex lg:flex-1 items-center justify-between -m-2'>
						<Link href='/' className='flex items-center font-bold text-4xl'>
							<span className='sr-only'>SWEDON</span>
							<Image src={logo} alt='S' className='object-none m-0 p-0 h-14 w-auto text-sm flex items-center -mr-1' />
							WEDON
						</Link>
						<button type='button' className='-m-2.5 rounded-md p-2.5' onClick={() => setMobileMenuOpen(false)}>
							<span className='sr-only'>Close menu</span>
							<FaXmark className='h-6 w-6' aria-hidden='true' />
						</button>
					</div>

					<div className='mt-6 flow-root'>
						<div className='-my-6 divide-y divide-gray-500/10'>
							<div className='space-y-2 py-6'>
								{links.map(item => {
									if (item.children) {
										return (
											<Disclosure as='div' className='-mx-3' key={item.id}>
												{({ open }) => (
													<div className=''>
														<DisclosureButton className='flex w-full inline-block rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold'>
															{item.icon && (
																<item.icon className='h-5 w-5 flex-none text-gray-400 mr-1' aria-hidden='true' />
															)}
															{item.text}
															<FaChevronDown
																className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none right-0 ml-auto')}
																aria-hidden='true'
															/>
														</DisclosureButton>
														<DisclosurePanel className='mt-2 space-y-2'>
															{[...item.children].map(child => (
																<DisclosureButton
																	key={child.text + child.id}
																	as={Link}
																	onClick={() => {
																		setMobileMenuOpen(!mobileMenuOpen)
																	}}
																	href={child.href}
																	className='block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800'
																>
																	{child.icon && (
																		<child.icon
																			className='inline-flex h-5 w-5 flex-none text-gray-400 mr-1'
																			aria-hidden='true'
																		/>
																	)}
																	{child.text}
																</DisclosureButton>
															))}
														</DisclosurePanel>
													</div>
												)}
											</Disclosure>
										)
									} else {
										return (
											<Link
												key={item.id}
												onClick={() => {
													setMobileMenuOpen(!mobileMenuOpen)
												}}
												href={item.href}
												className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-100 dark:hover:bg-gray-800'
											>
												{item.icon && (
													<item.icon className='inline-flex h-5 w-5 flex-none text-gray-400 mr-1' aria-hidden='true' />
												)}
												{item.text}
											</Link>
										)
									}
								})}
							</div>
							<div className='flex inline-block py-6'>
								<DiscordButton />
								<ThemeSwitcher />
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	)
}

export default Navbar
export { links }
