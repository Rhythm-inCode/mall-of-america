import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import overviewBg from '../assets/images/ai-overview.jpg'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target, duration = 2, shouldStart = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    let start = 0
    const step = target / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [shouldStart, target, duration])
  return count
}

const stats = [
  { number: 40, suffix: 'M+', label: 'Annual Visitors', sub: 'More than the entire population of Canada visits MoA each year', icon: '◈' },
  { number: 500, suffix: '+', label: 'Stores & Brands', sub: 'Luxury flagships, global chains, and local icons — all under one roof', icon: '◉' },
  { number: 5, suffix: '.6M sqft', label: 'Total Space', sub: 'Largest retail & entertainment complex in the United States', icon: '◐' },
]

export default function Overview() {
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const eyebrowRef = useRef(null)
  const statsRef = useRef(null)
  const badgeRef = useRef(null)
  const imgRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  const count0 = useCountUp(40, 2, statsVisible)
  const count1 = useCountUp(500, 2, statsVisible)
  const count2 = useCountUp(5, 1.5, statsVisible)
  const counts = [count0, count1, count2]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([eyebrowRef.current, headlineRef.current, subRef.current, badgeRef.current], { opacity: 0, y: 50 })
      gsap.set(imgRef.current, { opacity: 0, scale: 1.05 })
      gsap.set(statsRef.current?.children ? Array.from(statsRef.current.children) : [], { opacity: 0, y: 60 })

      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 80%', once: true,
        onEnter: () => {
          gsap.timeline({ defaults: { ease: 'power3.out' } })
            .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 })
            .to(imgRef.current, { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, '-=0.6')
            .to(headlineRef.current, { opacity: 1, y: 0, duration: 1.1 }, '-=0.8')
            .to(subRef.current, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
            .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        },
      })
      ScrollTrigger.create({
        trigger: statsRef.current, start: 'top 75%', once: true,
        onEnter: () => {
          gsap.to(Array.from(statsRef.current.children), { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' })
          setStatsVisible(true)
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      minHeight: '100vh', width: '100%', background: '#0a0a0a',
      position: 'relative', overflow: 'hidden',
      paddingTop: isMobile ? '6rem' : '8rem',
      paddingBottom: '8rem',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 70% 50% at 85% 20%, rgba(201,168,76,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 10% 80%, rgba(201,168,76,0.04) 0%, transparent 50%)`,
        pointerEvents: 'none',
      }} />
      {!isMobile && (
        <div style={{
          position: 'absolute', left: '4rem', top: '10%', bottom: '10%', width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: isMobile ? '0 1.5rem' : '0 4rem', position: 'relative', zIndex: 2 }}>

        <div ref={eyebrowRef} style={{
          fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.35em',
          textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.5rem', opacity: 0,
        }}>Why Mall of America</div>

        {/* Two column → single column on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobileOrTablet ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'flex-start', marginBottom: '6rem',
        }}>
          <div>
            <h2 ref={headlineRef} style={{
              fontFamily: 'Playfair Display',
              fontSize: 'clamp(32px, 5.5vw, 82px)',
              fontWeight: 700, lineHeight: 1.0,
              color: '#ffffff', letterSpacing: '-0.02em', opacity: 0,
            }}>
              Not just a mall.{' '}
              <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>A nation's</span>
              {' '}destination.
            </h2>
            <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', margin: '2rem 0' }} />
            <div ref={imgRef} style={{ width: '100%', height: isMobile ? '200px' : '280px', overflow: 'hidden', position: 'relative', opacity: 0 }}>
              <img src={overviewBg} alt="Mall of America retail interior" style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'brightness(0.7) saturate(0.85)', transition: 'transform 0.6s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--color-gold), transparent)' }} />
            </div>
          </div>

          <div style={{ paddingTop: isMobileOrTablet ? '0' : '1rem' }}>
            <p ref={subRef} style={{
              fontFamily: 'Inter', fontSize: 'clamp(14px, 1.3vw, 18px)',
              color: 'var(--color-text-secondary)', fontWeight: 300,
              lineHeight: 1.9, letterSpacing: '0.02em', marginBottom: '2rem', opacity: 0,
            }}>
              Mall of America isn't measured in square footage — it's measured in footfall, culture, and commercial gravity. No other retail address in America commands this kind of attention, loyalty, and media presence.
            </p>
            <div ref={badgeRef} style={{
              display: 'inline-flex', alignItems: 'center', gap: '1rem',
              border: '1px solid rgba(201,168,76,0.25)', padding: '0.9rem 1.5rem',
              background: 'rgba(201,168,76,0.04)', backdropFilter: 'blur(10px)', opacity: 0,
            }}>
              <span style={{ fontFamily: 'Playfair Display', fontSize: '1.6rem', color: 'var(--color-gold)', fontWeight: 700 }}>#1</span>
              <span style={{ fontFamily: 'Inter', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.5 }}>
                Most Visited<br />Destination in the USA
              </span>
            </div>
          </div>
        </div>

        {/* Stats grid → single column on mobile */}
        <div ref={statsRef} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.5px', background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              background: '#0a0a0a', padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
              position: 'relative', overflow: 'hidden', cursor: 'default',
              transition: 'background 0.4s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, var(--color-gold), transparent)', opacity: 0.4 }} />
              <div style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--color-gold)', marginBottom: '1.5rem', textTransform: 'uppercase', opacity: 0.7 }}>
                {stat.icon} &nbsp; 0{i + 1}
              </div>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(44px, 5.5vw, 76px)', fontWeight: 700, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '0.3rem' }}>
                {counts[i]}
                <span style={{ fontSize: 'clamp(18px, 2.5vw, 34px)', color: 'var(--color-gold)', fontStyle: 'italic' }}>{stat.suffix}</span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.2rem' }}>{stat.label}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, fontWeight: 300, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '1rem' : '0',
          marginTop: '4rem', paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
            Source: MoA Annual Reports · Comscore · Tourism Boards
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '1px', background: 'var(--color-gold)', opacity: 0.4 }} />
            <span style={{ fontFamily: 'Playfair Display', fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>Data current as of 2024</span>
          </div>
        </div>
      </div>
    </section>
  )
}