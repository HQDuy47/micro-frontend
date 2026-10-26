import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../shell/src/index.css' // ponytail: dùng chung CSS của shell khi chạy độc lập; tách thành package nếu remote ra repo riêng
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
