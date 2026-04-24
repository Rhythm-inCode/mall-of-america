import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import diningBg from '../assets/videos/dining-bg.mp4'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const restaurants = [
  { name: 'The Cove', type: 'Seafood & Raw Bar', desc: 'Coastal fine dining — oysters, crudo, and whole-fish preparations in a candlelit setting.', tag: 'Fine Dining' },
  { name: 'Nori', type: 'Japanese Omakase', desc: 'Chef-driven omakase experience. 12-seat counter. Reservations required months in advance.', tag: 'Exclusive' },
  { name: 'Brick & Ember', type: 'Wood-fired American', desc: 'Open-hearth kitchen, dry-aged steaks, artisan cocktails. The after-shopping destination.', tag: 'Casual Luxury' },
  { name: 'Café 1992', type: 'All-Day European', desc: "Croissants at 7am, espresso martinis at midnight. MoA's most-Instagrammed interior.", tag: 'All Day' },
  { name: 'Spice Route', type: 'Pan-Asian', desc: 'From dim sum to Thai curry — a culinary journey across Asia under one roof.', tag: 'Casual' },
  { name: 'The Rooftop', type: 'Cocktails & Small Plates', desc: "Minnesota's most enviable perch. Seasonal menus, craft cocktails, panoramic views.", tag: 'Signature' },
]

export default function Dining() {
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const headlineRef = useRef(null)
  const listRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      )
      gsap.fromTo(headlineRef.current, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
      gsap.fromTo(listRef.current ? Array.from(listRef.current.children) : [], { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: listRef.current, start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      minHeight: '100vh', width: '100%', background: '#070603',
      position: 'relative', overflow: 'hidden',
      paddingTop: isMobile ? '5rem' : '10rem', paddingBottom: '8rem',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(160,80,20,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Rotated label — desktop only */}
      {!isMobileOrTablet && (
        <div style={{ position: 'absolute', left: '-2.5rem', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.25)', whiteSpace: 'nowrap', zIndex: 1 }}>
          04 — Dining & Lifestyle
        </div>
      )}

      {/* Giant bg word */}
      <div style={{
        position: 'absolute', right: '-3rem', top: '5rem',
        fontFamily: 'Playfair Display',
        fontSize: isMobile ? 'clamp(80px, 30vw, 150px)' : 'clamp(150px, 22vw, 300px)',
        fontWeight: 700, lineHeight: 1, color: 'rgba(160,80,20,0.04)',
        letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>DINE</div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '0 1.5rem' : '0 5rem', position: 'relative', zIndex: 2 }}>

        {/* Top layout — stacked on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobileOrTablet ? '1fr' : '45% 55%',
          gap: '0', marginBottom: isMobile ? '4rem' : '7rem', alignItems: 'stretch',
        }}>
          {/* Left — text */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            paddingRight: isMobileOrTablet ? '0' : '5rem',
            borderRight: isMobileOrTablet ? 'none' : '1px solid rgba(255,255,255,0.04)',
            paddingBottom: isMobileOrTablet ? '2rem' : '0',
          }}>
            <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '2rem' }}>
              Flavors of America
            </div>
            <h2 ref={headlineRef} style={{
              fontFamily: 'Playfair Display', fontSize: 'clamp(32px, 5vw, 72px)',
              fontWeight: 700, lineHeight: 0.95, color: '#ffffff',
              letterSpacing: '-0.025em', marginBottom: '2rem', opacity: 0,
            }}>
              Flavors that<br />make visitors<br />
              <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>stay longer.</span>
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'var(--color-gold)', opacity: 0.5, marginBottom: '2rem' }} />
            <p style={{ fontFamily: 'Inter', fontSize: '0.88rem', color: 'rgba(255,255,255,0.32)', lineHeight: 2, fontWeight: 300, marginBottom: '3rem' }}>
              50+ chef-driven concepts. From $8 tacos to $180 omakase. MoA's dining floor isn't a food court — it's a reason people plan their entire day around a visit.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[['50+', 'Dining Concepts'], ['4.2★', 'Average Rating'], ['3hrs+', 'Average Dwell Time']].map(([n, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontFamily: 'Playfair Display', fontSize: '2rem', fontWeight: 700, color: '#fff', lineHeight: 1, minWidth: '80px' }}>{n}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — video */}
          <div ref={imageRef} style={{ clipPath: 'inset(0% 100% 0% 0%)', paddingLeft: isMobileOrTablet ? '0' : '4rem' }}>
            <div style={{ position: 'relative', height: '100%', minHeight: isMobile ? '250px' : '560px', overflow: 'hidden' }}>
              {!videoLoaded && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: '#070603', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(201,168,76,0.4)', animation: `dotPulse 1.2s ease ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <video autoPlay muted loop playsInline onCanPlay={() => setVideoLoaded(true)} style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'brightness(0.55) contrast(1.1) saturate(0.75) sepia(0.12)',
                display: 'block', opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.8s ease',
              }}>
                <source src={diningBg} type="video/mp4" />
              </video>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(7,6,3,0.85) 100%)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', fontFamily: 'Playfair Display', fontSize: '1rem', color: 'rgba(201,168,76,0.6)', fontStyle: 'italic' }}>50+ culinary concepts</div>
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--color-gold), transparent)', opacity: 0.3 }} />
            </div>
          </div>
        </div>

        {/* Restaurant list */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '1.2rem' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>Featured Concepts</span>
            <span style={{ fontFamily: 'Playfair Display', fontSize: '0.85rem', color: 'rgba(201,168,76,0.35)', fontStyle: 'italic' }}>{isMobile ? 'tap' : 'hover'} to discover</span>
          </div>
          <div ref={listRef} style={{ display: 'flex', flexDirection: 'column' }}>
            {restaurants.map((r, i) => (
              <div key={i}
                onMouseEnter={() => !isMobile && setHoveredIndex(i)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                onClick={() => isMobile && setHoveredIndex(hoveredIndex === i ? null : i)}
                style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', padding: '1.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'default', transition: 'background 0.3s ease', opacity: 0 }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: isMobile ? '0.8rem' : '1.5rem', marginBottom: '0.5rem', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                    <span style={{
                      fontFamily: 'Playfair Display',
                      fontSize: hoveredIndex === i ? 'clamp(20px, 2.5vw, 30px)' : 'clamp(16px, 2vw, 24px)',
                      fontWeight: 600, color: hoveredIndex === i ? '#fff' : 'rgba(255,255,255,0.6)', transition: 'all 0.35s ease',
                    }}>{r.name}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: hoveredIndex === i ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.18)', transition: 'color 0.3s ease' }}>{r.type}</span>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.83rem', color: 'rgba(255,255,255,0.32)', lineHeight: 1.7, fontWeight: 300, maxHeight: hoveredIndex === i ? '80px' : '0', overflow: 'hidden', opacity: hoveredIndex === i ? 1 : 0, transition: 'max-height 0.4s ease, opacity 0.3s ease' }}>{r.desc}</div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  fontFamily: 'Inter', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: hoveredIndex === i ? 'var(--color-gold)' : 'rgba(201,168,76,0.25)',
                  border: `1px solid ${hoveredIndex === i ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`,
                  padding: '0.35rem 0.8rem', transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap', alignSelf: 'flex-start', marginTop: '0.4rem',
                }}>{r.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes dotPulse { 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:0.8;transform:scale(1.2)} }`}</style>
    </section>
  )
}