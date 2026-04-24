import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const segments = [
  { id: 'luxury', label: 'Luxury Wing', color: '#f5d070', floor: 'Level 3', sqftRange: '2,000 – 8,000', avgRent: '$180/sqft', occupancy: '97%', avgSales: '$1,200/sqft/yr', tenants: ['Cartier', 'Tiffany & Co.', 'Louis Vuitton', 'Rolex'], desc: "The most coveted retail address in the Midwest. Shared prestige with the world's most recognized luxury names.", highlight: 'Highest sales-per-sqft in the property.', position: { x: '65%', y: '20%' } },
  { id: 'midtier', label: 'Mid-Tier Retail', color: '#c9a84c', floor: 'Levels 1-3', sqftRange: '1,000 – 5,000', avgRent: '$90/sqft', occupancy: '94%', avgSales: '$680/sqft/yr', tenants: ['Zara', 'H&M', 'Uniqlo', 'Sephora'], desc: 'The commercial engine of MoA. Massive footfall, diverse demographics, year-round performance.', highlight: 'Largest category by volume & traffic.', position: { x: '35%', y: '50%' } },
  { id: 'fnb', label: 'Food & Beverage', color: '#e07830', floor: 'All Levels', sqftRange: '500 – 4,000', avgRent: '$110/sqft', occupancy: '99%', avgSales: '$820/sqft/yr', tenants: ['The Cove', 'Nori', 'Brick & Ember', 'Café 1992'], desc: 'Zero vacancies. Demand exceeds supply. F&B at MoA benefits from 3+ hour average dwell time.', highlight: 'Waitlist for premium locations.', position: { x: '50%', y: '70%' } },
  { id: 'popup', label: 'Pop-Up & Flex', color: '#88aaff', floor: 'Common Areas', sqftRange: '200 – 1,500', avgRent: '$150/sqft', occupancy: 'Flexible', avgSales: 'Campaign-based', tenants: ['Seasonal Concepts', 'DTC Brands', 'Collaborations'], desc: 'Launch fast. Test markets. Build buzz. MoA pop-up slots are the most efficient brand awareness plays in retail.', highlight: 'Ideal for DTC brands & product launches.', position: { x: '20%', y: '30%' } },
]

const salesPerSqft = { luxury: 1200, midtier: 680, fnb: 820, popup: 400 }
const rentPerSqft = { luxury: 180, midtier: 90, fnb: 110, popup: 150 }

export default function Leasing() {
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const [activeSegment, setActiveSegment] = useState('midtier')
  const [roiSqft, setRoiSqft] = useState(2000)
  const [roiSegment, setRoiSegment] = useState('midtier')
  const [roiYears, setRoiYears] = useState(3)
  const mapRef = useRef(null)
  const roiRef = useRef(null)

  const seg = segments.find(s => s.id === activeSegment)
  const projRevenue = salesPerSqft[roiSegment] * roiSqft * roiYears
  const projRent = rentPerSqft[roiSegment] * roiSqft * roiYears * 12
  const projProfit = projRevenue - projRent
  const roiPct = Math.round((projProfit / projRent) * 100)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
      gsap.fromTo(mapRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: mapRef.current, start: 'top 80%', once: true } })
      gsap.fromTo(roiRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: roiRef.current, start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ minHeight: '100vh', width: '100%', background: '#080808', overflow: 'hidden', paddingTop: isMobile ? '5rem' : '8rem', paddingBottom: '8rem' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(201,168,76,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '0 1.5rem' : '0 5rem', position: 'relative', zIndex: 2 }}>

        {/* Hero */}
        <div ref={heroRef} style={{ marginBottom: isMobile ? '4rem' : '7rem', opacity: 0 }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '1.5rem' }}>08 — Leasing</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(32px, 6vw, 88px)', fontWeight: 700, lineHeight: 0.95, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Find your<br /><span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>space in America.</span>
          </h2>
          <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', opacity: 0.5, marginBottom: '1.5rem' }} />
          <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'rgba(255,255,255,0.28)', fontWeight: 300, lineHeight: 2, maxWidth: '540px' }}>
            520+ stores. 4 distinct retail environments. Whether you're a global luxury house or a DTC brand testing a first physical location — there's a space for you at MoA.
          </p>
        </div>

        {/* Interactive Floor Map */}
        <div ref={mapRef} style={{ marginBottom: isMobile ? '5rem' : '8rem', opacity: 0 }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>Interactive Floor Plan</div>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '3rem' }}>
            Explore the <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>4 retail zones.</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: isMobileOrTablet ? '1fr' : '1fr 380px', gap: '3rem', alignItems: 'start' }}>
            {/* Map */}
            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: isMobile ? '280px' : '460px', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <rect x="15%" y="10%" width="70%" height="80%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.08)', whiteSpace: 'nowrap', textAlign: 'center', lineHeight: 1.8 }}>
                Mall of America<br />5.6M sqft
              </div>
              {segments.map(s => (
                <div key={s.id} onClick={() => setActiveSegment(s.id)} style={{ position: 'absolute', left: s.position.x, top: s.position.y, transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: 10 }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: activeSegment === s.id ? '70px' : '44px', height: activeSegment === s.id ? '70px' : '44px', borderRadius: '50%', border: `1px solid ${s.color}`, opacity: activeSegment === s.id ? 0.35 : 0.12, transition: 'all 0.4s ease' }} />
                  <div style={{ width: activeSegment === s.id ? '20px' : '12px', height: activeSegment === s.id ? '20px' : '12px', borderRadius: '50%', background: activeSegment === s.id ? s.color : 'rgba(255,255,255,0.25)', transition: 'all 0.3s ease', boxShadow: activeSegment === s.id ? `0 0 24px ${s.color}80` : 'none' }} />
                  <div style={{ position: 'absolute', top: '130%', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Inter', fontSize: isMobile ? '0.42rem' : '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: activeSegment === s.id ? s.color : 'rgba(255,255,255,0.2)', transition: 'color 0.3s ease', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
              <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.5rem', fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>↑ Click a zone</div>
            </div>

            {/* Detail panel */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${seg.color}25`, padding: isMobile ? '1.5rem' : '2.5rem', minHeight: isMobileOrTablet ? 'auto' : '460px', transition: 'border-color 0.4s ease', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '24px', height: '2px', background: seg.color, marginBottom: '1.5rem', transition: 'background 0.3s ease' }} />
              <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: seg.color, marginBottom: '0.5rem', opacity: 0.8 }}>{seg.floor}</div>
              <h4 style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>{seg.label}</h4>
              <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>{seg.desc}</p>
              <div style={{ background: `${seg.color}12`, border: `1px solid ${seg.color}20`, padding: '0.8rem 1rem', marginBottom: '1.5rem', fontFamily: 'Inter', fontSize: '0.7rem', color: seg.color, letterSpacing: '0.05em' }}>★ {seg.highlight}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                {[['Size Range', seg.sqftRange], ['Avg Rent', seg.avgRent], ['Occupancy', seg.occupancy], ['Avg Sales', seg.avgSales]].map(([l, v]) => (
                  <div key={l} style={{ background: '#080808', padding: '1rem' }}>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '0.3rem' }}>{l}</div>
                    <div style={{ fontFamily: 'Playfair Display', fontSize: '1rem', color: '#fff', fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '0.8rem' }}>Current Tenants</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {seg.tenants.map(t => <span key={t} style={{ fontFamily: 'Inter', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.06)', padding: '0.3rem 0.7rem' }}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* ROI Estimator */}
        <div ref={roiRef} style={{ opacity: 0 }}>
          <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '0.8rem' }}>ROI Estimator</div>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.8rem' }}>
            What will your space <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>actually return?</span>
          </h3>
          <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'rgba(255,255,255,0.28)', fontWeight: 300, lineHeight: 1.8, marginBottom: '3.5rem', maxWidth: '500px' }}>Adjust the inputs to estimate your projected revenue and ROI at Mall of America.</p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobileOrTablet ? '1fr' : '1fr 1fr', gap: '4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>Retail Segment</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {segments.map(s => (
                    <button key={s.id} onClick={() => setRoiSegment(s.id)} style={{ fontFamily: 'Inter', fontSize: '0.68rem', letterSpacing: '0.08em', padding: '0.8rem 1rem', background: roiSegment === s.id ? `${s.color}15` : 'transparent', border: `1px solid ${roiSegment === s.id ? s.color + '50' : 'rgba(255,255,255,0.07)'}`, color: roiSegment === s.id ? s.color : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left' }}>{s.label}</button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Store Size</span>
                  <span style={{ fontFamily: 'Playfair Display', fontSize: '1rem', color: 'var(--color-gold)', fontWeight: 700 }}>{roiSqft.toLocaleString()} sqft</span>
                </div>
                <input type="range" min="200" max="10000" step="100" value={roiSqft} onChange={e => setRoiSqft(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer', height: '4px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)' }}>200 sqft</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)' }}>10,000 sqft</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Lease Term</span>
                  <span style={{ fontFamily: 'Playfair Display', fontSize: '1rem', color: 'var(--color-gold)', fontWeight: 700 }}>{roiYears} {roiYears === 1 ? 'Year' : 'Years'}</span>
                </div>
                <input type="range" min="1" max="10" step="1" value={roiYears} onChange={e => setRoiYears(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer', height: '4px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)' }}>1 Year</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)' }}>10 Years</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)', padding: isMobile ? '2rem' : '3rem' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '2rem' }}>Projected Over {roiYears} {roiYears === 1 ? 'Year' : 'Years'}</div>
              {[['Projected Revenue', projRevenue, '#fff'], ['Estimated Rent', projRent, 'rgba(255,255,255,0.4)'], ['Net Profit', projProfit, projProfit > 0 ? 'var(--color-gold)' : '#ff6666']].map(([label, val, color]) => (
                <div key={label} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.3rem' }}>{label}</div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 700, color, letterSpacing: '-0.01em', transition: 'all 0.3s ease' }}>${Math.abs(val).toLocaleString()}</div>
                </div>
              ))}
              <div style={{ background: roiPct > 0 ? 'rgba(201,168,76,0.08)' : 'rgba(255,100,100,0.08)', border: `1px solid ${roiPct > 0 ? 'rgba(201,168,76,0.2)' : 'rgba(255,100,100,0.2)'}`, padding: '1.5rem', marginTop: '0.5rem' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.3rem' }}>Return on Investment</div>
                <div style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', fontWeight: 700, color: roiPct > 0 ? 'var(--color-gold)' : '#ff8888', transition: 'all 0.3s ease' }}>{roiPct > 0 ? '+' : ''}{roiPct}%</div>
              </div>
              <div style={{ marginTop: '1.5rem', fontFamily: 'Inter', fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)', lineHeight: 1.6, fontWeight: 300 }}>* Based on MoA category averages.</div>
              <a href="#/contact" style={{ display: 'block', marginTop: '2rem', background: 'var(--color-gold)', color: '#000', fontFamily: 'Inter', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, padding: '1rem', textAlign: 'center', textDecoration: 'none', transition: 'background 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.background = '#e0bb5f'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-gold)'}
              >Request a Leasing Proposal →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}