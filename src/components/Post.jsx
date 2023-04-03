import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFromAPI } from "../utils/getFromAPI";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mainState } from "../features/mainSlice";
import { turnOnDeleteModal } from "../features/mainSlice";
import DeleteModal from "./DeleteModal";

import "./post.css";
import { putToAPI } from "../utils/putToAPI";

const Post = ({ sentPost }) => {
  const [imageUrl, setImageUrl] = useState("");
  let { postId } = useParams();
  const [selfPost, setSelfPost] = useState(false);
  const [post, setPost] = useState(sentPost ? { ...sentPost } : {});
  const [likePostAction, setLikePostAction] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();

  const { isLoading, showCheckmark, deleteModalOpen, user } =
    useSelector(mainState);

  const getPost = async () => {
    try {
      if (!postId) {
        postId = post._id;
      }

      const response = await getFromAPI(`/api/getpost/${postId}`);

      setImageUrl(response.data.post.imageUrl);

      setPost(response.data.post);

      if (response.data.post.likes.includes(user.username)) {
        setIsLiked(true);
      }

      if (Cookies.get("username") === response.data.post.username) {
        setSelfPost(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLike = () => {
    try {
      const response = putToAPI(`/api/likepost/${user.username}/${post._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="font-head flex flex-col items-center ">
      {deleteModalOpen && <DeleteModal postId={postId} post={post} />}
      <div className="box mx-auto relative flex flex-col justify-center mt-8 group">
        {sentPost ? (
          <Link to={`/u/${post._id}`}>
            <img
              src={imageUrl}
              className="w-[450px]"
            />
          </Link>
        ) : (
          <img
            src={imageUrl}
            className="w-[600px]"
          />
        )}

        {selfPost && (
          <div
            className={` absolute top-2 right-2 flex opacity-0 cursor-pointer border-2 hover:border-[#4CADDA] border-white bg-[#58c1de] h-8 w-8 group-hover:opacity-100 flex-row justify-center items-center rounded-full transition-all duration-150 ease-in hover:bg-[#4CADDA] ${
              (isLoading || showCheckmark) && "hidden"
            }`}
          >
            <span
              className="material-symbols-outlined  text-white"
              onClick={() => {
                dispatch(turnOnDeleteModal());
              }}
            >
              delete
            </span>
          </div>
        )}
        <div className="flex flex-row">
          <button
            className={`box self-start w-1/3 ${
              sentPost ? "h-10" : "h-12"
            }  cursor-pointer flex flex-row items-center justify-center`}
            onClick={() => {
              if (!isLiked) {
                setLikePostAction((prev) => !prev);
                setTimeout(() => {
                  setLikePostAction((prev) => !prev);
                }, 50);
              }
              setIsLiked((prev) => !prev);
              updateLike();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1000"
              className={` ${sentPost ? "h-8 w-10" : "h-10 w-12"}  ${
                // className={` ${sentPost ? 'h-10 w-12' : 'h-10 w-12'}  ${
                likePostAction && "scale-[1.17]"
              }  transform-all duration-75 ease-in-out 	`}
              fill={`${isLiked ? "#4CADDA" : "#ffffff"}`}
            >
              <path
                // stroke={`${isLiked ? "#4CADDA": 'black'}`}
                stroke={`${isLiked ? "#4CADDA" : "black"}`}
                className="transform-all duration-50 ease-linear"
                strokeWidth="45"
                d="M721 936H254V424l278-288 33 26q11 8 14.5 18t3.5 23v10l-45 211h322q23 0 41.5 18.5T920 484v82q0 11-2.5 25.5T910 617L794 885q-9 21-29.5 36T721 936ZM194 424v512H80V424h114Z"
              />
            </svg>
          </button>
          <button className="w-2/3 box">Comments</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
