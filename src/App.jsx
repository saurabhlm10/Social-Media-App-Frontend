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
  const { isLoggedIn, isLoading, user, deleteModalOpen } =
    useSelector(mainState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkLogin = () => {
    if (
      Cookies.get("jwt_token") === undefined &&
      location.pathname !== "/u/createaccount"
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
            <div className="flex flex-row justify-center w-full ">
              <div className="pt-4">
                <Posts />
              </div>
            </div>
            <div className="fixed top-2 right-2">
                <Link
                  to={`/${user?.username}`}
                  className="relative  inline-flex rounded-full group overflow-hidden bg-[#4CADDA] text-purple-600 inline-block"
                >
                  <span className=" absolute inline-flex top-0 left-0 flex w-full h-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
                  <span className="relative inline-flex group-hover:text-white">
                    <span className="inline-flex material-symbols-outlined text-white  text-6xl">
                      account_circle
                    </span>
                  </span>
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
            <div className="">{deleteModalOpen && <DeleteModal />}</div>
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
            {/* {isLoading && (
              <div className="full-screen-loading-background">
                <div className="pos-center">
                  <Spinner />
                </div>
              </div>
            )} */}
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
