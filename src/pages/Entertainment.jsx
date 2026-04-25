import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aiEntertainment from '../assets/images/ai-entertainment.jpg'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const entertainmentBg = '/videos/entertainment-bg.mp4'

const zones = [
  { id: 1, name: 'Nickelodeon Central', rides: 8, x: '48%', y: '38%', color: '#ff6600' },
  { id: 2, name: 'SpongeBob Zone', rides: 5, x: '28%', y: '55%', color: '#ffcc00' },
  { id: 3, name: 'TMNT Zone', rides: 4, x: '68%', y: '52%', color: '#00aa44' },
  { id: 4, name: 'Dora Zone', rides: 3, x: '22%', y: '30%', color: '#ff44aa' },
  { id: 5, name: 'Avatar Zone', rides: 4, x: '72%', y: '28%', color: '#44aaff' },
  { id: 6, name: 'Peppa Pig World', rides: 3, x: '50%', y: '68%', color: '#ff88bb' },
]

const allRides = [
  { name: 'SpongeBob SubPants Adventure', zone: 'SpongeBob Zone', type: 'Family', thrill: 2 },
  { name: 'TMNT Shell Shock', zone: 'TMNT Zone', type: 'Thrill', thrill: 4 },
  { name: 'Peppa Pig Golden Boots', zone: 'Peppa Pig World', type: 'Kids', thrill: 1 },
  { name: 'Avatar Airbender', zone: 'Avatar Zone', type: 'Thrill', thrill: 5 },
  { name: 'Fairly Odd Coaster', zone: 'Nickelodeon Central', type: 'Coaster', thrill: 5 },
  { name: 'Rock Bottom Plunge', zone: 'Nickelodeon Central', type: 'Water', thrill: 4 },
  { name: 'Guppy Bubble Guppies', zone: 'Dora Zone', type: 'Kids', thrill: 1 },
  { name: 'Splat-O-Sphere', zone: 'Nickelodeon Central', type: 'Thrill', thrill: 3 },
  { name: 'Dora & Diego Adventure', zone: 'Dora Zone', type: 'Family', thrill: 2 },
  { name: 'Orange Streak', zone: 'Nickelodeon Central', type: 'Coaster', thrill: 5 },
]

const comparison = [
  { label: 'Average Session Duration', online: '8 min', moa: '3.2 hrs' },
  { label: 'Unaided Brand Recall', online: '12%', moa: '67%' },
  { label: 'Repeat Visit Rate', online: '23%', moa: '71%' },
  { label: 'Purchase Intent Post-Visit', online: '31%', moa: '84%' },
  { label: 'Average Basket Size', online: '$42', moa: '$180' },
]

export default function Entertainment() {
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const rideCountRef = useRef(null)
  const compRef = useRef(null)
  const [activeZone, setActiveZone] = useState(null)
  const [ridesRevealed, setRidesRevealed] = useState(0)
  const [compVisible, setCompVisible] = useState(false)

  useEffect(() => {
    ScrollTrigger.create({ trigger: rideCountRef.current, start: 'top 80%', once: true, onEnter: () => {
      let count = 0
      const interval = setInterval(() => { count++; setRidesRevealed(count); if (count >= allRides.length) clearInterval(interval) }, 120)
    }})
    ScrollTrigger.create({ trigger: compRef.current, start: 'top 80%', once: true, onEnter: () => setCompVisible(true) })

    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.3, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      gsap.fromTo(statsRef.current ? Array.from(statsRef.current.children) : [], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const activeZoneData = zones.find(z => z.id === activeZone)

  return (
    <section ref={sectionRef} style={{ width: '100%', background: '#050505', overflow: 'hidden' }}>

      {/* Hero video */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src={entertainmentBg} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: `linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 25%, transparent 45%, rgba(5,5,5,0.98) 100%), linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 50%)` }} />

        <div style={{ position: 'absolute', top: '3rem', left: isMobile ? '1.5rem' : '5rem', fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', zIndex: 10 }}>05 — Entertainment</div>

        <div ref={heroRef} style={{ position: 'absolute', bottom: isMobile ? '4rem' : '6rem', left: isMobile ? '1.5rem' : '5rem', zIndex: 10, opacity: 0, maxWidth: isMobile ? '90%' : '600px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,102,0,0.12)', border: '1px solid rgba(255,102,0,0.3)', padding: '0.4rem 1rem', marginBottom: '1.5rem', fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,140,0,0.9)' }}>Nickelodeon Universe®</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(36px, 8vw, 110px)', fontWeight: 700, lineHeight: 0.92, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            America's largest<br /><span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>indoor theme park.</span>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(255,255,255,0.45)', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.8, maxWidth: '500px' }}>
            7 acres. 27 rides. Zero outdoor weather. The park that makes Mall of America truly irreplaceable.
          </p>
        </div>

        {!isMobile && (
          <div style={{ position: 'absolute', right: '5rem', bottom: '6rem', zIndex: 10, textAlign: 'right' }}>
            <div style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(80px, 12vw, 160px)', fontWeight: 700, lineHeight: 1, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.05em' }}>27</div>
            <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginTop: '-1rem' }}>rides & attractions</div>
          </div>
        )}
      </div>

      {/* Stats strip */}
      <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {[['7', ' Acres', 'Indoor Theme Park'], ['27', '+', 'Rides & Attractions'], ['4.5M', '', 'Park Visitors/Year'], ['#1', '', 'Indoor Park in USA']].map(([n, s, l], i) => (
          <div key={i} style={{ padding: isMobile ? '1.5rem 1rem' : '3rem 2.5rem', opacity: 0, borderRight: (isMobile ? i % 2 === 0 : i < 3) ? '1px solid rgba(255,255,255,0.05)' : 'none', borderBottom: isMobile && i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none', transition: 'background 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ fontFamily: 'Playfair Display', fontSize: isMobile ? 'clamp(32px, 8vw, 52px)' : 'clamp(44px, 5.5vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
              {n}<span style={{ fontSize: '0.45em', color: 'var(--color-gold)', fontStyle: 'italic' }}>{s}</span>
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '4rem 1.5rem' : '7rem 5rem' }}>

        {/* AI-generated entertainment visual */}
        <div style={{
          marginBottom: isMobile ? '4rem' : '6rem',
          overflow: 'hidden', position: 'relative',
          height: isMobile ? '200px' : '320px',
        }}>
          <img src={aiEntertainment} alt="Nickelodeon Universe — AI Rendering" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.65) saturate(0.9) contrast(1.1)',
            transition: 'transform 0.8s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(5,5,5,0.8) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem' }}>
            <div style={{ fontFamily: 'Playfair Display', fontSize: isMobile ? '1rem' : '1.4rem', color: '#fff', marginBottom: '0.3rem' }}>Nickelodeon Universe®</div>
            <div style={{ fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>AI-rendered concept · 7 Acres · 27 Rides</div>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff6600, transparent)' }} />
        </div>

        {/* Feature 1: Interactive Park Map */}
        <div style={{ marginBottom: isMobile ? '5rem' : '8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>Interactive Park Map</div>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3vw, 42px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Explore 7 Acres of Rides</h3>
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
              {isMobile ? '↑ Tap zones to explore' : '↑ Hover zones to explore'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobileOrTablet ? '1fr' : '1fr 380px', gap: '3rem', alignItems: 'start' }}>
            {/* Map */}
            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', height: isMobile ? '300px' : '420px', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Playfair Display', fontSize: '0.75rem', color: 'rgba(255,255,255,0.06)', letterSpacing: '0.3em', textTransform: 'uppercase', userSelect: 'none', whiteSpace: 'nowrap' }}>Nickelodeon Universe</div>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {zones.map((z, i) => zones.slice(i + 1).map((z2, j) => (
                  <line key={`${i}-${j}`} x1={z.x} y1={z.y} x2={z2.x} y2={z2.y} stroke="rgba(201,168,76,0.08)" strokeWidth="1" strokeDasharray="4 6" />
                )))}
              </svg>
              {zones.map(z => (
                <div key={z.id}
                  onMouseEnter={() => !isMobile && setActiveZone(z.id)}
                  onMouseLeave={() => !isMobile && setActiveZone(null)}
                  onClick={() => setActiveZone(activeZone === z.id ? null : z.id)}
                  style={{ position: 'absolute', left: z.x, top: z.y, transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: 10 }}
                >
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: activeZone === z.id ? '60px' : '40px', height: activeZone === z.id ? '60px' : '40px', borderRadius: '50%', border: `1px solid ${z.color}`, opacity: activeZone === z.id ? 0.4 : 0.15, transition: 'all 0.4s ease', animation: 'pulse 2s infinite' }} />
                  <div style={{ width: activeZone === z.id ? '18px' : '12px', height: activeZone === z.id ? '18px' : '12px', borderRadius: '50%', background: activeZone === z.id ? z.color : 'rgba(255,255,255,0.3)', transition: 'all 0.3s ease', boxShadow: activeZone === z.id ? `0 0 20px ${z.color}60` : 'none' }} />
                  <div style={{ position: 'absolute', top: '120%', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: activeZone === z.id ? z.color : 'rgba(255,255,255,0.25)', transition: 'color 0.3s ease', marginTop: '4px' }}>{z.name}</div>
                </div>
              ))}
              <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.5rem', fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>7 Acres Total</div>
            </div>

            {/* Zone detail */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${activeZoneData ? activeZoneData.color + '30' : 'rgba(255,255,255,0.06)'}`, padding: '2.5rem', minHeight: isMobileOrTablet ? '200px' : '420px', transition: 'border-color 0.4s ease', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {activeZoneData ? (
                <>
                  <div style={{ width: '30px', height: '2px', background: activeZoneData.color, marginBottom: '1.5rem' }} />
                  <h4 style={{ fontFamily: 'Playfair Display', fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{activeZoneData.name}</h4>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: activeZoneData.color, marginBottom: '2rem', opacity: 0.8 }}>{activeZoneData.rides} Attractions</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {allRides.filter(r => r.zone === activeZoneData.name).map((r, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.03)', borderLeft: `2px solid ${activeZoneData.color}50` }}>
                        <span style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>{r.name}</span>
                        <div style={{ display: 'flex', gap: '3px' }}>
                          {[1,2,3,4,5].map(n => <div key={n} style={{ width: '6px', height: '6px', borderRadius: '50%', background: n <= r.thrill ? activeZoneData.color : 'rgba(255,255,255,0.1)' }} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '1.5rem', fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>● Thrill Level Indicator</div>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: '3rem', color: 'rgba(255,255,255,0.05)', marginBottom: '1rem' }}>6</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>{isMobile ? 'Tap' : 'Hover'} a zone<br />to explore</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature 2: Ride Counter */}
        <div ref={rideCountRef} style={{ marginBottom: isMobile ? '5rem' : '8rem' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>Every Attraction, Counted</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3vw, 42px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>27 Reasons to Stay All Day</h3>
            <div style={{ fontFamily: 'Playfair Display', fontSize: '2rem', color: 'var(--color-gold)', fontWeight: 700 }}>{ridesRevealed}<span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.2)' }}>/27</span></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
            {allRides.map((r, i) => (
              <div key={i} style={{ background: i < ridesRevealed ? '#080808' : '#050505', padding: isMobile ? '1rem 1.2rem' : '1.2rem 1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.4s ease', borderLeft: i < ridesRevealed ? `2px solid ${i % 5 === 0 ? '#ff6600' : i % 5 === 1 ? '#ffcc00' : i % 5 === 2 ? '#00aa44' : i % 5 === 3 ? '#44aaff' : '#ff88bb'}` : '2px solid transparent', opacity: i < ridesRevealed ? 1 : 0.2 }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: isMobile ? '0.78rem' : '0.85rem', color: i < ridesRevealed ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)', fontWeight: 300, transition: 'color 0.4s ease' }}>{r.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.56rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: i < ridesRevealed ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)', marginTop: '0.3rem', transition: 'color 0.4s ease' }}>{r.zone}</div>
                </div>
                {!isMobile && (
                  <div style={{ fontFamily: 'Inter', fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: i < ridesRevealed ? 'rgba(255,255,255,0.3)' : 'transparent', border: `1px solid ${i < ridesRevealed ? 'rgba(255,255,255,0.08)' : 'transparent'}`, padding: '0.25rem 0.6rem', transition: 'all 0.4s ease' }}>{r.type}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feature 3: MoA vs Online */}
        <div ref={compRef}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>The Retail Truth</div>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '3rem' }}>
            MoA vs. Online Retail —<span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}> no contest.</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 100px 100px' : '1fr 160px 160px', gap: '0', marginBottom: '1px', padding: isMobile ? '0.8rem 1rem' : '1rem 2rem', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Metric</div>
            <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>Online</div>
            <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', textAlign: 'center' }}>MoA</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {comparison.map((c, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 100px 100px' : '1fr 160px 160px', gap: '0', padding: isMobile ? '1rem' : '1.4rem 2rem', background: '#080808', opacity: compVisible ? 1 : 0, transform: compVisible ? 'none' : 'translateY(20px)', transition: `all 0.6s ease ${i * 0.12}s` }}>
                <div style={{ fontFamily: 'Inter', fontSize: isMobile ? '0.72rem' : '0.82rem', color: 'rgba(255,255,255,0.45)', fontWeight: 300, display: 'flex', alignItems: 'center' }}>{c.label}</div>
                <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Playfair Display', fontSize: isMobile ? '1rem' : '1.3rem', color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>{c.online}</span>
                </div>
                <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <span style={{ fontFamily: 'Playfair Display', fontSize: isMobile ? '1rem' : '1.4rem', color: 'var(--color-gold)', fontWeight: 700 }}>{c.moa}</span>
                  <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '0.8rem' }}>↑</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', padding: isMobile ? '1rem' : '1.5rem 2rem', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)', fontFamily: 'Inter', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, fontWeight: 300 }}>
            Source: MoA Retail Analytics Report 2024 · Nielsen Retail Study · Comscore Digital Commerce
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.08; } }`}</style>
    </section>
  )
}