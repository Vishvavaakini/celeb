import { useState } from 'react'
 
import './App.css'
import {Routes,Route, Link } from 'react-router-dom'
import ViewEvent from './routes/ViewEvent'
import Home from './routes/Home'
import CreateEvent from './routes/CreateEvent'
function App() {
   

  return (
    <>
      <div className='min-h-screen bg-slate-900 text-slate-50'>
        <header className='border-b border-slate-800'>
          <nav className='max-w-4xl mx-autoo flex items-center justify-between  px-4 py-3'>
            <Link to="/" className='font-bold text-lg'>
              Celebrate Maker 🎉</Link>
             
              
              <Link to="/create" className='text-sm px-3 py-1 rounded-full bg-emerald-500'>
              Create Page
              </Link>
          </nav>
        </header>
        <main>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/create' element={<CreateEvent/>}> </Route>
      <Route path='/e/:id' element={<ViewEvent/>}></Route>

    </Routes>
        </main>
      </div>
       
     <div classNmae="text-white justify-center">
      <h1 className='font-bold'>Celebrate Maker 🎉</h1>
     </div>
    </>
  )
}

export default App
