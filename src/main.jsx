import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DisableDevtool from 'disable-devtool'
import './index.css'
import App from './App.jsx'

// Disable developer tools in production or whenever built
if (import.meta.env.PROD) {
  DisableDevtool({
    disableMenu: true, // Disable right-click context menu
    clearLog: true,    // Continuously clear console logs
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

