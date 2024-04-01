import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Blog from "./Blog.jsx"
import SingleBlog from './SingleBlog.jsx'

import { BrowserRouter, Route , Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<App/>} />
    <Route path='/blog' element={<Blog/>} />
    <Route path="/blog/:id" element={<SingleBlog />} />


  

    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
