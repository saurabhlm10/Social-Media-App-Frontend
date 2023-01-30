import { useState, useEffect } from "react"
import axios from 'axios'

const Posts = () => {
  const [images, setImages] = useState([])

  const getPosts = async () => {
    try {
      const response = await axios.get('/api/getposts')

      console.log('1st', typeof response.data.posts);

      const data = response.data.posts

      console.log(data)

      console.log('data type', typeof data);

      setImages([...response.data.posts])

      console.log(typeof images)
      

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
        <div key={id}>
            {/* {console.log(image)} */}
            <img  src={image.imageUrl} className='w-[500px]' />
        </div>
      )
      )
      }
    </div>
    // <></>
  )
}

export default Posts
