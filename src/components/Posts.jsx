import {images} from '../../images.json'

const Posts = () => {



  return (
    <div className='flex flex-col gap-4'>
      {images.map((image, id) => (
        <div key={id}>
            <img  src={image.imageSource} className='w-[500px]' />
        </div>
      ))}
    </div>
  )
}

export default Posts
