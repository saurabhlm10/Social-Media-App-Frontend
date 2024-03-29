import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mainState } from "../features/mainSlice";
import { useSelector } from "react-redux";
import { getFromAPI } from "../utils/getFromAPI";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const { user } = useSelector(mainState);

  const getPosts = async () => {
    try {
      if (user.following.length !== 0) {
        const response = await getFromAPI(`/api/getposts/${user.following}`);

        setPosts([...response.data.posts]);
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
      {posts.map((post, id) => (
        <div key={id}>
          <Link to={`/${post.username}`}>
            <b>{post.username}</b>
          </Link>
          
            <div className="border-r-2 border-l-2 pb-20 border-gray-100">
              {/* <img src={image.imageUrl} className="w-[500px] mt-4" /> */}
              <Post sentPost={post} key={id} />
            </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
