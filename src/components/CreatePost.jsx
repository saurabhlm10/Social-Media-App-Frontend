import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { postToAPI } from "../utils/postToAPI";
import {
  turnOffLoading,
  turnOffShowCheckmark,
  turnOnLoading,
  turnOnShowCheckmark,
} from "../features/mainSlice";

import { ColorRing } from "react-loader-spinner";

const CreatePost = () => {
  const [loadedFileUrl, setLoadedFileUrl] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [invalidInput, setInvalidInput] = useState(false);

  const fileRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, user, showCheckmark } = useSelector((state) => state.main);

  const loadFile = (e) => {
    setCurrentImage(e.target.files[0]);
    setLoadedFileUrl(URL.createObjectURL(e.target.files[0]));
  };

  const deleteImage = () => {
    setCurrentImage(null);
    setLoadedFileUrl(null);
  };

  const addPost = async () => {
    dispatch(turnOnLoading());

    if (!currentImage) {
      setInvalidInput(true)
      return dispatch(turnOffLoading());
    }

    const userId = Cookies.get("userId");
    const username = user.username;

    const formData = new FormData();
    formData.append("image", currentImage);
    formData.append("userId", userId);
    formData.append("username", username);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await postToAPI("/api/addpost", formData, headers);

      dispatch(turnOffLoading());

      dispatch(turnOnShowCheckmark());
      setTimeout(() => {
        navigate(`/u/${response.data.post._id}`);
        dispatch(turnOffShowCheckmark());
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInvalidInput(false);
  }, [currentImage]);

  return (
    <div className="flex flex-row justify-center ">
      <div className="flex flex-col pt-4 items-center">
        <p
          className={`text-red-300 text-sm mb-1 ${
            invalidInput ? "block" : "invisible"
          }`}
        >
          Please add a file
        </p>
        {loadedFileUrl ? (
          <div className="relative flex justify-center items-center w-[450px] h-[450px] shadow group">
            <img src={loadedFileUrl} className="object-contain w-full h-full" />
            <div className={` absolute top-2 right-2 flex opacity-0 cursor-pointer border-2 hover:border-[#4CADDA] border-white bg-[#58c1de] h-8 w-8 group-hover:opacity-100 flex-row justify-center items-center rounded-full transition-all duration-150 ease-in hover:bg-[#4CADDA] ${(isLoading || showCheckmark) && 'hidden'}`}>
              <span
                className="material-symbols-outlined text-white"
                onClick={deleteImage}
              >
                delete
              </span>
            </div>
          </div>
        ) : (
          <div className="group">
            <input
              type="file"
              ref={fileRef}
              id="imageInput"
              name="filename"
              accept="images/*"
              onChange={(e) => loadFile(e)}
              className="hidden"
            />
            <div className="font-display flex flex-row justify-center items-center text-[#58c1de] group-hover:text-[#4CADDA]">
              <label
                htmlFor="imageInput"
                className="border-4 border-[#58c1de] group-hover:border-[#4CADDA] transition-all duration- 50 ease-in w-[450px] h-[450px] rounded-[12px] cursor-pointer text-lg flex flex-col items-center justify-center"
              >
                <i className="material-icons text-3xl transition-colors duration-50 ease-in ">
                  add_a_photo
                </i>
                <div className="transition-all duration-50 ease-in">
                  Upload Image
                </div>
              </label>
            </div>
          </div>
        )}
        <button
          className="mt-6 relative  h-10 w-24 font-medium group flex flexirow items-center justify-center "
          onClick={addPost}
          disabled={isLoading || showCheckmark}
        >
          <span
            className={`absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#4CADDA] group-hover:-translate-x-0 group-hover:-translate-y-0 ${
              (isLoading || showCheckmark) && "-translate-x-0 -translate-y-0"
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
                      {/* <span className=" absolute top-0 left-0 bottom-0 flex items-center transition-all duration-1000"> */}
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
                  // <span className="relative border-2">
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
                  // </span>
                )}
              </div>
            ) : (
              <p>Add Post</p>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
