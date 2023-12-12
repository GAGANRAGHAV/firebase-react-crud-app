import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Contact from './Contact.jsx'
import About from './About.jsx'
import './index.css'
import { BrowserRouter, Route , Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<App/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/contact' element={<Contact/>} />

  

    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
