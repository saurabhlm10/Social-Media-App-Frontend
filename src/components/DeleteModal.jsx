import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { turnOffDeleteModal } from "../features/mainSlice";
import { deleteFromAPI } from "../utils/deleteFromAPI";
import "./deletemodal.css";

const DeleteModal = ({ postId, post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onDeletePost = async () => {
    const username = Cookies.get("username");

    const response = await deleteFromAPI(postId, post.imageName)

    if (response.status === 201) {
        navigate(`/${username}`);
    }

    dispatch(turnOffDeleteModal());

  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h3>Are You Sure?</h3>
        <div className="modal-btn-container">
          <button
            className="modal-cancel-btn"
            onClick={() => {
              dispatch(turnOffDeleteModal());
            }}
          >
            Cancel
          </button>
          <button className="modal-confirm-btn" onClick={onDeletePost}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
