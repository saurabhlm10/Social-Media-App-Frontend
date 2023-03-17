import { useState, useEffect } from "react";
import "./App.css";
import Posts from "./components/Posts";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import CreateUser from "./components/CreateAccount";
import Spinner from "./components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import Cookies from "js-cookie";
import { turnOnLogin, setUser } from "./features/mainSlice";
import Profile from "./components/Profile";
import { mainState } from "./features/mainSlice";

import DeleteModal from "./components/DeleteModal";

function App() {
  const { isLoggedIn, isLoading, user, deleteModalOpen } = useSelector(mainState);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const checkLogin = () => {
    if (
      Cookies.get("jwt_token") === undefined &&
      location.pathname !== "/register"
    ) {
      navigate("/u/login");
    } else {
      dispatch(turnOnLogin());
      const userId = Cookies.get("userId");
    }
  };

  useEffect(() => {
    checkLogin();
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Sidebar />
            <div className="flex flex-row justify-center w-full border-2 ">
              <div className="pt-4">
                <Posts />
              </div>
            </div>
            <div className="fixed top-0 right-0">
              <Link to={`/${user?.username}`}>
                <h1>PROFILE</h1>
              </Link>
            </div>
          </>
        }
      />

      <Route
        path="/createpost"
        element={
          <>
            <div>

              <Link to="/">
                <div className="mt-4 ml-4 absolute text-3xl">LOGO</div>
              </Link>
              <CreatePost />
            </div>
          </>
        }
      />
      <Route
        path="/u/:postId"
        element={
          <>

          <div className="">

            {deleteModalOpen && <DeleteModal/>}
          </div>
            <Link to="/">
              <div className="mt-4 ml-4 absolute text-3xl">LOGO</div>
            </Link>
            <Post />
          </>
        }
      />
      <Route
        path="/u/createaccount"
        element={
          <>
            {isLoading && (
              <div className="full-screen-loading-background">
                <div className="pos-center">
                  <Spinner />
                </div>
              </div>
            )}
            <CreateUser />
          </>
        }
      />
      <Route
        path="/u/login"
        element={
          <>
            {isLoading && (
              <div className="full-screen-loading-background">
                <div className="pos-center">
                  <Spinner />
                </div>
              </div>
            )}
            <Login />
          </>
        }
      />

      <Route path={`/:username`} element={<Profile />} />
    </Routes>
  );
}

export default App;
