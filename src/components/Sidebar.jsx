import React from 'react'
import CreatePost from './CreatePost'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='bg-slate-300 pt-12 px-6 	'>
            <h1 className='mt-4'>LOGO</h1>
            <Link to='/createpost'>
                    <div className='mt-12 text-xl text-white px-4 py-2 bg-cyan-900 rounded-[40px]'>
                        <div className=' '>Create post</div>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar
