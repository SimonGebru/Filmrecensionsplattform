import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// ✅ Importera AuthProvider
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 🔐 Wrappa appen här */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
