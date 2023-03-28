import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { postToAPI } from "../utils/postToAPI";

const CreatePost = () => {
  const [loadedFileUrl, setLoadedFileUrl] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [invalidInput, setInvalidInput] = useState(false);

  const fileRef = useRef();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.main);

  const loadFile = (e) => {
    setCurrentImage(e.target.files[0]);
    setLoadedFileUrl(URL.createObjectURL(e.target.files[0]));
  };

  const deleteImage = () => {
    setCurrentImage(null);
    setLoadedFileUrl(null);
  };

  const addPost = async () => {
    try {
      if (!currentImage) {
        return setInvalidInput(true);
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

      const response = await postToAPI("/api/addpost", formData, headers);

      navigate(`/u/${response.data.post._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInvalidInput(false)
  }, [currentImage])
  

  return (
    <div className="flex flex-row justify-center ">
      <div className="flex flex-col pt-4 items-center">
        <p className={`text-red-300 text-sm mb-1 ${invalidInput ? "block" : "invisible"}`}>Please add a file</p>
        {loadedFileUrl ? (
          <div className="relative flex items-center w-[450px] h-[450px] shadow group">
            <img src={loadedFileUrl} className="w-full" />
            <div className=" absolute top-2 right-2 flex opacity-0 cursor-pointer border-2 hover:border-[#4CADDA] border-white bg-[#58c1de] h-8 w-8 group-hover:opacity-100 flex-row justify-center items-center rounded-full transition-all duration-150 ease-in hover:bg-[#4CADDA]">
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
            <div className="testingFeature1 font-display flex flex-row justify-center items-center text-[#58c1de] group-hover:text-[#4CADDA]">
              <label
                htmlFor="imageInput"
                className="border-4 border-[#58c1de] group-hover:border-[#4CADDA] transition-all duration- 50 ease-in w-[450px] h-[450px] rounded-[12px] cursor-pointer text-lg flex flex-col items-center justify-center"
              >
                {/* <i className="material-icons text-3xl "> */}
                <i className="material-icons text-3xl transition-colors duration-50 ease-in ">
                  add_a_photo
                </i>
                <div className="transition-all duration-50 ease-in">
                  {/* <div className=""> */}
                  Upload Image
                </div>
              </label>
            </div>
          </div>
        )}
        <button
          className="mt-6 relative inline-block px-4 py-2 font-medium group "
          onClick={addPost}
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#4CADDA] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-[#4CADDA] group-hover:bg-[#4CADDA]"></span>
          <span className="relative text-black group-hover:text-white font-display font-semibold">
            Add Post
          </span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
