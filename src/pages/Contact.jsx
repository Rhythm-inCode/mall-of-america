import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const actionCards = [
  { id: 'leasing', title: 'Leasing Inquiry', sub: 'Open a store at MoA', icon: '◈', color: '#c9a84c', fields: ['Brand Name', 'Category', 'Desired Sqft', 'Target Opening'], cta: 'Request Leasing Package' },
  { id: 'sponsorship', title: 'Sponsorship', sub: 'Partner for events & activations', icon: '◉', color: '#88aaff', fields: ['Company Name', 'Budget Range', 'Event Type', 'Timeline'], cta: 'Request Sponsorship Deck' },
  { id: 'media', title: 'Media & Press', sub: 'Press, partnerships, collaborations', icon: '◐', color: '#ff8866', fields: ['Name', 'Organization', 'Inquiry Type', 'Message'], cta: 'Send Media Inquiry' },
]

function useTypewriter(text, speed = 40, active = false) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    setDisplayed('')
    let i = 0
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [text, active])
  return displayed
}

const placeholders = {
  'Brand Name': 'e.g. Supreme, Alo Yoga, Warby Parker...', 'Category': 'e.g. Fashion, Tech, F&B...',
  'Desired Sqft': 'e.g. 1,500 – 3,000 sqft', 'Target Opening': 'e.g. Q3 2025',
  'Company Name': 'e.g. Coca-Cola, Samsung...', 'Budget Range': 'e.g. $100K – $250K',
  'Event Type': 'e.g. Product Launch, Concert Series...', 'Timeline': 'e.g. Summer 2025',
  'Name': 'Your full name', 'Organization': 'Publication or company',
  'Inquiry Type': 'e.g. Press Visit, Partnership...', 'Message': 'Tell us what you have in mind...',
}

export default function Contact() {
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const cardsRef = useRef(null)
  const formRef = useRef(null)
  const [activeCard, setActiveCard] = useState(null)
  const [formData, setFormData] = useState({})
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const card = actionCards.find(c => c.id === activeCard)
  const headlineTyped = useTypewriter("Let's build something\nAmerica will remember.", 35, true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
      gsap.fromTo(cardsRef.current ? Array.from(cardsRef.current.children) : [], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (activeCard && formRef.current) {
      setFormData({}); setErrors({}); setSubmitted(false)
      gsap.fromTo(formRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 })
    }
  }, [activeCard])

  const validate = () => {
    if (!card) return false
    const errs = {}
    card.fields.forEach(f => { if (!formData[f] || formData[f].trim() === '') errs[f] = true })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => { if (validate()) setSubmitted(true) }

  return (
    <section ref={sectionRef} style={{ minHeight: '100vh', width: '100%', background: '#060606', overflow: 'hidden', paddingTop: isMobile ? '5rem' : '8rem', paddingBottom: '8rem', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(201,168,76,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '0 1.5rem' : '0 5rem', position: 'relative', zIndex: 2 }}>

        {/* Hero — typewriter */}
        <div ref={heroRef} style={{ marginBottom: isMobile ? '4rem' : '7rem', opacity: 0 }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '1.5rem' }}>09 — Connect</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(32px, 6vw, 88px)', fontWeight: 700, lineHeight: 1.0, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1.5rem', whiteSpace: 'pre-line', minHeight: isMobile ? '2.5em' : '2.1em' }}>
            {headlineTyped}<span style={{ color: 'var(--color-gold)', animation: 'blink 1s infinite' }}>|</span>
          </h2>
          <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', opacity: 0.5, marginBottom: '1.5rem' }} />
          <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.28)', fontWeight: 300, lineHeight: 2, maxWidth: '520px' }}>
            Whether you're ready to sign or just exploring — start the conversation. Our team responds within 24 hours.
          </p>
        </div>

        {/* Action Cards */}
        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '6rem' }}>
          {actionCards.map((c, i) => (
            <div key={c.id} onClick={() => setActiveCard(activeCard === c.id ? null : c.id)} style={{ background: activeCard === c.id ? `${c.color}08` : '#060606', padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem', cursor: 'pointer', border: activeCard === c.id ? `1px solid ${c.color}30` : '1px solid transparent', transition: 'all 0.4s ease', opacity: 0, position: 'relative' }}
              onMouseEnter={e => { if (activeCard !== c.id) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
              onMouseLeave={e => { if (activeCard !== c.id) e.currentTarget.style.background = '#060606' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: activeCard === c.id ? `linear-gradient(90deg, ${c.color}, transparent)` : 'transparent', transition: 'all 0.4s ease' }} />
              <div style={{ fontFamily: 'Inter', fontSize: '1.5rem', color: c.color, marginBottom: '1.5rem', opacity: 0.8 }}>{c.icon}</div>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 700, color: activeCard === c.id ? '#fff' : 'rgba(255,255,255,0.7)', marginBottom: '0.5rem', transition: 'color 0.3s ease' }}>{c.title}</h3>
              <div style={{ fontFamily: 'Inter', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: activeCard === c.id ? c.color : 'rgba(255,255,255,0.25)', marginBottom: '1.5rem', transition: 'color 0.3s ease' }}>{c.sub}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: activeCard === c.id ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)', lineHeight: 1.7, fontWeight: 300 }}>
                {activeCard === c.id ? '✓ Selected — fill the form below' : 'Click to open inquiry form'}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Form */}
        {activeCard && card && (
          <div ref={formRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ width: '30px', height: '1px', background: card.color }} />
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{card.title} — Inquiry Form</h3>
            </div>

            {submitted ? (
              <div style={{ padding: isMobile ? '2rem' : '4rem', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display', fontSize: '3rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>✓</div>
                <h4 style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>We've received your inquiry.</h4>
                <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, fontWeight: 300 }}>Our partnerships team will respond within 24 hours.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  {card.fields.map(field => (
                    <div key={field} style={{ gridColumn: field === 'Message' ? '1 / -1' : 'auto' }}>
                      <label style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: errors[field] ? '#ff8866' : focused === field ? card.color : 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '0.6rem', transition: 'color 0.3s ease' }}>
                        {field} {errors[field] && '— required'}
                      </label>
                      {field === 'Message' ? (
                        <textarea placeholder={placeholders[field]} value={formData[field] || ''} onChange={e => setFormData({ ...formData, [field]: e.target.value })} onFocus={() => { setFocused(field); setErrors({ ...errors, [field]: false }) }} onBlur={() => setFocused(null)} rows={4} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: `1px solid ${errors[field] ? '#ff886650' : focused === field ? card.color + '50' : 'rgba(255,255,255,0.07)'}`, color: '#fff', padding: '1rem 1.2rem', fontFamily: 'Inter', fontSize: '0.85rem', fontWeight: 300, outline: 'none', resize: 'none', transition: 'border-color 0.3s ease', lineHeight: 1.7 }} />
                      ) : (
                        <input type="text" placeholder={placeholders[field]} value={formData[field] || ''} onChange={e => setFormData({ ...formData, [field]: e.target.value })} onFocus={() => { setFocused(field); setErrors({ ...errors, [field]: false }) }} onBlur={() => setFocused(null)} style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: `1px solid ${errors[field] ? '#ff886650' : focused === field ? card.color + '60' : 'rgba(255,255,255,0.07)'}`, color: '#fff', padding: '1rem 1.2rem', fontFamily: 'Inter', fontSize: '0.85rem', fontWeight: 300, outline: 'none', transition: 'border-color 0.3s ease' }} />
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <button onClick={handleSubmit} style={{ background: card.color, color: '#000', fontFamily: 'Inter', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, padding: '1.1rem 2.5rem', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >{card.cta} →</button>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.68rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>Response within 24 hours</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact info strip */}
        <div style={{ marginTop: '7rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '2rem' : '3rem' }}>
          {[
            { label: 'Leasing Office', detail: 'leasing@mallofamerica.com', sub: 'Mon–Fri, 9am–6pm CST' },
            { label: 'Partnerships', detail: 'partners@mallofamerica.com', sub: 'Sponsorships & Brand Activations' },
            { label: 'Visit Us', detail: '60 East Broadway', sub: 'Bloomington, MN 55425' },
          ].map((info, i) => (
            <div key={i} style={{ paddingLeft: (!isMobile && i > 0) ? '3rem' : '0', borderLeft: (!isMobile && i > 0) ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '0.6rem' }}>{info.label}</div>
              <div style={{ fontFamily: 'Playfair Display', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.3rem' }}>{info.detail}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>{info.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.15); }
        input, textarea { box-sizing: border-box; }
      `}</style>
    </section>
  )
}