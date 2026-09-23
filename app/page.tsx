import { ArrowDown, ArrowUpRight, CalendarDays, MapPin, Users } from 'lucide-react'

const event = {
  name: 'Chicago Web Dev Connect 2026',
  date: 'Saturday, October 10, 2026',
  time: '1:00–4:00 PM',
  place: 'mHUB',
  address: '1623 W Fulton St, Chicago',
  audience:
    'College students, recent graduates, aspiring developers, and early-career software engineers.',
  description:
    'Showcase projects, discuss modern web technologies, and meet other developers.',
  detail:
    'Talk about career opportunities in tech and connect with people building the future of the web.',
  registration:
    'Free registration through the event website. Click “Register for Free” and complete the short signup form.',
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-3" aria-label="Chicago Web Dev Connect home">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">C</span>
          <span className="text-sm font-semibold tracking-tight">Chicago Web Dev Connect</span>
        </a>
        <a href="#register" className="hidden items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-70 sm:flex">
          Register for free <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <section id="top" className="relative mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-16 px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-24 lg:pt-12">
        <div className="relative z-10 max-w-3xl">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Chicago · 2026</p>
          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-8xl">
            {event.name}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
            A free afternoon for the people learning, building, and starting their careers in web development.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#register" className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
              Register for Free <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="#details" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-muted">
              Explore details <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[390px] items-center justify-center lg:min-h-[520px]">
          <div className="absolute right-0 top-1/2 size-[min(78vw,480px)] -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex aspect-square w-[min(82vw,480px)] max-w-[480px] items-center justify-center rounded-[38%] bg-primary p-8 shadow-2xl shadow-primary/20 sm:p-12 lg:rotate-6">
            <div className="flex aspect-square w-full flex-col justify-between rounded-[30%] border border-primary-foreground/30 p-7 text-primary-foreground sm:p-10 lg:-rotate-6">
              <div className="flex items-start justify-between text-xs font-semibold uppercase tracking-[0.22em]">
                <span>Web / Chicago</span>
                <span>01</span>
              </div>
              <div>
                <div className="mb-5 h-px w-16 bg-primary-foreground/60" />
                <p className="max-w-[260px] text-3xl font-semibold leading-none tracking-[-0.05em] sm:text-4xl">Bring your projects. Leave with connections.</p>
              </div>
              <div className="flex items-end justify-between text-sm">
                <span>Free event</span>
                <span className="text-3xl font-light">↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="details" className="border-t border-border bg-card">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">The essentials</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">One room. Good work. New connections.</h2>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            <div className="border-t border-border py-6 sm:pr-8">
              <CalendarDays className="mb-6 text-primary" aria-hidden="true" />
              <p className="font-semibold">{event.date}</p>
              <p className="mt-1 text-muted-foreground">{event.time}</p>
            </div>
            <div className="border-t border-border py-6 sm:pl-8">
              <MapPin className="mb-6 text-primary" aria-hidden="true" />
              <p className="font-semibold">{event.place}</p>
              <p className="mt-1 text-muted-foreground">{event.address}</p>
            </div>
            <div className="border-t border-border py-6 sm:pr-8">
              <Users className="mb-6 text-primary" aria-hidden="true" />
              <p className="font-semibold">Who it’s for</p>
              <p className="mt-1 leading-7 text-muted-foreground">{event.audience}</p>
            </div>
            <div className="border-t border-border py-6 sm:pl-8">
              <p className="mb-6 text-2xl font-semibold text-primary">02</p>
              <p className="font-semibold">What happens</p>
              <p className="mt-1 leading-7 text-muted-foreground">{event.description} {event.detail}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Save your spot</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Register for free.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{event.registration}</p>
        </div>
        <a href="#register" className="inline-flex w-fit items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
          Register for Free <ArrowUpRight aria-hidden="true" />
        </a>
      </section>

      <footer className="border-t border-border px-6 py-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{event.name}</span>
          <span>{event.date} · {event.place}</span>
        </div>
      </footer>
    </main>
  )
}

