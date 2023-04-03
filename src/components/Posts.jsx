import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mainState } from "../features/mainSlice";
import { useSelector } from "react-redux";
import { getFromAPI } from "../utils/getFromAPI";

const Posts = () => {
  const [images, setImages] = useState([]);

  const { user } = useSelector(mainState);

  const getPosts = async () => {
    try {
      if (user.following.length !== 0) {
        const response = await getFromAPI(`/api/getposts/${user.following}`);

        setImages([...response.data.posts]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="font-display flex flex-col gap-12 	">
      {images.map((image, id) => (
        <div key={id}>
          <Link to={`/${image.username}`}>
            <b>{image.username}</b>
          </Link>
          <Link to={`/u/${image._id}`}>
            <div className="border-r-2 border-l-2 border-gray-100">
              <img src={image.imageUrl} className="w-[500px] mt-4" />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
