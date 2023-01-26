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
          <div className='flex flex-row justify-between w-full border-2 '>
            {/* <h1>LOGO</h1> */}
            <Sidebar/>
            < div className='pt-4' >
            <Posts />
            </div>
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
