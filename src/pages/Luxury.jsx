import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import luxuryBg from '../assets/videos/luxury-bg.mp4'
import aiLuxury from '../assets/images/ai-luxury.jpg'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { num: '01', title: 'Curated Access', body: "Only brands that meet MoA's exclusivity criteria earn placement in the Luxury Wing. Your co-tenants define your company." },
  { num: '02', title: 'Premium Dwell Time', body: 'Luxury wing visitors spend 2.4x longer in-store than standard retail floors. They arrive with intent.' },
  { num: '03', title: 'High-Net Demographics', body: '$180K+ average household income. 68% are repeat visitors. These are your customers.' },
]

export default function Luxury() {
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const overlayTextRef = useRef(null)
  const pillarsRef = useRef(null)
  const quoteRef = useRef(null)
  const lineRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      gsap.fromTo(overlayTextRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.inOut', delay: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      gsap.fromTo(quoteRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', once: true } })
      gsap.fromTo(pillarsRef.current ? Array.from(pillarsRef.current.children) : [], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ minHeight: '100vh', width: '100%', background: '#050505', position: 'relative', overflow: 'hidden', paddingBottom: '8rem' }}>

      {/* Hero video */}
      <div style={{ position: 'relative', width: '100%', height: isMobile ? '60vh' : '85vh', overflow: 'hidden' }}>
        {!videoLoaded && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.5), transparent)', animation: 'loadPulse 1.5s ease infinite' }} />
              <span style={{ fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>The Luxury Wing</span>
            </div>
          </div>
        )}

        <video ref={imageRef} autoPlay muted loop playsInline onCanPlay={() => setVideoLoaded(true)} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: 'brightness(0.45) contrast(1.15) saturate(0.65)',
          transformOrigin: 'center center', opacity: 0,
        }}>
          <source src={luxuryBg} type="video/mp4" />
        </video>

        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, transparent 30%, transparent 50%, rgba(5,5,5,0.95) 100%), linear-gradient(to right, rgba(5,5,5,0.5) 0%, transparent 40%)` }} />

        <div style={{ position: 'absolute', top: '3rem', left: isMobile ? '1.5rem' : '5rem', fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', zIndex: 10 }}>
          03 — The Luxury Wing
        </div>

        {/* Floating stats — hidden on mobile, shown below instead */}
        {!isMobileOrTablet && (
          <div style={{ position: 'absolute', right: '5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {[['$180K+', 'Avg HH Income'], ['2.4×', 'Longer Dwell Time'], ['68%', 'Repeat Visitors']].map(([n, l]) => (
              <div key={l} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', borderLeft: '2px solid rgba(201,168,76,0.4)', padding: '1.2rem 1.8rem', minWidth: '180px' }}>
                <div style={{ fontFamily: 'Playfair Display', fontSize: '2rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginTop: '0.3rem' }}>{l}</div>
              </div>
            ))}
          </div>
        )}

        <div ref={overlayTextRef} style={{ position: 'absolute', bottom: isMobile ? '2rem' : '5rem', left: isMobile ? '1.5rem' : '5rem', zIndex: 10, maxWidth: isMobile ? '90%' : '700px', opacity: 0 }}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(32px, 7vw, 100px)', fontWeight: 700, lineHeight: 0.92, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Where exclusivity<br />
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>finds its audience.</span>
          </h2>
          <div ref={lineRef} style={{ width: '120px', height: '1px', background: 'linear-gradient(90deg, var(--color-gold), rgba(201,168,76,0.2))', transformOrigin: 'left', transform: 'scaleX(0)' }} />
        </div>
      </div>

      {/* Mobile stats strip */}
      {isMobileOrTablet && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {[['$180K+', 'Avg HH Income'], ['2.4×', 'Dwell Time'], ['68%', 'Repeat Visitors']].map(([n, l], i) => (
            <div key={i} style={{ padding: '1.5rem 1rem', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(18px, 4vw, 28px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginTop: '0.3rem' }}>{l}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '0 1.5rem' : '0 5rem' }}>

        {/* Quote — stacked on mobile */}
        <div ref={quoteRef} style={{
          padding: isMobile ? '3rem 0 2rem' : '5rem 0 4rem',
          display: 'grid',
          gridTemplateColumns: isMobileOrTablet ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2rem' : '6rem', alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '5rem', opacity: 0,
        }}>
          <div>
            <div style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(16px, 2.8vw, 36px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              "The Luxury Wing isn't a concession to prestige — it's the reason prestige brands choose to be here."
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>Retail Industry Report, 2024</div>
          </div>
          <div style={{ paddingLeft: isMobileOrTablet ? '0' : '4rem', borderLeft: isMobileOrTablet ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.32)', lineHeight: 1.95, fontWeight: 300 }}>
              Placement in the MoA Luxury Wing is not a lease — it's a curatorial decision. We protect the integrity of the wing so every brand that enters benefits from the collective prestige of its neighbors.
            </p>
          </div>
        </div>

        {/* Pillars — stacked on mobile */}
        <div ref={pillarsRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '2.5rem' : '4rem' }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ opacity: 0 }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--color-gold)', opacity: 0.5, marginBottom: '2rem' }} />
              <div style={{ fontFamily: 'Playfair Display', fontSize: '4rem', fontWeight: 700, color: 'rgba(201,168,76,0.08)', lineHeight: 1, marginBottom: '0.5rem' }}>{p.num}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', fontWeight: 500 }}>{p.title}</div>
              <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(255,255,255,0.28)', lineHeight: 1.85, fontWeight: 300 }}>{p.body}</p>
            </div>
          ))}
        </div>

        {/* AI-generated luxury wing visual */}
        <div style={{
          marginTop: '5rem', overflow: 'hidden', position: 'relative',
          height: isMobile ? '220px' : '360px',
        }}>
          <img src={aiLuxury} alt="Luxury Wing — AI Rendering" style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.6) saturate(0.75) contrast(1.1)',
            transition: 'transform 0.8s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.6) 0%, transparent 40%, transparent 60%, rgba(5,5,5,0.6) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '1.5rem', right: '2rem', fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
            AI-rendered — Luxury Wing concept
          </div>
        </div>

        <div style={{
          marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '1.5rem' : '0',
        }}>
          <div>
            <div style={{ fontFamily: 'Playfair Display', fontSize: '1.1rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginBottom: '0.4rem' }}>Limited slots available annually.</div>
            <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>Luxury Wing placement enquiries</div>
          </div>
          <a href="#/leasing" style={{
            fontFamily: 'Inter', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--color-gold)', textDecoration: 'none', padding: '0.9rem 2rem',
            border: '1px solid rgba(201,168,76,0.3)', transition: 'all 0.3s ease', display: 'inline-block',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = 'var(--color-gold)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)' }}
          >Inquire about leasing →</a>
        </div>
      </div>

      <style>{`@keyframes loadPulse { 0%,100%{opacity:0.2;transform:scaleY(0.7)} 50%{opacity:0.9;transform:scaleY(1.3)} }`}</style>
    </section>
  )
}