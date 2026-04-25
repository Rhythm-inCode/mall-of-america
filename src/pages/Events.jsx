import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const eventsBg = '/videos/events-bg.mp4'

const tickerEvents = [
  'K-Pop Night Live — 12,000 Attendees', 'Nike Air Max Launch — Brand Activation',
  'Minnesota Vikings Fan Fest', 'Disney on Ice — 3 Week Run',
  'Samsung Galaxy Unpacked — Midwest Exclusive', 'Holiday Light Show — 6 Week Installation',
  'Coca-Cola Summer Pop-Up', 'NFL Draft Watch Party — 8,000 Fans',
]

const timeline = [
  { year: '1992', event: 'Mall of America Opens', detail: 'America stops and stares. 100,000+ visitors on opening day.' },
  { year: '2000', event: 'Camp Snoopy becomes Nickelodeon Universe', detail: "The park expands. America's indoor theme park is born." },
  { year: '2008', event: 'First Super Bowl activation', detail: 'NFL plants its flag. MoA becomes a marquee events venue.' },
  { year: '2015', event: 'North expansion opens', detail: '165 new stores, event spaces, luxury hotel added.' },
  { year: '2019', event: '400M cumulative visitors', detail: 'More people have visited MoA than live in the US.' },
  { year: '2024', event: 'Largest brand activation year', detail: '300+ events. Record $2.1B in annual retail sales.' },
]

const audienceMultipliers = {
  weekend: { label: 'Weekend (Sat/Sun)', base: 180000 },
  weekday: { label: 'Weekday', base: 85000 },
  holiday: { label: 'Holiday Weekend', base: 280000 },
  event: { label: 'During Major Event', base: 350000 },
}
const durationOptions = { 1: '1 Day', 3: '3 Days', 7: '1 Week', 14: '2 Weeks', 30: '1 Month' }

export default function Events() {
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const tickerRef = useRef(null)
  const timelineRef = useRef(null)
  const calcRef = useRef(null)
  const tickerAnimRef = useRef(null)

  const [selectedTiming, setSelectedTiming] = useState('weekend')
  const [selectedDuration, setSelectedDuration] = useState(3)
  const [placement, setPlacement] = useState('entrance')
  const [activeTimeline, setActiveTimeline] = useState(null)

  const placementMultipliers = { entrance: 1.0, food_court: 0.7, park: 0.85 }
  const placementLabels = { entrance: 'Main Entrance', food_court: 'Food Court', park: 'Near Theme Park' }
  const estimatedReach = Math.round(audienceMultipliers[selectedTiming].base * selectedDuration * placementMultipliers[placement])

  useEffect(() => {
    const ticker = tickerRef.current
    if (ticker) {
      let pos = 0
      const speed = 0.5
      const animate = () => {
        pos -= speed
        const totalWidth = ticker.scrollWidth / 2
        if (Math.abs(pos) >= totalWidth) pos = 0
        ticker.style.transform = `translateX(${pos}px)`
        tickerAnimRef.current = requestAnimationFrame(animate)
      }
      tickerAnimRef.current = requestAnimationFrame(animate)
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.3, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      gsap.fromTo(timelineRef.current ? Array.from(timelineRef.current.children) : [], { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', once: true } })
      gsap.fromTo(calcRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: calcRef.current, start: 'top 80%', once: true } })
    }, sectionRef)
    return () => { ctx.revert(); if (tickerAnimRef.current) cancelAnimationFrame(tickerAnimRef.current) }
  }, [])

  return (
    <section ref={sectionRef} style={{ width: '100%', background: '#060606', overflow: 'hidden' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src={eventsBg} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: `linear-gradient(to bottom, rgba(6,6,6,0.4) 0%, transparent 25%, transparent 45%, rgba(6,6,6,0.97) 100%), linear-gradient(to left, rgba(6,6,6,0.5) 0%, transparent 50%)` }} />
        <div style={{ position: 'absolute', top: '3rem', left: isMobile ? '1.5rem' : '5rem', fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', zIndex: 10 }}>06 — Events & Platform</div>

        <div ref={heroRef} style={{ position: 'absolute', bottom: isMobile ? '4rem' : '6rem', right: isMobile ? '1.5rem' : '5rem', zIndex: 10, textAlign: isMobile ? 'left' : 'right', opacity: 0, maxWidth: isMobile ? '90%' : '500px', left: isMobile ? '1.5rem' : 'auto' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '1.5rem' }}>America's Event Stage</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(36px, 7.5vw, 106px)', fontWeight: 700, lineHeight: 0.92, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            40 million<br /><span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>reasons</span><br />to show up.
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 'clamp(13px, 1.1vw, 15px)', color: 'rgba(255,255,255,0.4)', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.85, maxWidth: '420px', marginLeft: isMobile ? '0' : 'auto' }}>
            A live platform with a captive, engaged audience that no stadium or brand-owned space can match.
          </p>
        </div>

        {!isMobile && (
          <div style={{ position: 'absolute', left: '3rem', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Playfair Display', fontSize: 'clamp(120px, 18vw, 240px)', fontWeight: 700, lineHeight: 1, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.05em', userSelect: 'none', zIndex: 2 }}>40M</div>
        )}
      </div>

      {/* Live Ticker */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', background: 'rgba(201,168,76,0.03)', display: 'flex', alignItems: 'center' }}>
        <div style={{ padding: '1rem 1.5rem', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0, zIndex: 2, background: '#060606' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4444', boxShadow: '0 0 8px #ff4444', animation: 'livePulse 1.5s infinite' }} />
          <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Live Events</span>
        </div>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div ref={tickerRef} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
            {[...tickerEvents, ...tickerEvents].map((e, i) => (
              <span key={i} style={{ fontFamily: 'Inter', fontSize: isMobile ? '0.65rem' : '0.75rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', padding: '1.2rem 2rem', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'inline-block' }}>
                <span style={{ color: 'rgba(201,168,76,0.5)', marginRight: '0.8rem' }}>◆</span>{e}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '4rem 1.5rem' : '7rem 5rem' }}>

        {/* Timeline */}
        <div style={{ marginBottom: isMobile ? '5rem' : '8rem' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>30+ Years of Impact</div>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '4rem' }}>
            The milestones that<span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}> built a legend.</span>
          </h3>
          <div ref={timelineRef} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: isMobile ? '50px' : '80px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)' }} />
            {timeline.map((t, i) => (
              <div key={i}
                onMouseEnter={() => !isMobile && setActiveTimeline(i)}
                onMouseLeave={() => !isMobile && setActiveTimeline(null)}
                onClick={() => isMobile && setActiveTimeline(activeTimeline === i ? null : i)}
                style={{ display: 'grid', gridTemplateColumns: isMobile ? '50px 1fr' : '80px 1fr', gap: isMobile ? '1.5rem' : '3rem', padding: '2rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'default', opacity: 0, transition: 'background 0.3s ease' }}
              >
                <div style={{ fontFamily: 'Playfair Display', fontSize: activeTimeline === i ? '1.1rem' : '0.95rem', fontWeight: 700, color: activeTimeline === i ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s ease', paddingTop: '0.3rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', right: isMobile ? '-1.8rem' : '-3rem', top: '0.6rem', width: activeTimeline === i ? '10px' : '6px', height: activeTimeline === i ? '10px' : '6px', borderRadius: '50%', background: activeTimeline === i ? 'var(--color-gold)' : 'rgba(255,255,255,0.15)', transition: 'all 0.3s ease', boxShadow: activeTimeline === i ? '0 0 12px rgba(201,168,76,0.5)' : 'none' }} />
                  {t.year}
                </div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: activeTimeline === i ? 'clamp(16px, 2vw, 26px)' : 'clamp(14px, 1.8vw, 22px)', fontWeight: 600, color: activeTimeline === i ? '#fff' : 'rgba(255,255,255,0.55)', transition: 'all 0.3s ease', marginBottom: '0.5rem' }}>{t.event}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.83rem', color: 'rgba(255,255,255,0.25)', lineHeight: 1.7, fontWeight: 300, maxHeight: activeTimeline === i ? '60px' : '0', overflow: 'hidden', opacity: activeTimeline === i ? 1 : 0, transition: 'all 0.4s ease' }}>{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <div ref={calcRef} style={{ opacity: 0 }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>Activation Calculator</div>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.8rem' }}>
            How many people will<span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}> see your brand?</span>
          </h3>
          <p style={{ fontFamily: 'Inter', fontSize: '0.88rem', color: 'rgba(255,255,255,0.3)', fontWeight: 300, lineHeight: 1.8, marginBottom: '3.5rem', maxWidth: '600px' }}>
            Estimate your brand's reach based on placement, timing, and activation duration.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobileOrTablet ? '1fr' : '1fr 340px', gap: '4rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {[
                { label: 'When are you activating?', options: Object.entries(audienceMultipliers), value: selectedTiming, setValue: setSelectedTiming, getLabel: ([, v]) => v.label, getKey: ([k]) => k },
                { label: 'Duration', options: Object.entries(durationOptions), value: String(selectedDuration), setValue: (v) => setSelectedDuration(Number(v)), getLabel: ([, v]) => v, getKey: ([k]) => k },
                { label: 'Placement Location', options: Object.entries(placementLabels), value: placement, setValue: setPlacement, getLabel: ([, v]) => v, getKey: ([k]) => k },
              ].map(({ label, options, value, setValue, getLabel, getKey }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>{label}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {options.map(opt => {
                      const k = getKey(opt)
                      const isSelected = value === k
                      return (
                        <button key={k} onClick={() => setValue(k)} style={{ fontFamily: 'Inter', fontSize: '0.72rem', letterSpacing: '0.1em', padding: '0.7rem 1.2rem', background: isSelected ? 'rgba(201,168,76,0.12)' : 'transparent', border: `1px solid ${isSelected ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.08)'}`, color: isSelected ? 'var(--color-gold)' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.3s ease' }}>{getLabel(opt)}</button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Result */}
            <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)', padding: isMobile ? '2rem' : '3rem', position: isMobileOrTablet ? 'static' : 'sticky', top: '7rem' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '1rem' }}>Estimated Brand Reach</div>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.5rem', transition: 'all 0.4s ease' }}>{estimatedReach.toLocaleString()}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '2.5rem' }}>Unique Visitors</div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem' }}>
                {[['Timing', audienceMultipliers[selectedTiming].label], ['Duration', durationOptions[selectedDuration]], ['Location', placementLabels[placement]]].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>{label}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem', fontFamily: 'Inter', fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', lineHeight: 1.6, fontWeight: 300 }}>* Estimates based on MoA traffic data.</div>
              <a href="#/contact" style={{ display: 'block', marginTop: '2rem', background: 'var(--color-gold)', color: '#000', fontFamily: 'Inter', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, padding: '1rem', textAlign: 'center', textDecoration: 'none', transition: 'background 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.background = '#e0bb5f'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-gold)'}
              >Book an Activation →</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes livePulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } }`}</style>
    </section>
  )
}