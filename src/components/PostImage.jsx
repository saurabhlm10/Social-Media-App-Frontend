import React from 'react'

const PostImage = ({imageUrl}) => {
  return (
    <img src={imageUrl}
    loading='lazy'
    alt="" />
  )
}

export default PostImage