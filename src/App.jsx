import { useState } from 'react'
import './App.css'
import Posts from './components/Posts'
import { Route, Routes } from 'react-router'
import Sidebar from './components/Sidebar'
import CreatePost from './components/CreatePost'

function App() {

  return (
    <Routes>

      <Route path='/' element={
        <>
            <Sidebar/>
          <div className='flex flex-row justify-center w-full border-2 '>
            <div className='pt-4' >
            <Posts />
            </div>
          </div>
          <div className='fixed top-0 right-0'>
            <h1>PROFILE</h1>
          </div>
        </>
      }
      />

      <Route path='/createpost' element={<CreatePost/>}/>
    </Routes>

  )
}

export default App
