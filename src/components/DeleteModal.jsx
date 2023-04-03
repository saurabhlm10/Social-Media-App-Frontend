import Cookies from "js-cookie";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  turnOnShowCheckmark,
  turnOffShowCheckmark,
  turnOnLoading,
  turnOffLoading,
  turnOffDeleteModal,
  mainState,
} from "../features/mainSlice";
import { deleteFromAPI } from "../utils/deleteFromAPI";
import { ColorRing } from "react-loader-spinner";

import "./deletemodal.css";

const DeleteModal = ({ postId, post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalRef = useRef();
  const cancelButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const headingRef = useRef(null);

  const pRef = useRef(null);

  const { isLoading, showCheckmark, deleteModalOpen } = useSelector(mainState);

  const onDeletePost = async () => {
    try {
      dispatch(turnOnLoading());

      const username = Cookies.get("username");

      const response = await deleteFromAPI(postId, post.imageName);

      if (response.status === 201) {
        dispatch(turnOffLoading());
        dispatch(turnOnShowCheckmark());
        setTimeout(() => {
          dispatch(turnOffShowCheckmark());
          navigate(`/${username}`);
          dispatch(turnOffDeleteModal());
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      dispatch(turnOffLoading());
      dispatch(turnOffDeleteModal());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (!modalRef.current) {
      return;
    } else if (cancelButtonRef.current.isEqualNode(e.target)) {
      return;
    } else if (
      confirmButtonRef.current.contains(e.target) ||
      confirmButtonRef.current.isEqualNode(e.target) ||
      pRef.current.isEqualNode(e.target)
    ) {
      return;
    } else if (
      modalRef.current.isEqualNode(e.target) ||
      headingRef.current.isEqualNode(e.target)
    ) {
      return;
    } else {
      dispatch(turnOffDeleteModal());
    }
  }

  return (
    <div className="modal-container font-display font-semibold ">
      <div
        className="border-2 border-[#4CADDA] shadow-[#4CADDA] h-48 w-80 rounded-md flex flex-col items-center justify-between py-4 bg-white"
        ref={modalRef}
      >
        <h3 ref={headingRef}>Are You Sure?</h3>
        <div className="flex flex-row justify-between gap-[20px]">
          <button
            className="h-12 w-28 text-black border-2 border-[#4CADDA] bg-white  rounded-full py-2 px-4 text-2xl flex flex-row justify-center items-center"
            onClick={() => {
              dispatch(turnOffDeleteModal());
            }}
            disabled={isLoading || showCheckmark}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
          <button
            className={` h-12 w-28 text-white border-2 border-[#4CADDA] bg-[#4CADDA]  hover:text-black rounded-full text-2xl flex flex-row justify-center items-center ${
              isLoading || showCheckmark
                ? "hover:bg-[#4CADDA]"
                : "hover:bg-white"
            }`}
            disabled={isLoading || showCheckmark}
            ref={confirmButtonRef}
            onClick={onDeletePost}
          >
            <span className=" relative text-black group-hover:text-white font-display font-semibold">
              {isLoading || showCheckmark ? (
                <div>
                  {isLoading && (
                    <span className="relative w-full">
                      <span className="transition-all duration-1000">
                        <ColorRing
                          visible={true}
                          height={`${isLoading ? "35" : "0"}`}
                          width={`${isLoading ? "35" : "0"}`}
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
                    <span className="h-[30px] w-[30px] text-black flex justify-center items-center">
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
                <p className="" ref={pRef}>
                  Confirm
                </p>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
