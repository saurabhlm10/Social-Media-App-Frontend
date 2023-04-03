import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFromAPI } from "../utils/getFromAPI";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mainState } from "../features/mainSlice";
import { turnOnDeleteModal } from "../features/mainSlice";
import DeleteModal from "./DeleteModal";

const Post = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { postId } = useParams();
  const [selfPost, setSelfPost] = useState(false);
  const [post, setPost] = useState({});

  const dispatch = useDispatch();

  const { deleteModalOpen } = useSelector(mainState);

  const getPost = async () => {
    try {
      const response = await getFromAPI(`/api/getpost/${postId}`);

      setImageUrl(response.data.post.imageUrl);

      setPost(response.data.post);

      if (Cookies.get("username") === response.data.post.username) {
        setSelfPost(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className=" flex flex-col items-center">
      {deleteModalOpen && <DeleteModal postId={postId} post={post} />}
      <div className=" mx-auto relative flex flex-row justify-center mt-8 group">
        <img src={imageUrl} className="w-[600px] " />
        {selfPost && (
          <div className=" absolute hidden top-2 right-2 cursor-pointer border-2 border-white bg-black h-8 w-8 group-hover:flex flex-row justify-center items-center rounded-full">
            <span
              className="material-symbols-outlined  text-white"
              onClick={(e)=> {
                // e.stopPropagation();
                dispatch(turnOnDeleteModal());
              }}
            >
              delete
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
