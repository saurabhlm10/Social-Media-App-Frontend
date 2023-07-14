import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import Posts from "./components/Posts";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
// import CreateUser from "./components/CreateUser";
import { useSelector, useDispatch } from "react-redux";
// import Login from "./components/Login";
import Cookies from "js-cookie";
import { turnOnLogin, setUser } from "./features/mainSlice";
import Profile from "./components/Profile";
import { mainState } from "./features/mainSlice";
import Search from "./components/Search";
// import DeleteModal from "./components/DeleteModal";

const CreateUser = lazy(() => import("./components/CreateUser"));

const CreatePost = lazy(() => import("./components/CreatePost"));

const Login = lazy(() => import("./components/Login"));

const DeleteModal = lazy(() => import("./components/DeleteModal"));

function App() {
  const { isLoggedIn, isLoading, user, deleteModalOpen, showCheckmark } =
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
                className="relative  inline-flex rounded-full group overflow-hidden bg-[#4CADDA] text-purple-600"
              >
                <span className=" absolute inline-flex top-0 left-0  w-full h-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90 border-black"></span>
                <span className="relative inline-flex group-hover:text-white">
                  <span className="inline-flex material-symbols-outlined text-white  text-6xl ">
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
              <Link to="/" disabled={isLoading || showCheckmark}>
                <div className="font-head font-bold mt-4 ml-4 absolute text-3xl">
                  LOGO
                </div>
              </Link>
              <Suspense fallback={<h1>Loading...</h1>}>
                <CreatePost />
              </Suspense>
            </div>
          </>
        }
      />
      <Route
        path="/u/:postId"
        element={
          <>
            {deleteModalOpen && (
              <Suspense fallback={<h1>Loading...</h1>}>
                <DeleteModal />
              </Suspense>
            )}
            {/* <DeleteModal /> */}
            <Link to="/">
              <div className="font-head font-semibold mt-4 ml-4 absolute text-3xl">
                LOGO
              </div>
            </Link>
            <Sidebar />
            <Post />
          </>
        }
      />
      <Route
        path="/u/createaccount"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <CreateUser />
          </Suspense>
        }
      />
      <Route
        path="/u/login"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={`/:username`}
        element={
          <>
            <Sidebar />
            <Profile />
          </>
        }
      />
      <Route
        path="/deletemodal"
        element={
          <Suspense fallback={<h1>Loading...</h1>}>
            <DeleteModal />
          </Suspense>
        }
      />
      <Route
        path="/u/search"
        element={
          <>
            <Sidebar />
            <div className="z-50">
              <Search />
            </div>
          </>
        }
      />
    </Routes>
  );
}

export default App;
