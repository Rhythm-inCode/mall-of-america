import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive'

const navItems = [
  { label: 'Overview', path: '/overview' },
  { label: 'Retail', path: '/retail', sub: [
    { label: 'Luxury Wing', path: '/luxury' },
    { label: 'Dining', path: '/dining' },
  ]},
  { label: 'Entertainment', path: '/entertainment' },
  { label: 'Events', path: '/events' },
  { label: 'Leasing', path: '/leasing' },
  { label: 'Sponsorship', path: '/sponsorship' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobile, isTablet } = useResponsive()
  const isMobileOrTablet = isMobile || isTablet

  const handleNav = (path) => {
    navigate(path)
    setMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '1rem 1.5rem' : '1.2rem 3rem',
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        {/* Logo */}
        <div onClick={() => handleNav('/')} style={{
          fontFamily: 'Playfair Display',
          fontSize: isMobile ? '1rem' : '1.3rem',
          color: 'var(--color-gold)', cursor: 'pointer', letterSpacing: '0.05em',
        }}>
          Mall of America
        </div>

        {/* Desktop Nav */}
        {!isMobileOrTablet && (
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {navItems.map((item) => (
              <div key={item.path} style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown(item.path)}
                onMouseLeave={() => setTimeout(() => setActiveDropdown(null), 100)}
              >
                <span onClick={() => handleNav(item.path)} style={{
                  color: location.hash === `#${item.path}` ? 'var(--color-gold)' : 'var(--color-text)',
                  fontSize: '0.85rem', letterSpacing: '0.08em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'color 0.3s ease', fontFamily: 'Inter',
                }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                  onMouseLeave={e => e.target.style.color = location.hash === `#${item.path}` ? 'var(--color-gold)' : '#fff'}
                >
                  {item.label}
                </span>

                {item.sub && activeDropdown === item.path && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: 'rgba(10,10,10,0.95)',
                    border: '1px solid var(--color-border)',
                    backdropFilter: 'blur(12px)',
                    minWidth: '160px', padding: '0.5rem 0',
                  }}>
                    {item.sub.map(subItem => (
                      <div key={subItem.path} onClick={() => handleNav(subItem.path)} style={{
                        padding: '0.6rem 1.2rem', fontSize: '0.8rem',
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: '#fff', cursor: 'pointer', transition: 'color 0.2s',
                      }}
                        onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                        onMouseLeave={e => e.target.style.color = '#fff'}
                      >{subItem.label}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobileOrTablet && (
          <button onClick={() => handleNav('/contact')} style={{
            border: '1px solid var(--color-gold)', color: 'var(--color-gold)',
            background: 'transparent', padding: '0.5rem 1.2rem',
            fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'Inter',
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--color-gold)'; e.target.style.color = '#000' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-gold)' }}
          >Get Started</button>
        )}

        {/* Hamburger */}
        {isMobileOrTablet && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: '22px', height: '1px',
                background: menuOpen
                  ? i === 1 ? 'transparent' : 'var(--color-gold)'
                  : 'rgba(255,255,255,0.7)',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                  : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                  : 'none' : 'none',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {isMobileOrTablet && menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          gap: '0',
          paddingTop: '5rem',
        }}>
          {navItems.map((item, idx) => (
            <div key={item.path} style={{ width: '100%', textAlign: 'center' }}>
              <div onClick={() => handleNav(item.path)} style={{
                fontFamily: 'Playfair Display',
                fontSize: 'clamp(24px, 5vw, 36px)',
                color: location.hash === `#${item.path}` ? 'var(--color-gold)' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer', padding: '1rem 2rem',
                letterSpacing: '-0.01em',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                transition: 'color 0.3s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.currentTarget.style.color = location.hash === `#${item.path}` ? 'var(--color-gold)' : 'rgba(255,255,255,0.7)'}
              >
                {item.label}
              </div>
              {item.sub && item.sub.map(s => (
                <div key={s.path} onClick={() => handleNav(s.path)} style={{
                  fontFamily: 'Inter', fontSize: '0.75rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)',
                  padding: '0.6rem 2rem', cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                }}>{s.label}</div>
              ))}
            </div>
          ))}

          <button onClick={() => handleNav('/contact')} style={{
            marginTop: '2rem',
            border: '1px solid var(--color-gold)', color: 'var(--color-gold)',
            background: 'transparent', padding: '0.8rem 2rem',
            fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: 'Inter',
          }}>Get Started</button>
        </div>
      )}
    </>
  )
}