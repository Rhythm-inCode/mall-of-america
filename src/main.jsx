import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'

// Scroll restoration disable karo
window.history.scrollRestoration = 'manual'

// Page load pe forcefully top pe
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.onbeforeunload = () => window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)