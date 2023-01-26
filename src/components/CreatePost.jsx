import { useState } from 'react'

const CreatePost = () => {
    const [loadedFileUrl, setLoadedFileUrl] = useState(null)

    const loadFile = (e) => {
        // setLoadedFileUrl(URL.createObjectURL(e.target.files[0]))

        console.log(loadedFileUrl)
    }

    return (
        <div className='flex flex-row justify-center '>
            <div className='flex flex-col'>
                {!loadedFileUrl ? (
                    <>
                        <input type="file" id="imageInput" name="filename" accept='images/*' onChange={(e) => loadFile(e)}
                            className='hidden'
                        />
                        <p><label htmlFor="imageInput">Upload Image</label></p>
                    </>
                ) : (
                    <img src={loadedFileUrl} />
                )}
                <input type="text" />
                <input type="text" />
            </div>
            <button
                onClick={() => console.log(imageInput.files)}
                className='border-2 '>Add Post</button>
        </div>
    )
}

export default CreatePost
