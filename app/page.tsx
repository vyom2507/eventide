'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, CalendarDays, Check, MapPin, Users, X } from 'lucide-react'

const event = {
  name: 'Chicago Web Dev Connect 2026',
  date: 'Saturday, October 10, 2026',
  time: '1:00–4:00 PM',
  place: 'mHUB',
  address: '1623 W Fulton St, Chicago, IL',
  audience: 'College students, recent graduates, aspiring developers, and early-career software engineers.',
  description: 'Showcase projects, discuss modern web technologies, and meet other developers.',
  detail: 'Talk about career opportunities in tech and connect with people building the future of the web.',
  registration: 'Free registration through the event website. Click “Register for Free” and complete the short signup form.',
}

const experienceOptions = ['Student', 'Beginner Developer', 'Junior Developer', 'Mid-Level Developer', 'Other']
const interestOptions = ['Front-End Development', 'Back-End Development', 'Full-Stack Development', 'UI/UX', 'Career Networking', 'Other']
type FormData = { fullName: string; email: string; phone: string; experience: string; interest: string; updates: boolean }
type Errors = Partial<Record<keyof FormData, string>>
const emptyForm: FormData = { fullName: '', email: '', phone: '', experience: '', interest: '', updates: false }

function validate(form: FormData): Errors {
  const errors: Errors = {}
  if (form.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.'
  const phoneDigits = form.phone.replace(/\D/g, '')
  if (!phoneDigits) errors.phone = 'Please enter your phone number.'
  else if (phoneDigits.length > 10) errors.phone = 'Phone number must be no more than 10 digits.'
  else if (phoneDigits.length < 10) errors.phone = 'Please enter a valid 10-digit phone number.'
  if (!form.experience) errors.experience = 'Please choose your experience level.'
  if (!form.interest) errors.interest = 'Please choose an area of interest.'
  if (!form.updates) errors.updates = 'Please agree to receive event-related updates.'
  return errors
}

export default function Page() {
  const [form, setForm] = useState<FormData>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [spots, setSpots] = useState(75)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [duplicate, setDuplicate] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const storedSpotsValue = window.localStorage.getItem('chicago-web-dev-spots')
    if (storedSpotsValue !== null) {
      const storedSpots = Number(storedSpotsValue)
      if (Number.isFinite(storedSpots) && storedSpots >= 0) setSpots(storedSpots)
    }
  }, [])

  const firstName = useMemo(() => form.fullName.trim().split(/\s+/)[0] || '', [form.fullName])
  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (field === 'email') setDuplicate(false)
  }

  const openRegistration = () => {
    setIsModalOpen(true)
    setSubmitted(false)
  }

  const closeRegistration = () => {
    if (!isSubmitting) setIsModalOpen(false)
  }

  const handleSubmit = (eventObject: React.FormEvent<HTMLFormElement>) => {
    eventObject.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    setDuplicate(false)
    if (Object.keys(nextErrors).length > 0) return
    const normalizedEmail = form.email.trim().toLowerCase()
    const registrations = JSON.parse(window.localStorage.getItem('chicago-web-dev-registrations') || '[]') as { email: string }[]
    if (registrations.some((registration) => registration.email === normalizedEmail)) {
      setDuplicate(true)
      return
    }
    if (spots === 0) return
    setIsSubmitting(true)
    window.setTimeout(() => {
      const nextSpots = Math.max(0, spots - 1)
      window.localStorage.setItem('chicago-web-dev-registrations', JSON.stringify([...registrations, { email: normalizedEmail, name: form.fullName.trim() }]))
      window.localStorage.setItem('chicago-web-dev-spots', String(nextSpots))
      setSpots(nextSpots)
      setSubmitted(true)
      setIsSubmitting(false)
    }, 650)
  }

  const resetForm = () => { setForm(emptyForm); setErrors({}); setDuplicate(false); setSubmitted(false); setIsModalOpen(true) }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-3" aria-label="Chicago Web Dev Connect home">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">C</span>
          <span className="text-sm font-semibold tracking-tight">Chicago Web Dev Connect</span>
        </a>
        <button type="button" onClick={openRegistration} className="hidden items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:flex">Register for free <ArrowUpRight aria-hidden="true" /></button>
      </header>

      <section id="top" className="relative mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-16 px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-24 lg:pt-12">
        <div className="relative z-10 max-w-3xl">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Chicago · 2026</p>
          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-8xl">{event.name}</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">A free afternoon for the people learning, building, and starting their careers in web development.</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button type="button" onClick={openRegistration} className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Register for Free <ArrowUpRight aria-hidden="true" /></button>
            <a href="#details" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Explore details <ArrowDown aria-hidden="true" /></a>
          </div>
        </div>
        <div className="relative flex min-h-[390px] items-center justify-center lg:min-h-[520px]">
          <div className="absolute right-0 top-1/2 size-[min(78vw,480px)] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex aspect-square w-[min(82vw,480px)] max-w-[480px] items-center justify-center rounded-[38%] bg-primary p-8 shadow-2xl shadow-primary/20 sm:p-12 lg:rotate-6">
            <div className="flex aspect-square w-full flex-col justify-between rounded-[30%] border border-primary-foreground/30 p-7 text-primary-foreground sm:p-10 lg:-rotate-6"><div className="flex items-start justify-between text-xs font-semibold uppercase tracking-[0.22em]"><span>Web / Chicago</span><span>01</span></div><div><div className="mb-5 h-px w-16 bg-primary-foreground/60" /><p className="max-w-[260px] text-3xl font-semibold leading-none tracking-[-0.05em] sm:text-4xl">Bring your projects. Leave with connections.</p></div><div className="flex items-end justify-between text-sm"><span>Free event</span><span className="text-3xl font-light">↗</span></div></div>
          </div>
        </div>
      </section>

      <section id="details" className="border-t border-border bg-card"><div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-24"><div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">The essentials</p><h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">One room. Good work. New connections.</h2></div><div className="grid gap-0 sm:grid-cols-2"><div className="border-t border-border py-6 sm:pr-8"><CalendarDays className="mb-6 text-primary" aria-hidden="true" /><p className="font-semibold">{event.date}</p><p className="mt-1 text-muted-foreground">{event.time}</p></div><div className="border-t border-border py-6 sm:pl-8"><MapPin className="mb-6 text-primary" aria-hidden="true" /><p className="font-semibold">{event.place}</p><p className="mt-1 text-muted-foreground">{event.address}</p></div><div className="border-t border-border py-6 sm:pr-8"><Users className="mb-6 text-primary" aria-hidden="true" /><p className="font-semibold">Who it&apos;s for</p><p className="mt-1 leading-7 text-muted-foreground">{event.audience}</p></div><div className="border-t border-border py-6 sm:pl-8"><p className="mb-6 text-2xl font-semibold text-primary">02</p><p className="font-semibold">What happens</p><p className="mt-1 leading-7 text-muted-foreground">{event.description} {event.detail}</p></div></div></div></section>

      <section id="register" className="mx-auto w-full max-w-7xl scroll-mt-6 px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Save your spot</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Register for free.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{event.registration}</p><div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border px-4 py-2 text-sm font-medium"><span className="size-2 rounded-full bg-primary" aria-hidden="true" />{spots} spots remaining</div></div>
          {submitted ? <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8"><div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check aria-hidden="true" /></div><h3 className="mt-6 text-3xl font-semibold tracking-tight">You&apos;re registered!</h3><p className="mt-3 leading-7 text-muted-foreground">Thanks, {firstName}. Your spot for Chicago Web Dev Connect 2026 has been reserved.</p><div className="mt-8 grid gap-4 border-t border-border pt-6 text-sm"><p><strong>Saturday, October 10, 2026</strong><br />1:00 PM – 4:00 PM</p><p><strong>mHUB</strong><br />1623 W Fulton St, Chicago, IL</p></div><button type="button" onClick={resetForm} className="mt-8 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Register Another Attendee</button></div> : spots === 0 ? <div className="rounded-3xl border border-border bg-card p-6 sm:p-8"><h3 className="text-2xl font-semibold">Event Full</h3><p className="mt-2 text-muted-foreground">All available spots have been reserved.</p></div> : <>
            {isModalOpen && <div className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm" aria-hidden="true" onClick={closeRegistration} />}
            <form onSubmit={handleSubmit} noValidate className={isModalOpen ? 'fixed inset-x-4 top-1/2 z-50 max-h-[90vh] -translate-y-1/2 overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl sm:left-1/2 sm:right-auto sm:w-[min(680px,calc(100vw-2rem))] sm:-translate-x-1/2 sm:p-8' : 'hidden'}>
              <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Free registration</p><h3 className="mt-2 text-2xl font-semibold tracking-tight">Reserve your spot</h3></div><button type="button" onClick={closeRegistration} aria-label="Close registration form" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><X aria-hidden="true" /></button></div>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Full Name" id="fullName" value={form.fullName} error={errors.fullName} onChange={(value) => updateField('fullName', value)} /><Field label="Email Address" id="email" type="email" value={form.email} error={errors.email || (duplicate ? 'This email is already registered for this event.' : undefined)} onChange={(value) => updateField('email', value)} /><Field label="Phone Number" id="phone" type="tel" value={form.phone} error={errors.phone} onChange={(value) => updateField('phone', value)} /><SelectField label="Experience Level" id="experience" value={form.experience} options={experienceOptions} error={errors.experience} onChange={(value) => updateField('experience', value)} /><SelectField label="What are you most interested in?" id="interest" value={form.interest} options={interestOptions} error={errors.interest} onChange={(value) => updateField('interest', value)} /></div><label className="mt-6 flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={form.updates} onChange={(e) => updateField('updates', e.target.checked)} aria-invalid={Boolean(errors.updates)} aria-describedby={errors.updates ? 'updates-error' : undefined} className="mt-1 size-4 accent-primary" /> <span>I agree to receive event-related updates.{errors.updates && <span id="updates-error" className="mt-1 block text-sm text-destructive">{errors.updates}</span>}</span></label><button type="submit" disabled={isSubmitting || spots === 0} className="mt-7 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{isSubmitting ? 'Registering…' : 'Reserve My Spot'}</button></form></>}
        </div>
      </section>
      <footer className="border-t border-border px-6 py-6 lg:px-10"><div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>{event.name}</span><span>{event.date} · {event.place}</span></div></footer>
    </main>
  )
}

function Field({ label, id, type = 'text', value, optional, error, onChange }: { label: string; id: string; type?: string; value: string; optional?: boolean; error?: string; onChange: (value: string) => void }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-medium">{label}{optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}</label><input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />{error && <p id={`${id}-error`} className="mt-2 text-sm text-destructive">{error}</p>}</div>
}

function SelectField({ label, id, value, options, error, onChange }: { label: string; id: string; value: string; options: string[]; error?: string; onChange: (value: string) => void }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label><select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"><option value="">Select an option</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>{error && <p id={`${id}-error`} className="mt-2 text-sm text-destructive">{error}</p>}</div>
}
