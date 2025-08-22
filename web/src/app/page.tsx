"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// Index route for smartcalldecline.com — App Router (src/app/page.tsx)
// Site uses a white background; HERO is BLACK. Hero right side shows a revenue-loss
// calculator. A 60s interactive demo section is included and linked via #demo.

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Hero />
      <FeatureStrip />
      <LiveDemo />
      <HowItWorks />
      <WaitlistForm />
      <FAQ />
      <Footer />
    </main>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 sm:px-8 ${className}`}>{children}</div>;
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <Container className="pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
              <span>📵</span> Missed calls → lost jobs
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Never lose that $2,500 job to a missed call again
            </h1>
            <p className="mt-5 text-lg text-white/80 sm:text-xl">
              We auto‑text any missed caller with a quick form, log the lead, and remind you to follow up—so you can finish the job and book the next one.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-500"
              >
                Get Early Access
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                Watch Demo (60s)
              </a>
            </div>
            <p className="mt-2 text-sm text-white/70">Beta capped at 50 contractors.</p>

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Auto‑text missed callers",
                "Quick intake form",
                "Leads to Google Sheet/CRM",
                "Follow‑up reminders",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-white/85">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-sm">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Calculator replaces previous customer bubble */}
          <div className="relative">
            <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-neutral-900/80 p-4 shadow-2xl">
              <LossCalculator />
            </div>
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-orange-600/20 to-fuchsia-600/20 blur-2xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function LossCalculator() {
  const [missedPerDay, setMissedPerDay] = useState(2);
  const [avgValue, setAvgValue] = useState(500);
  const [bookingRate, setBookingRate] = useState(25); // percent
  const [workdays, setWorkdays] = useState(10);

  const jobsPerMonth = Math.round((missedPerDay * workdays * bookingRate) / 100);
  const revenueLoss = jobsPerMonth * avgValue;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 p-5 text-white">
      <div className="rounded-xl bg-white/5 p-5">
        <h3 className="text-2xl font-bold">Monthly Revenue Lost</h3>
        <p className="mt-1 text-sm text-white/80">Miss fewer leads + save time + book jobs faster.</p>

        <div className="mt-5 space-y-5">
          <Slider label="Missed calls per day" min={0} max={15} step={1} value={missedPerDay} onChange={setMissedPerDay} />
          <Slider label="Average job value" min={100} max={5000} step={50} value={avgValue} format={(v)=>`$${v}`} onChange={setAvgValue} />
          <Slider label="Booking rate" min={5} max={100} step={5} value={bookingRate} format={(v)=>`${v}%`} onChange={setBookingRate} />
          <Slider label="Workdays per month" min={4} max={26} step={1} value={workdays} onChange={setWorkdays} />

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="text-sm text-white/80">Potential Revenue Loss</div>
            <div className="mt-1 flex items-end justify-between">
              <div className="text-4xl font-extrabold">${revenueLoss.toLocaleString()}</div>
              <div className="text-white/80">≈ {jobsPerMonth} jobs/mo</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a href="#demo" className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20">Watch Demo</a>
            <a href="#waitlist" className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-400">Get Early Access</a>
          </div>
          <p className="mt-2 text-center text-xs text-white/80">Beta capped at 20 contractors • Works with your current number</p>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange, min, max, step = 1, format }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number; format?: (n:number)=>string }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-white/90">{label}</span>
        <span className="font-semibold text-white">{format ? format(value) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-orange-400 w-full"
      />
    </label>
  );
}

/** DEMO SECTION **/
function LiveDemo() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    setPhase(0);
    const timeouts: NodeJS.Timeout[] = [];
    timeouts.push(setTimeout(() => setPhase(1), 400));
    timeouts.push(setTimeout(() => setPhase(2), 1400));
    timeouts.push(setTimeout(() => setPhase(3), 2400));
    timeouts.push(setTimeout(() => setPhase(4), 3600));
    return () => timeouts.forEach(clearTimeout);
  }, [playing]);

  return (
    <section id="demo" className="bg-white">
      <Container className="py-16 sm:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold sm:text-3xl text-neutral-900">See the flow in 60 seconds</h3>
            <p className="mt-3 text-neutral-700">
              Click the button to simulate a missed call. Watch the auto‑SMS, quick intake form, and reminder kick in.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setPlaying(true)}
                className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-500"
              >
                Simulate missed call
              </button>
              <button
                onClick={() => {
                  setPlaying(false);
                  setPhase(0);
                }}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-2.5 font-medium text-neutral-800 transition hover:bg-neutral-50"
              >
                Reset
              </button>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-neutral-700">
              <li className={phase >= 1 ? "opacity-100" : "opacity-40"}>1) Missed call detected</li>
              <li className={phase >= 2 ? "opacity-100" : "opacity-40"}>2) Auto‑SMS sent with form link</li>
              <li className={phase >= 3 ? "opacity-100" : "opacity-40"}>3) Lead saved to Google Sheet</li>
              <li className={phase >= 4 ? "opacity-100" : "opacity-40"}>4) Callback reminder scheduled</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-900 p-4 text-white">
            <div className="space-y-3">
              <Bubble who="System" content="Incoming call from (312) 555‑0149…" />
              {phase >= 1 && <Bubble who="System" content="Missed call. Triggering workflow…" />}
              {phase >= 2 && (
                <Bubble who="You (auto‑SMS)" accent content="Thanks for calling! I’m on a job. Tap here to share your details so I can call you back." />
              )}
              {phase >= 3 && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                  <div className="mb-2 text-white/70">Quick Intake</div>
                  <div className="space-y-2 text-white/90">
                    <Field label="Name" value="Jordan P." />
                    <Field label="Address" value="773 W Lake St" />
                    <Field label="Issue" value="Water heater leaking" />
                  </div>
                </div>
              )}
              {phase >= 4 && <Bubble who="System" content="Lead saved. Reminder set for today at 4:00 PM." />}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Bubble({ who, content, accent = false }: { who: string; content: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-3 text-sm ${accent ? "border-orange-500/30 bg-orange-500/10" : "border-white/10 bg-white/5"}`}>
      <div className="mb-1 text-[11px] uppercase tracking-wide text-white/60">{who}</div>
      <div className="text-white/90">{content}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/60">{label}</span>
      <span className="truncate font-medium">{value}</span>
    </div>
  );
}

function FeatureStrip() {
  return (
    <section>
      <Container className="py-10">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { title: "No app to install", desc: "Works with your existing number." },
            { title: "iOS & Android", desc: "Compatible with both ecosystems." },
            { title: "Sheets/CRM ready", desc: "Leads land where you work." },
            { title: "Privacy first", desc: "You control your data." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-neutral-200 bg-white p-4">
              <div className="text-base font-semibold text-neutral-900">{f.title}</div>
              <div className="mt-1 text-sm text-neutral-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Missed call detected", desc: "We watch your number and trigger instantly when you can’t pick up." },
    { title: "Auto‑text with quick form", desc: "Customer taps a link and adds name, job, address, and callback window." },
    { title: "Lead saved where you work", desc: "Details land in your Google Sheet or CRM—no copying and pasting." },
    { title: "Smart reminders", desc: "We nudge you until you call back or schedule. Snooze when you’re slammed." },
  ];

  return (
    <section id="how" className="border-y border-neutral-200 bg-white">
      <Container className="py-16 sm:py-24">
        <h2 className="text-center text-3xl font-bold sm:text-4xl text-neutral-900">How it works</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
          Simple, fast, and built for busy trades who can’t sit by the phone.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">
                {i + 1}
              </div>
              <div className="text-lg font-semibold text-neutral-900">{s.title}</div>
              <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WaitlistForm() {
  return (
    <section id="waitlist" className="bg-white">
      <Container className="py-16 sm:py-24">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold sm:text-3xl text-neutral-900">Get early access</h3>
            <p className="mt-3 text-neutral-700">
              Join the beta (limited to 50 contractors). We’ll reach out to set you up and connect your Google Sheet/CRM.
            </p>
            <ul className="mt-6 space-y-2 text-neutral-800">
              {[
                "Set up in under 10 minutes",
                "No app to install",
                "Works with your existing number",
                "Cancel anytime",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-sm text-emerald-700">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            name="waitlist"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="rounded-3xl border border-neutral-200 bg-white p-6"
          >
            {/* Netlify form name */}
            <input type="hidden" name="form-name" value="waitlist" />
            {/* Honeypot */}
            <p className="hidden">
              <label>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField name="name" label="Your name" required />
              <TextField name="company" label="Company" />
              <TextField type="email" name="email" label="Email" required />
              <TextField type="tel" name="phone" label="Phone" />
              <SelectField name="trade" label="Trade" options={["HVAC", "Electrical", "Plumbing", "Handyman", "Other"]} />
              <TextField name="city" label="City / Area" />
              <TextField type="number" name="missed_calls_per_week" label="Missed calls per week (est.)" />
              <TextField name="ref" label="How’d you hear about us?" />
            </div>

            <div className="mt-4">
              <label className="flex items-start gap-3 text-sm text-neutral-700">
                <input type="checkbox" name="privacy" className="mt-1 h-4 w-4 rounded border-neutral-300 bg-white" required />
                <span>
                  I agree to be contacted about Smart Call Decline and consent to my data being used to reach me about the beta.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-500"
            >
              Request access
            </button>
            <p className="mt-2 text-center text-xs text-neutral-500">No spam. Unsubscribe anytime.</p>
          </form>
        </div>
      </Container>
    </section>
  );
}

function TextField({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 inline-block text-neutral-800">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="block w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 placeholder-neutral-400 outline-none ring-0 transition focus:border-neutral-400"
        placeholder=""
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 inline-block text-neutral-800">{label}</span>
      <select
        name={name}
        className="block w-full appearance-none rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 outline-none focus:border-neutral-400"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option value={o} key={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Does this replace Jobber/Housecall Pro?",
      a: "No. Smart Call Decline is laser‑focused on catching missed‑call leads fast and pushing them into your existing tools.",
    },
    {
      q: "Will it work with my current phone number?",
      a: "Yes. We monitor your number for missed calls and trigger the workflow—no porting required.",
    },
    {
      q: "Where do my leads go?",
      a: "Anywhere you prefer: Google Sheets, CSV export, or a supported CRM. We’ll confirm during setup.",
    },
  ];

  return (
    <section>
      <Container className="py-16 sm:py-24">
        <h3 className="text-center text-2xl font-bold sm:text-3xl text-neutral-900">FAQ</h3>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="text-base font-semibold text-neutral-900">{item.q}</div>
              <p className="mt-2 text-neutral-700">{item.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Container className="py-8 text-sm text-neutral-600">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Smart Call Decline</div>
          <div className="flex items-center gap-4">
            <Link href="#waitlist" className="hover:text-neutral-900">Get Early Access</Link>
            <Link href="#how" className="hover:text-neutral-900">How it works</Link>
            <a href="mailto:hello@smartcalldecline.com" className="hover:text-neutral-900">Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
