import { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const CreatePost = () => {
    const [loadedFileUrl, setLoadedFileUrl] = useState(null)
    const [currentImage, setCurrentImage] = useState(null)
    const fileRef = useRef()
    const navigate = useNavigate()

    const loadFile = (e) => {
        setCurrentImage(e.target.files[0])
        setLoadedFileUrl(URL.createObjectURL(e.target.files[0]))
    }

    const deleteImage = (e) => {
        setCurrentImage(null)
        setLoadedFileUrl(null)
    }

    const addPost = async () => {
        try {
            const formData = new FormData();
            formData.append("image", currentImage)

            const response = await axios.post('/api/addpost', 
            formData,
            { headers: {'Content-Type': 'multipart/form-data'}}
            )

            console.log(response);

            navigate(`/u/${response.data.post._id}`)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-row justify-center '>
            <div className='flex flex-col pt-8 items-center'>
                {loadedFileUrl ? (
                    <div className='relative group'>
                        <img
                            src={loadedFileUrl}
                            className='w-[600px]'
                        />
                        <div className=' absolute top-2 right-2 hidden cursor-pointer border-2 border-white bg-black h-8 w-8 group-hover:flex flex-row justify-center items-center rounded-full'>
                            <span className="material-symbols-outlined  text-white"
                                onClick={(e) => deleteImage(e)}
                            >
                                delete
                            </span>
                        </div>
                    </div>
                ) : (
                    <>
                        <input type="file" ref={fileRef} id="imageInput" name="filename" accept='images/*' onChange={(e) => loadFile(e)}
                            className='hidden'
                        />
                        <div
                            className=' flex flex-row justify-center items-center'
                        ><label htmlFor="imageInput"
                            className='border-4 border-slate-300 p-52 rounded-[12px] cursor-pointer text-lg flex flex-col items-center'
                        >
                                <i className="material-icons text-3xl">add_a_photo</i>
                                Upload Image
                            </label></div>
                    </>

                )}
                <button
                    className='border-2 py-2 px-4 w-28 mt-6 bg-cyan-900 text-white rounded-[15px]'
                    onClick={addPost}
                >
                    Add Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost
