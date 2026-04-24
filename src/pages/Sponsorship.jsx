import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const demographics = {
  age: [
    { label: '18-24', value: 18, color: '#c9a84c' }, { label: '25-34', value: 28, color: '#e0bb5f' },
    { label: '35-44', value: 24, color: '#a08030' }, { label: '45-54', value: 18, color: '#c9a84c' },
    { label: '55+', value: 12, color: '#7a6020' },
  ],
  income: [
    { label: '<$50K', value: 12, color: '#7a6020' }, { label: '$50-100K', value: 26, color: '#a08030' },
    { label: '$100-150K', value: 32, color: '#c9a84c' }, { label: '$150-200K', value: 18, color: '#e0bb5f' },
    { label: '$200K+', value: 12, color: '#f5d070' },
  ],
  interest: [
    { label: 'Fashion', value: 72 }, { label: 'Tech', value: 58 }, { label: 'Food & Dining', value: 81 },
    { label: 'Entertainment', value: 76 }, { label: 'Sports', value: 49 }, { label: 'Travel', value: 63 },
    { label: 'Home & Living', value: 55 },
  ],
}

const tiers = [
  { name: 'Presenting', price: '$500K+', color: '#f5d070', benefits: ['Naming rights — primary event', 'Center Court 10,000 sqft activation', 'Digital takeover — all MoA screens', 'Dedicated media campaign', 'VIP partner suite access', 'Exclusive category rights', 'Custom branded environment'], reach: '40M+', label: 'Maximum impact. One brand owns it all.' },
  { name: 'Premier', price: '$200K+', color: '#c9a84c', benefits: ['5,000 sqft dedicated space', 'Stage & event naming rights', 'Digital display priority', 'Co-branded marketing materials', 'Social media integration', 'Partner recognition program'], reach: '25M+', label: 'High visibility. Strong brand association.' },
  { name: 'Associate', price: '$75K+', color: '#a08030', benefits: ['1,500 sqft activation space', 'Event program recognition', 'Digital display inclusion', 'On-site brand presence', 'Partnership certificate'], reach: '10M+', label: 'Targeted presence at key events.' },
]

const brandFitQuestions = [
  { q: 'Your target customer is primarily...', options: ['Families', 'Young Adults', 'Professionals', 'Luxury Shoppers'] },
  { q: 'Your activation goal is...', options: ['Brand Awareness', 'Product Launch', 'Community Building', 'Direct Sales'] },
  { q: 'Your brand category is...', options: ['Retail / Fashion', 'Food & Beverage', 'Tech / Innovation', 'Entertainment'] },
]

const fitResults = {
  'Families-Brand Awareness-Entertainment': { score: 98, tier: 'Presenting', note: "Perfect alignment with MoA's core family audience." },
  'Young Adults-Product Launch-Tech / Innovation': { score: 94, tier: 'Premier', note: "Strong match — MoA's 18-34 demographic is highly tech-engaged." },
  'Luxury Shoppers-Direct Sales-Retail / Fashion': { score: 96, tier: 'Presenting', note: 'Premium audience match. Luxury Wing partnership recommended.' },
  'default': { score: 87, tier: 'Premier', note: "Strong fit across MoA's diverse visitor base." },
}

export default function Sponsorship() {
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const [activeDemographic, setActiveDemographic] = useState('age')
  const [activeTier, setActiveTier] = useState(1)
  const [fitAnswers, setFitAnswers] = useState({})
  const [fitResult, setFitResult] = useState(null)
  const [barsVisible, setBarsVisible] = useState(false)
  const barsRef = useRef(null)
  const tiersRef = useRef(null)
  const fitRef = useRef(null)

  useEffect(() => {
    ScrollTrigger.create({ trigger: barsRef.current, start: 'top 80%', once: true, onEnter: () => setBarsVisible(true) })
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
      gsap.fromTo(tiersRef.current ? Array.from(tiersRef.current.children) : [], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: tiersRef.current, start: 'top 80%', once: true } })
      gsap.fromTo(fitRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: fitRef.current, start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleFitAnswer = (qIndex, answer) => {
    const updated = { ...fitAnswers, [qIndex]: answer }
    setFitAnswers(updated)
    if (Object.keys(updated).length === brandFitQuestions.length) {
      const key = `${updated[0]}-${updated[1]}-${updated[2]}`
      setFitResult(fitResults[key] || fitResults['default'])
    }
  }

  const currentDemoData = demographics[activeDemographic]

  return (
    <section ref={sectionRef} style={{ minHeight: '100vh', width: '100%', background: '#070707', overflow: 'hidden', paddingTop: isMobile ? '5rem' : '8rem', paddingBottom: '8rem' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 70% 20%, rgba(201,168,76,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '0 1.5rem' : '0 5rem', position: 'relative', zIndex: 2 }}>

        {/* Hero */}
        <div ref={heroRef} style={{ marginBottom: isMobile ? '4rem' : '7rem', opacity: 0 }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '1.5rem' }}>07 — Sponsorship</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(32px, 6vw, 88px)', fontWeight: 700, lineHeight: 0.95, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Your brand. <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>40 million</span><br />witnesses.
          </h2>
          <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', opacity: 0.5, marginBottom: '1.5rem' }} />
          <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', fontWeight: 300, lineHeight: 2, maxWidth: '580px' }}>
            MoA sponsorships aren't placements — they're cultural moments. Every partner that activates here becomes part of the fabric of the most-visited destination in America.
          </p>
        </div>

        {/* Demographic Visualizer */}
        <div style={{ marginBottom: isMobile ? '5rem' : '8rem' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>Know Your Audience</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'baseline', marginBottom: '3rem', flexDirection: isMobile ? 'column' : 'row', gap: '1rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
              40M visitors. <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Who are they?</span>
            </h3>
            <div style={{ display: 'flex', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
              {['age', 'income', 'interest'].map(tab => (
                <button key={tab} onClick={() => setActiveDemographic(tab)} style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: isMobile ? '0.5rem 0.8rem' : '0.7rem 1.4rem', background: activeDemographic === tab ? 'rgba(201,168,76,0.12)' : 'transparent', color: activeDemographic === tab ? 'var(--color-gold)' : 'rgba(255,255,255,0.3)', border: `1px solid ${activeDemographic === tab ? 'rgba(201,168,76,0.3)' : 'transparent'}`, cursor: 'pointer', transition: 'all 0.3s ease' }}>
                  {tab === 'age' ? 'Age' : tab === 'income' ? 'Income' : 'Interests'}
                </button>
              ))}
            </div>
          </div>

          <div ref={barsRef} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: isMobile ? '1.5rem' : '3rem' }}>
            {activeDemographic === 'interest' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {demographics.interest.map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>{item.label}</span>
                      <span style={{ fontFamily: 'Playfair Display', fontSize: '0.9rem', color: 'var(--color-gold)', fontWeight: 700 }}>{item.value}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, var(--color-gold), rgba(201,168,76,0.4))', width: barsVisible ? `${item.value}%` : '0%', transition: `width 1s ease ${i * 0.1}s` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? '0.5rem' : '1.5rem', height: isMobile ? '150px' : '200px', justifyContent: 'center' }}>
                {currentDemoData.map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', flex: 1 }}>
                    <span style={{ fontFamily: 'Playfair Display', fontSize: isMobile ? '0.7rem' : '0.9rem', color: item.color, fontWeight: 700 }}>{item.value}%</span>
                    <div style={{ width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: '2px 2px 0 0', display: 'flex', alignItems: 'flex-end', height: isMobile ? '100px' : '140px' }}>
                      <div style={{ width: '100%', background: `linear-gradient(to top, ${item.color}, ${item.color}60)`, height: barsVisible ? `${item.value * (isMobile ? 2.8 : 4)}px` : '0px', borderRadius: '2px 2px 0 0', transition: `height 1s ease ${i * 0.1}s`, maxHeight: isMobile ? '100px' : '140px' }} />
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: isMobile ? '0.48rem' : '0.6rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tier Comparator */}
        <div style={{ marginBottom: isMobile ? '5rem' : '8rem' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>Partnership Tiers</div>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '3rem' }}>
            Choose your <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>level of impact.</span>
          </h3>
          <div ref={tiersRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            {tiers.map((tier, i) => (
              <div key={i} onClick={() => setActiveTier(i)} style={{ background: activeTier === i ? 'rgba(201,168,76,0.06)' : '#070707', padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem', cursor: 'pointer', border: activeTier === i ? '1px solid rgba(201,168,76,0.25)' : '1px solid transparent', transition: 'all 0.4s ease', opacity: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: activeTier === i ? `linear-gradient(90deg, ${tier.color}, transparent)` : 'transparent', transition: 'all 0.4s ease' }} />
                <div style={{ fontFamily: 'Playfair Display', fontSize: '0.75rem', color: tier.color, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.8 }}>{tier.name}</div>
                <div style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>{tier.price}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: tier.color, opacity: 0.6, marginBottom: '0.5rem' }}>{tier.reach} reach</div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 300 }}>{tier.label}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {tier.benefits.map((b, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: tier.color, opacity: 0.7, marginTop: '0.45rem', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: activeTier === i ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)', lineHeight: 1.5, transition: 'color 0.3s ease' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Fit Scorer */}
        <div ref={fitRef} style={{ opacity: 0 }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>Brand Fit Scorer</div>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.8rem' }}>
            Is MoA the right <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>fit for your brand?</span>
          </h3>
          <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(255,255,255,0.28)', fontWeight: 300, lineHeight: 1.8, marginBottom: '3rem', maxWidth: '500px' }}>Answer 3 questions. We'll tell you exactly where your brand belongs.</p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobileOrTablet ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {brandFitQuestions.map((q, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontFamily: 'Playfair Display', fontSize: '0.8rem', color: fitAnswers[i] ? 'var(--color-gold)' : 'rgba(255,255,255,0.15)' }}>0{i + 1}</span>
                    {q.q}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {q.options.map(opt => (
                      <button key={opt} onClick={() => handleFitAnswer(i, opt)} style={{ fontFamily: 'Inter', fontSize: '0.7rem', letterSpacing: '0.08em', padding: '0.6rem 1.2rem', background: fitAnswers[i] === opt ? 'rgba(201,168,76,0.12)' : 'transparent', border: `1px solid ${fitAnswers[i] === opt ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.07)'}`, color: fitAnswers[i] === opt ? 'var(--color-gold)' : 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'all 0.3s ease' }}>{opt}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: fitResult ? 'rgba(201,168,76,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${fitResult ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.05)'}`, padding: isMobile ? '2rem' : '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'all 0.5s ease', minHeight: '300px' }}>
              {fitResult ? (
                <>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '1rem' }}>Your Brand Fit Score</div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: isMobile ? '4rem' : '5rem', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: '0.3rem' }}>
                    {fitResult.score}<span style={{ fontSize: '2rem', color: 'var(--color-gold)' }}>%</span>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.5rem' }}>Recommended: {fitResult.tier} Tier</div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginBottom: '1.5rem' }}>
                    <div style={{ height: '100%', width: `${fitResult.score}%`, background: 'linear-gradient(90deg, var(--color-gold), rgba(201,168,76,0.4))', borderRadius: '2px', transition: 'width 1s ease' }} />
                  </div>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, fontWeight: 300 }}>{fitResult.note}</p>
                  <a href="#/contact" style={{ marginTop: '2rem', display: 'inline-block', fontFamily: 'Inter', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: '2px' }}>Talk to our partnerships team →</a>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: '4rem', color: 'rgba(255,255,255,0.04)', marginBottom: '1rem' }}>?</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', lineHeight: 1.8 }}>Answer all 3 questions<br />to see your fit score</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}