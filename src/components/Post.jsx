import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFromAPI } from "../utils/getFromAPI";

const Post = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { postId } = useParams();

  const getPost = async () => {
    try {
      const response = await getFromAPI(`/api/getpost/${postId}`);

      setImageUrl(response.data.post.imageUrl)
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="flex flex-row justify-center mt-8">
      <img
        src={imageUrl}
        // src="Example1.png"
        className="w-[600px]"
      />
    </div>
  );
};

export default Post;
