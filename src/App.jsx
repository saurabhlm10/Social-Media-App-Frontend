import { useState } from 'react'
import './App.css'
import Posts from './components/Posts'
import { Route, Routes, Link } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import CreatePost from './components/CreatePost'
import Post from './components/Post'
import CreateUser from './components/CreateAccount'
import Spinner from './components/Spinner'
import { useSelector, useDispatch } from "react-redux"
import Login from './components/Login'


function App() {
  const{isLoading} = useSelector((state) => state.main)


  return (
    <Routes>

      <Route path='/' element={
        <>
          <Sidebar />
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

      <Route path='/createpost' element={
        <>
        
          <div>
            <Link to='/'>
              <div className='mt-4 ml-4 absolute text-3xl'>LOGO</div>
            </Link>
            <CreatePost />
          </div>

        </>
      } />
      <Route path='/u/:postId' element={
        <>
          <Link to='/'>
            <div className='mt-4 ml-4 absolute text-3xl'>LOGO</div>
          </Link>
          <Post />
        </>
      } />
      <Route path='/u/createaccount' element={ 
        <>
        {
        isLoading &&

        <div className='full-screen-loading-background'>
          <div className="pos-center">
             <Spinner />
          </div>
        </div>
        }
          <CreateUser />
        </>
      }
      />
      <Route
      path='/u/login'
      element={
      <>
      {
        isLoading &&

        <div className='full-screen-loading-background'>
          <div className="pos-center">
             <Spinner />
          </div>
        </div>
        }
      <Login/>
      </>}

      />
    </Routes>

  )
}

export default App
