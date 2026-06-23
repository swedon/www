'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { IoClose, IoPaperPlane } from 'react-icons/io5'

const initialForm = {
	name: '',
	email: '',
	title: '',
	message: '',
}

function validate(form, labels) {
	const errors = {}
	if (!form.name.trim()) errors.name = labels.name
	if (!form.title.trim()) errors.title = labels.subject
	if (!form.message.trim()) errors.message = labels.message
	if (form.message.trim() && form.message.trim().length < 10) errors.message = labels.messageLength
	if (!form.email.trim()) errors.email = labels.email
	if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email)) errors.email = labels.emailInvalid
	return errors
}

export default function ContactModal({ open, onClose }) {
	const t = useTranslations('contact')
	const [form, setForm] = useState(initialForm)
	const [status, setStatus] = useState('idle')
	const [feedback, setFeedback] = useState('')
	const validationLabels = useMemo(
		() => ({
			name: t('validation.name'),
			email: t('validation.email'),
			emailInvalid: t('validation.emailInvalid'),
			subject: t('validation.subject'),
			message: t('validation.message'),
			messageLength: t('validation.messageLength'),
		}),
		[t],
	)
	const errors = useMemo(() => validate(form, validationLabels), [form, validationLabels])
	const isValid = Object.keys(errors).length === 0

	useEffect(() => {
		if (!open) return
		const onKeyDown = event => {
			if (event.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', onKeyDown)
		document.body.style.overflow = 'hidden'
		return () => {
			document.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = ''
		}
	}, [open, onClose])

	if (!open) return null

	function updateField(field, value) {
		setForm(current => ({ ...current, [field]: value }))
		setFeedback('')
	}

	async function handleSubmit(event) {
		event.preventDefault()
		if (!isValid || status === 'sending') return

		const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL
		if (!webhookUrl) {
			setStatus('error')
			setFeedback(t('missingWebhook'))
			return
		}

		setStatus('sending')
		setFeedback('')

		const payload = {
			content: '',
			embeds: [
				{
					title: form.title.trim(),
					description: form.message.trim(),
					color: 0x5865f2,
					fields: [
						{ name: t('embedName'), value: form.name.trim(), inline: true },
						{ name: t('embedEmail'), value: form.email.trim(), inline: true },
					],
					footer: { text: t('footer') },
					timestamp: new Date().toISOString(),
				},
			],
			attachments: [],
		}

		try {
			const response = await fetch(webhookUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})

			if (!response.ok) throw new Error('Webhook request failed')

			setStatus('sent')
			setFeedback(t('sent'))
			setForm(initialForm)
		} catch {
			setStatus('error')
			setFeedback(t('error'))
		}
	}

	return (
		<div className='modal-shell' role='dialog' aria-modal='true' aria-labelledby='contact-title'>
			<button type='button' className='modal-backdrop' aria-label={t('closeForm')} onClick={onClose} />
			<form className='contact-modal' onSubmit={handleSubmit}>
				<div className='modal-header'>
					<div>
						<p className='eyebrow'>{t('eyebrow')}</p>
						<h2 id='contact-title'>{t('title')}</h2>
					</div>
					<button type='button' className='icon-button' aria-label={t('close')} onClick={onClose}>
						<IoClose />
					</button>
				</div>

				<div className='form-grid'>
					<label>
						<span>{t('name')}</span>
						<input value={form.name} onChange={event => updateField('name', event.target.value)} autoComplete='name' />
						{errors.name && <small>{errors.name}</small>}
					</label>
					<label>
						<span>{t('email')}</span>
						<input type='email' value={form.email} onChange={event => updateField('email', event.target.value)} autoComplete='email' />
						{errors.email && <small>{errors.email}</small>}
					</label>
					<label className='form-wide'>
						<span>{t('subject')}</span>
						<input value={form.title} onChange={event => updateField('title', event.target.value)} />
						{errors.title && <small>{errors.title}</small>}
					</label>
					<label className='form-wide'>
						<span>{t('message')}</span>
						<textarea rows={5} value={form.message} onChange={event => updateField('message', event.target.value)} />
						{errors.message && <small>{errors.message}</small>}
					</label>
				</div>

				{feedback && <p className={`form-feedback ${status}`}>{feedback}</p>}

				<div className='modal-actions'>
					<button type='button' className='button secondary' onClick={onClose}>
						{t('close')}
					</button>
					<button type='submit' className='button primary' disabled={!isValid || status === 'sending'}>
						<IoPaperPlane />
						{status === 'sending' ? t('sending') : t('send')}
					</button>
				</div>
			</form>
		</div>
	)
}
