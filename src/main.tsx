import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // ← esto es correcto
import App from './App.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
