import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useResponsive } from '../hooks/useResponsive'


const introBg = '/videos/intro-bg.mp4'
const beats = [
  { number: '40M+', label: 'visitors every year' },
  { number: '500+', label: 'brands. one address.' },
  { number: '#1', label: 'most visited in America' },
]

export default function Intro() {
  const navigate = useNavigate()
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const [stage, setStage] = useState(1)
  const [beatIndex, setBeatIndex] = useState(0)
  const [showHeadline, setShowHeadline] = useState(false)
  const hasNavigated = useRef(false)

  const containerRef = useRef(null)
  const beatRef = useRef(null)
  const beatNumRef = useRef(null)
  const beatLabelRef = useRef(null)
  const headlineRef = useRef(null)
  const goldLineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const stage2Ref = useRef(null)
  const videoRef = useRef(null)
  const skipRef = useRef(null)

  const goToOverview = () => {
    if (hasNavigated.current) return
    hasNavigated.current = true
    gsap.to(stage2Ref.current, {
      opacity: 0, duration: 0.7, ease: 'power2.inOut',
      onComplete: () => navigate('/overview'),
    })
  }

  const handleEnter = () => {
    gsap.to(containerRef.current, {
      opacity: 0, duration: 0.8, ease: 'power2.inOut',
      onComplete: () => setStage(2),
    })
  }

  const animateBeat = () => {
    if (!beatNumRef.current) return
    gsap.set([beatNumRef.current, beatLabelRef.current], { opacity: 0, y: 30 })
    gsap.to(beatNumRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
    gsap.to(beatLabelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const t1 = setTimeout(() => animateBeat(0), 400)
    const t2 = setTimeout(() => {
      gsap.to([beatNumRef.current, beatLabelRef.current], {
        opacity: 0, y: -20, duration: 0.5, ease: 'power2.in',
        onComplete: () => { setBeatIndex(1); animateBeat(1) }
      })
    }, 2200)
    const t3 = setTimeout(() => {
      gsap.to([beatNumRef.current, beatLabelRef.current], {
        opacity: 0, y: -20, duration: 0.5, ease: 'power2.in',
        onComplete: () => { setBeatIndex(2); animateBeat(2) }
      })
    }, 4200)
    const t4 = setTimeout(() => {
      gsap.to(beatRef.current, {
        opacity: 0, duration: 0.7, ease: 'power2.in',
        onComplete: () => setShowHeadline(true),
      })
    }, 6000)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!showHeadline) return
    gsap.set([headlineRef.current, goldLineRef.current, subRef.current, ctaRef.current], { opacity: 0, y: 40 })
    gsap.set(goldLineRef.current, { scaleX: 0, transformOrigin: 'left' })
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .to(headlineRef.current, { opacity: 1, y: 0, duration: 1.2 }, 0.1)
      .to(goldLineRef.current, { opacity: 1, y: 0, scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.6)
      .to(subRef.current, { opacity: 1, y: 0, duration: 1 }, 0.9)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.3)
  }, [showHeadline])

  useEffect(() => {
    if (stage !== 2) return
    gsap.set(stage2Ref.current, { opacity: 0 })
    gsap.set(skipRef.current, { opacity: 0, y: 8 })
    gsap.to(stage2Ref.current, { opacity: 1, duration: 0.9, ease: 'power2.inOut' })
    gsap.to(skipRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 1.8, ease: 'power2.out' })
    if (videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.play() }
  }, [stage])

  return (
    <>
      <style>{`nav { display: none !important; }`}</style>

      {stage === 1 && (
        <div ref={containerRef} style={{
          position: 'fixed', inset: 0, background: '#050505',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            pointerEvents: 'none', opacity: 0.6,
          }} />

          {/* Corner marks — hide on mobile */}
          {!isMobile && [
            { top: '2.5rem', left: '2.5rem', borderTop: '1px solid rgba(201,168,76,0.3)', borderLeft: '1px solid rgba(201,168,76,0.3)' },
            { top: '2.5rem', right: '2.5rem', borderTop: '1px solid rgba(201,168,76,0.3)', borderRight: '1px solid rgba(201,168,76,0.3)' },
            { bottom: '2.5rem', left: '2.5rem', borderBottom: '1px solid rgba(201,168,76,0.3)', borderLeft: '1px solid rgba(201,168,76,0.3)' },
            { bottom: '2.5rem', right: '2.5rem', borderBottom: '1px solid rgba(201,168,76,0.3)', borderRight: '1px solid rgba(201,168,76,0.3)' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: '40px', height: '40px', zIndex: 3, ...s }} />
          ))}

          <div style={{
            position: 'absolute', top: isMobile ? '2rem' : '3rem', left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'Inter', fontSize: isMobile ? '0.5rem' : '0.6rem', letterSpacing: '0.4em',
            textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)',
            whiteSpace: 'nowrap', zIndex: 10, textAlign: 'center',
          }}>
            Mall of America · Bloomington, Minnesota
          </div>

          {!showHeadline && (
            <div ref={beatRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem' }}>
              <div ref={beatNumRef} style={{
                fontFamily: 'Playfair Display',
                fontSize: isMobile ? 'clamp(64px, 20vw, 120px)' : 'clamp(80px, 16vw, 200px)',
                fontWeight: 700, lineHeight: 1, color: '#ffffff',
                letterSpacing: '-0.03em', opacity: 0,
              }}>
                {beats[beatIndex].number}
              </div>
              <div ref={beatLabelRef} style={{
                fontFamily: 'Inter',
                fontSize: isMobile ? '0.75rem' : 'clamp(13px, 1.3vw, 16px)',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.7)', marginTop: '1rem', opacity: 0,
              }}>
                {beats[beatIndex].label}
              </div>
            </div>
          )}

          {showHeadline && (
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '860px', padding: '0 2rem' }}>
              <h1 ref={headlineRef} style={{
                fontFamily: 'Playfair Display',
                fontSize: isMobile ? 'clamp(42px, 12vw, 80px)' : 'clamp(48px, 8.5vw, 120px)',
                fontWeight: 700, lineHeight: 0.94,
                color: '#ffffff', letterSpacing: '-0.025em',
                marginBottom: '2rem', opacity: 0,
              }}>
                America's<br />
                <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Greatest</span><br />
                Stage.
              </h1>
              <div ref={goldLineRef} style={{
                width: '80px', height: '1px',
                background: 'linear-gradient(90deg, var(--color-gold), rgba(201,168,76,0.3))',
                margin: '0 auto 2rem', opacity: 0,
              }} />
              <p ref={subRef} style={{
                fontFamily: 'Inter',
                fontSize: isMobile ? '0.82rem' : 'clamp(13px, 1.3vw, 16px)',
                color: 'rgba(255,255,255,0.45)', fontWeight: 300,
                letterSpacing: '0.08em', maxWidth: '480px',
                margin: '0 auto 3rem', lineHeight: 1.9, opacity: 0,
              }}>
                The destination where 40 million people choose to spend their time — and their money.
              </p>
              <div ref={ctaRef} style={{ opacity: 0 }}>
                <button onClick={handleEnter} style={{
                  background: 'transparent', color: 'var(--color-gold)',
                  border: '1px solid rgba(201,168,76,0.5)',
                  padding: isMobile ? '0.85rem 2rem' : '1rem 3rem',
                  fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: 500,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.4s ease', backdropFilter: 'blur(4px)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = '#000' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-gold)' }}
                >
                  Enter Experience
                </button>
              </div>
            </div>
          )}

          {/* Bottom labels — hide on mobile */}
          {!isMobile && (
            <div style={{
              position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: '3rem', alignItems: 'center', zIndex: 10,
            }}>
              {['Retail', 'Dining', 'Entertainment', 'Events'].map((item, i) => (
                <span key={i} style={{
                  fontFamily: 'Inter', fontSize: '0.55rem',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.15)',
                }}>{item}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {stage === 2 && (
        <div ref={stage2Ref} style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9999, overflow: 'hidden' }}>
          <video ref={videoRef} muted playsInline onEnded={goToOverview} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
          }}>
            <source src={introBg} type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
            zIndex: 1, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: '2.5rem', left: isMobile ? '1.5rem' : '3rem',
            fontFamily: 'Playfair Display', fontSize: isMobile ? '0.95rem' : '1.1rem',
            color: 'rgba(201,168,76,0.85)', letterSpacing: '0.06em', zIndex: 10,
          }}>Mall of America</div>
          <button ref={skipRef} onClick={goToOverview} style={{
            position: 'absolute',
            bottom: isMobile ? '2rem' : '2.8rem',
            right: isMobile ? '1.5rem' : '3rem',
            zIndex: 10, background: 'transparent',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.65)',
            padding: isMobile ? '0.6rem 1.2rem' : '0.7rem 1.8rem',
            fontFamily: 'Inter', fontSize: '0.7rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s ease',
            backdropFilter: 'blur(8px)', opacity: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
          >Skip →</button>
        </div>
      )}
    </>
  )
}