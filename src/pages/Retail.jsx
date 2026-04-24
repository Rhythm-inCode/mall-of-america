import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import retailBg from '../assets/videos/retail-bg.mp4'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const tenants = [
  { name: 'Nike', category: 'Sportswear', detail: 'Flagship store — 3 floors of exclusive drops, personalization studios, and member-only launches.' },
  { name: 'Apple', category: 'Technology', detail: 'Full-format Apple Store with Today at Apple sessions, Genius Bar, and highest-traffic location in the Midwest.' },
  { name: 'Lego', category: 'Experience Retail', detail: 'One of only 10 certified LEGO flagship stores globally. Interactive builds, custom sets, and family destination.' },
  { name: 'H&M', category: 'Fast Fashion', detail: 'Multi-level format with dedicated sustainability corner and collaborations with global designers.' },
  { name: 'Zara', category: 'Fashion', detail: "Premium format store — largest Zara in the region with full women's, men's, and kids collections." },
  { name: 'Nordstrom', category: 'Department Store', detail: 'Anchor tenant with full luxury and contemporary departments, personal styling, and alterations.' },
]

export default function Retail() {
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const sectionRef = useRef(null)
  const [activeModal, setActiveModal] = useState(null)
  const [hoveredTenant, setHoveredTenant] = useState(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const imageWrapRef = useRef(null)
  const bigNumRef = useRef(null)
  const headlineRef = useRef(null)
  const taglineRef = useRef(null)
  const tenantsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bigNumRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
      )
      gsap.fromTo(imageWrapRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.out', delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
      )
      gsap.fromTo([headlineRef.current, taglineRef.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power3.out', delay: 0.4, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
      )
      gsap.fromTo(
        tenantsRef.current ? Array.from(tenantsRef.current.children) : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: tenantsRef.current, start: 'top 80%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      minHeight: '100vh', width: '100%', background: '#080808',
      position: 'relative', overflow: 'hidden',
      paddingTop: isMobile ? '5rem' : '10rem', paddingBottom: '8rem',
    }}>
      {/* Rotated label — desktop only */}
      {!isMobileOrTablet && (
        <div style={{
          position: 'absolute', left: '-2.5rem', top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.4em',
          textTransform: 'uppercase', color: 'rgba(201,168,76,0.3)',
          whiteSpace: 'nowrap', zIndex: 1,
        }}>02 — Retail Environment</div>
      )}

      {/* Giant bg number */}
      <div ref={bigNumRef} style={{
        position: 'absolute', top: '5rem', left: '-2rem',
        fontFamily: 'Playfair Display',
        fontSize: isMobile ? 'clamp(120px, 40vw, 200px)' : 'clamp(200px, 28vw, 380px)',
        fontWeight: 700, lineHeight: 1,
        color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.05em',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>500</div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '0 1.5rem' : '0 5rem', position: 'relative', zIndex: 2 }}>

        {/* Hero layout: side by side on desktop, stacked on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobileOrTablet ? '1fr' : '55% 45%',
          gap: '0', minHeight: isMobileOrTablet ? 'auto' : '70vh', alignItems: 'stretch',
        }}>
          {/* Video side */}
          <div ref={imageWrapRef} style={{ position: 'relative', overflow: 'hidden', clipPath: 'inset(100% 0% 0% 0%)' }}>
            {!videoLoaded && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: 'linear-gradient(135deg, #0f0f0f, #080808, #0f0f0f)',
                backgroundSize: '200% 200%', animation: 'shimmer 2s ease infinite',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,0.4)', animation: 'loadBar 1.5s ease infinite' }} />
                  <span style={{ fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)' }}>Loading</span>
                </div>
              </div>
            )}
            <video autoPlay muted loop playsInline onCanPlay={() => setVideoLoaded(true)} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'brightness(0.6) contrast(1.1) saturate(0.8)',
              display: 'block', minHeight: isMobile ? '280px' : '600px',
              opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.8s ease',
            }}>
              <source src={retailBg} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 60%, #080808 100%)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--color-gold), transparent 70%)' }} />
            <div style={{
              position: 'absolute', bottom: isMobile ? '1.5rem' : '3rem', left: isMobile ? '1.5rem' : '3rem',
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(201,168,76,0.2)', padding: isMobile ? '1rem 1.5rem' : '1.5rem 2rem',
            }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: isMobile ? '2rem' : '3rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>$2B+</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginTop: '0.3rem' }}>Annual retail sales</div>
            </div>
          </div>

          {/* Text side */}
          <div style={{
            padding: isMobile ? '2rem 0' : '4rem 0 4rem 5rem',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            borderLeft: isMobileOrTablet ? 'none' : '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '2.5rem', opacity: 0.8 }}>
              The Retail Standard
            </div>
            <h2 ref={headlineRef} style={{
              fontFamily: 'Playfair Display', fontSize: 'clamp(32px, 5vw, 78px)',
              fontWeight: 700, lineHeight: 0.95, color: '#ffffff',
              letterSpacing: '-0.03em', marginBottom: '2rem', opacity: 0,
            }}>
              Where the<br />world's best<br />
              <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>brands perform.</span>
            </h2>
            <p ref={taglineRef} style={{
              fontFamily: 'Inter', fontSize: 'clamp(13px, 1.1vw, 15px)',
              color: 'rgba(255,255,255,0.38)', fontWeight: 300, lineHeight: 2,
              letterSpacing: '0.03em', maxWidth: '360px', marginBottom: '3rem', opacity: 0,
            }}>
              500+ stores. One address. The brands that choose MoA don't just open a location — they claim a cultural position that no other retail address can offer.
            </p>
            <div style={{ display: 'flex', gap: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[['520+', 'Stores'], ['40M', 'Annual Visitors']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: '2.4rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginTop: '0.4rem' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tenants */}
        <div style={{ marginTop: isMobile ? '4rem' : '7rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Featured Tenants</span>
            <span style={{ fontFamily: 'Playfair Display', fontSize: '0.85rem', color: 'rgba(201,168,76,0.4)', fontStyle: 'italic' }}>click to explore</span>
          </div>
          <div ref={tenantsRef} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {tenants.map((t, i) => (
              <div key={i} onClick={() => setActiveModal(t)}
                onMouseEnter={() => setHoveredTenant(i)}
                onMouseLeave={() => setHoveredTenant(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '40px 1fr auto' : '60px 1fr auto',
                  alignItems: 'center', gap: isMobile ? '1rem' : '2rem',
                  padding: '1.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer', transition: 'all 0.3s ease', opacity: 0,
                }}>
                <div style={{
                  fontFamily: 'Playfair Display',
                  fontSize: hoveredTenant === i ? '1.5rem' : '0.9rem',
                  color: hoveredTenant === i ? 'var(--color-gold)' : 'rgba(255,255,255,0.12)',
                  fontWeight: 700, transition: 'all 0.3s ease',
                }}>0{i + 1}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: isMobile ? '0.8rem' : '1.5rem', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                  <span style={{
                    fontFamily: 'Playfair Display',
                    fontSize: hoveredTenant === i ? 'clamp(18px, 2.5vw, 32px)' : 'clamp(16px, 2vw, 26px)',
                    fontWeight: 600, color: hoveredTenant === i ? '#ffffff' : 'rgba(255,255,255,0.65)',
                    transition: 'all 0.3s ease',
                  }}>{t.name}</span>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: hoveredTenant === i ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.18)',
                    transition: 'color 0.3s ease',
                  }}>{t.category}</span>
                </div>
                <div style={{
                  color: hoveredTenant === i ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)',
                  transform: hoveredTenant === i ? 'translateX(6px)' : 'translateX(0)',
                  transition: 'all 0.3s ease',
                }}>→</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div onClick={() => setActiveModal(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(16px)', zIndex: 9000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#0d0d0d', border: '1px solid rgba(201,168,76,0.15)',
            padding: isMobile ? '2rem' : '4rem', maxWidth: '520px', width: '100%', position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 0, left: isMobile ? '2rem' : '4rem', right: isMobile ? '2rem' : '4rem', height: '1px', background: 'linear-gradient(90deg, var(--color-gold), transparent)' }} />
            <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem', opacity: 0.7 }}>{activeModal.category}</div>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: isMobile ? '2rem' : '3rem', fontWeight: 700, color: '#ffffff', lineHeight: 1, marginBottom: '1.5rem' }}>{activeModal.name}</h3>
            <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, fontWeight: 300 }}>{activeModal.detail}</p>
            <button onClick={() => setActiveModal(null)} style={{
              marginTop: '2.5rem', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)',
              padding: '0.7rem 1.6rem', fontFamily: 'Inter', fontSize: '0.68rem',
              letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = 'var(--color-gold)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
            >Close</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes loadBar { 0%,100%{width:40px;opacity:0.3} 50%{width:80px;opacity:0.8} }
      `}</style>
    </section>
  )
}