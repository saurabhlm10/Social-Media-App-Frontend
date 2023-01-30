import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const Post = () => {
    const [imageUrl, setImageUrl] = useState('')
    const {postId} = useParams()

    const getPost = async () => {
        try {
            console.log(postId)
            const response = await axios.get(`/api/getpost/${postId}`)

            console.log(response);

            setImageUrl(response.data.post.imageUrl)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost()
    }, [])
    

    return (
        <div className='flex flex-row justify-center mt-8'>
            <img
                src={imageUrl}
                // src="Example1.png"
                className='w-[600px]'
            />
        </div>
    )
}

export default Post
