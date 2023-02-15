import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

const Posts = () => {
  const [images, setImages] = useState([])

  const getPosts = async () => {
    try {
      const response = await axios.get('/api/getposts')

      const data = response.data.posts

      setImages([...response.data.posts])
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])
  

  return (
    <div className='flex flex-col gap-4'>
      {images.map((image, id) => 
      (
        <Link to={`/u/${image._id}`} key={id}>
        <div >
            <img  src={image.imageUrl} className='w-[500px]' />
        </div>
      </Link>
      )
      )
      }

    </div>
  )
}

export default Posts
