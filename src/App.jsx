import { useState } from 'react'
import './App.css'
import Posts from './components/Posts'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <Routes>

      <Route path='/' element={
        <>
          <div className='flex flex-row justify-between w-full border-2 pt-4 px-10'>
            <h1>LOGO</h1>
            <Posts />
            <h1>PROFILE</h1>
          </div>
        </>
      }

      />
    </Routes>

  )
}

export default App
