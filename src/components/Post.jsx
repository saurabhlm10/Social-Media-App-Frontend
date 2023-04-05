import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFromAPI } from "../utils/getFromAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  mainState,
  turnOffLoading,
  turnOffShowCheckmark,
  turnOnLoading,
  turnOnDeleteModal,
  turnOnShowCheckmark,
  turnOnDeleteCommentLoader,
  turnOffDeleteCommentLoader,
} from "../features/mainSlice";
import DeleteModal from "./DeleteModal";

import "./post.css";
import { putToAPI } from "../utils/putToAPI";
import { postToAPI } from "../utils/postToAPI";
import { ColorRing } from "react-loader-spinner";
import { deleteFromAPI } from "../utils/deleteFromAPI";

const Post = ({ sentPost }) => {
  const [imageUrl, setImageUrl] = useState("");
  let { postId } = useParams();
  const [selfPost, setSelfPost] = useState(false);
  const [post, setPost] = useState(sentPost ? { ...sentPost } : {});
  const [likePostAction, setLikePostAction] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [commentString, setCommentString] = useState("");

  const [commentErrorMessage, setCommentErrorMessage] = useState("default");

  const commentTextAreaRef = useRef();

  const dispatch = useDispatch();

  const {
    isLoading,
    showCheckmark,
    deleteModalOpen,
    user,
    deleteCommentLoader,
  } = useSelector(mainState);

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

  const addComment = async () => {
    dispatch(turnOnLoading());

    if (!commentString) {
      setCommentErrorMessage("Please add a comment");
      return dispatch(turnOffLoading());
    }

    try {
      const info = {
        comment: commentString,
      };

      const response = await postToAPI(
        `/api/addcomment/${user.username}/${post._id}`,
        info,
        {}
      );

      getPost();

      setCommentString("");

      setIsInputFocused(false);

      dispatch(turnOffLoading());
      dispatch(turnOnShowCheckmark());

      setTimeout(() => {
        dispatch(turnOffShowCheckmark());
      }, 1000);
    } catch (error) {
      dispatch(turnOffLoading());

      console.log(error);
    }
  };

  const deleteComment = async (id, commentId) => {
    dispatch(turnOnDeleteCommentLoader(id));

    try {
      const response = await deleteFromAPI(
        `/api/deletecomment/${commentId}/${post._id}`
      );

      getPost();
      setTimeout(() => {
        dispatch(turnOffDeleteCommentLoader(id));
      }, 1000);
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
      <div
        className={`mx-auto pb-20 relative flex flex-col justify-center pt-8 border-l-2 border-r-2 border-[#c4dfec] ${
          sentPost ? "w-[450px]" : "w-[600px]"
        } `}
      >
        {sentPost ? (
          <Link to={`/u/${post._id}`}>
            <img id="imageDiv" src={imageUrl} className="w-[450px]" />
          </Link>
        ) : (
          <img src={imageUrl} className="w-[600px] peer" />
        )}

        {/* Delete button if own post */}
        {selfPost && (
          <div
            className={` absolute top-2 right-2 flex opacity-0 cursor-pointer border-2 hover:border-[#4CADDA] border-white bg-[#58c1de] h-8 w-8 peer-hover:opacity-100 hover:opacity-100 flex-row justify-center items-center rounded-full transition-all duration-150 ease-in hover:bg-[#4CADDA] ${
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
                likePostAction && "scale-[1.17]"
              }  transform-all duration-75 ease-in-out 	`}
              fill={`${isLiked ? "#4CADDA" : "#ffffff"}`}
            >
              <path
                stroke={`${isLiked ? "#4CADDA" : "black"}`}
                className="transform-all duration-50 ease-linear"
                strokeWidth="45"
                d="M721 936H254V424l278-288 33 26q11 8 14.5 18t3.5 23v10l-45 211h322q23 0 41.5 18.5T920 484v82q0 11-2.5 25.5T910 617L794 885q-9 21-29.5 36T721 936ZM194 424v512H80V424h114Z"
              />
            </svg>
          </button>
        </div>
        {!sentPost && (
          <div className="pt-6 px-2 flex flex-col gap-1 ">
            {/* Add Comment Section */}
            <div className="flex flex-row justify-between">
              {/* Comment Input fields */}

              <div className=" w-3/4">
                <textarea
                  ref={commentTextAreaRef}
                  id="inputTextArea"
                  // placeholder="Add a comment"
                  className={`${
                    isInputFocused ? "h-20" : `h-8`
                  } border-b-2 border-blue-500 w-full outline-none`}
                  value={commentString}
                  onChange={(e) => {
                    setCommentString(e.target.value);
                    setCommentErrorMessage("default");
                  }}
                  onFocus={() => {
                    setIsInputFocused(true);
                  }}
                  onBlur={() => !commentString && setIsInputFocused(false)}
                  placeholder="Add a comment"
                />
                <p
                  className={`${
                    commentErrorMessage !== "default" ? "block" : "invisible"
                  } text-red-500 text-sm leading-3`}
                >
                  {commentErrorMessage}
                </p>
              </div>

              {/* <button className="border-2 w-1/5 h-8">Add</button> */}
              <button
                className=" relative  h-10 w-24 font-medium group flex flex-row items-center justify-center "
                onClick={addComment}
                disabled={isLoading || showCheckmark}
              >
                <span
                  className={`absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#4CADDA] group-hover:-translate-x-0 group-hover:-translate-y-0 ${
                    (isLoading || showCheckmark) &&
                    "-translate-x-0 -translate-y-0"
                  }`}
                ></span>
                <span
                  className={`absolute inset-0 w-full h-full  border-2 border-[#4CADDA] group-hover:bg-[#4CADDA]
          ${isLoading || showCheckmark ? "bg-[#4CADDA]" : "bg-white"}
          `}
                ></span>
                <span className="relative text-black group-hover:text-white font-display font-semibold">
                  {isLoading || showCheckmark ? (
                    <div>
                      {isLoading && (
                        <span className="relative w-full">
                          <span className=" flex flex-row justify-center items-center transition-all duration-1000">
                            <ColorRing
                              visible={true}
                              height={`${isLoading ? "32" : "0"}`}
                              width={`${isLoading ? "32" : "0"}`}
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={[
                                "#ffffff",
                                "#ffffff",
                                "#ffffff",
                                "#ffffff",
                                "#ffffff",
                              ]}
                            />
                          </span>
                        </span>
                      )}
                      {showCheckmark && (
                        <span className="h-[30px] w-[30px] text-white flex justify-center items-center">
                          <svg
                            className="checkmark"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="8 9 35 35"
                          >
                            <path
                              className="checkmark__check"
                              fill="none"
                              d="M14.1 27.2l7.1 7.2 16.7-16.8"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  ) : (
                    <p>Comment</p>
                  )}
                </span>
              </button>
            </div>

            {/* Comment Section */}
            <div className="pt-2 flex flex-col gap-3">
              {post?.comments
                ?.map((comment, id) => (
                  <div
                    key={id}
                    className=" flex flex-row gap-[10px] items-center"
                  >
                    <p className="font-semibold text-md self-start justify-start">
                      {comment.username}
                    </p>
                    <div>
                      <p className="text-sm">{comment.comment}</p>
                      <button
                        className={`h-4 w-8 text-xs text-[#4CADDA] mt-1 ${
                          comment.username !== user.username && "invisible"
                        } flex flex-row items-center justify-center`}
                        onClick={() => deleteComment(id, comment._id)}
                        disabled={deleteCommentLoader && deleteCommentLoader.length > 0 && deleteCommentLoader.includes(id)}
                      >
                        {(deleteCommentLoader && deleteCommentLoader.length > 0 && deleteCommentLoader.includes(id)) ? (
                          <ColorRing
                            visible={true}
                            height="15"
                            width="15"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={[
                              "#4CADDA",
                              "#4CADDA",
                              "#4CADDA",
                              "#4CADDA",
                              "#4CADDA",
                            ]}
                          />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </div>
                ))
                .reverse()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
