import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  turnOffLogin,
  setTempUser,
  setUser,
  turnOnFollowLoader,
  turnOffFollowLoader,
  mainState,
} from "../features/mainSlice";
import Cookies from "js-cookie";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getFromAPI } from "../utils/getFromAPI";

import { Oval } from "react-loader-spinner";
import { postToAPI } from "../utils/postToAPI";
import { putToAPI } from "../utils/putToAPI";

const Profile = () => {
  const { followLoader, user, tempUser } = useSelector(mainState);

  const usernameCheck = useParams().username;

  const username = Cookies.get("username");

  const [selfProfile, setSelfProfile] = useState(false);

  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFollow = async () => {
    try {
      const foreignUsername = usernameCheck

      dispatch(turnOnFollowLoader());

      const response = await putToAPI(`/api/addremovefollower/${username}/${foreignUsername}`)

      switch(response.status){
        case 201:
          dispatch(setUser(response.data.removeFromFollowingListResponse))
          dispatch(setTempUser(response.data.removeFromFollowersListResponse))
          break;
        case 202:
          dispatch(setUser(response.data.addToFollowingListResponse))
          dispatch(setTempUser(response.data.addToFollowersListResponse))
          break;
      }

      getUserPosts(tempUser.username)

      dispatch(turnOffFollowLoader());

    } catch (error) {
      console.log(error);
    }
  };

  const getForeignUser = async (username) => {
    try {
      const response = await getFromAPI(`/api/getuser/${username}`)

      // console.log(response)

      dispatch(setTempUser(response.data));
      getUserPosts(tempUser.username)

    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async (username) => {
    try {

      const response = await getFromAPI(`/api/getuserposts/${username}`)

      setPosts([...response.data.posts]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkSelf = async () => {
    const tempUsername = Cookies.get("username");

    let selfProfile2;

    if (usernameCheck === tempUsername) {
      selfProfile2 = true;
      setSelfProfile(true);
    }

    selfProfile2 ? getUserPosts(tempUsername) : getForeignUser(usernameCheck);
  };

  const onLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("userId");
    Cookies.remove("username");
    dispatch(turnOffLogin());
    navigate("/u/login");

    dispatch(setUser({}));
  };

  useEffect(() => {
    checkSelf();
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <div>
        <h1 className="text-2xl mt-4">{usernameCheck}</h1>
        <div className="flex flex-row gap-[50px] mt-6">
          {selfProfile ? (
            <>
              <b>{user?.followers?.length} followers</b>
              <b>{user?.following?.length} following</b>
            </>
          ) : (
            <>
              <b>{tempUser?.followers?.length} followers</b>
              <b>{tempUser?.following?.length} following</b>
            </>
          )}
        </div>
      </div>
      {selfProfile ? (
        <button
          className="border-2 border-black px-1 py-0.5 mt-4 w-32 text-lg"
          onClick={onLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className={` ${
            tempUser?.followers?.includes(username)
              ? "bg-slate-200"
              : "bg-blue-200"
          }  px-1 py-0.5 mt-4 w-32 text-lg flex flex-row justify-center items-center h-8`}
          onClick={onFollow}
        >
          {/* {false ? ( */}
          {followLoader ? (
            <Oval
              height={20}
              width={20}
              color="#1B98F5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="##3944F7"
              strokeWidth={5}
              strokeWidthSecondary={5}
            />
          ) : (
            <div>{tempUser?.followers?.includes(username) ? 'Following' : 'Follow'}</div> 
          )}
        </button>
      )}

      {/* POSTS---------------------------- */}
      <div className="h-[2px] w-96 bg-black mt-6"></div>

      <div className="mt-4">
        {posts.length ? (
          <div className="grid grid-cols-3	gap-[10px]">
            {posts.map((post, id) => (
              <Link to={`/u/${post._id}`} key={id}>
                <div className="w-[200px] h-[200px] overflow-hidden	flex flex-row justify-center items-center">
                  <img
                    src={`${post.imageUrl}`}
                    alt="post"
                    className=" h-full object-cover	"
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="h-[300px] w-[500px] flex flex-col justify-center items-center text-3xl">
            <span className="material-symbols-outlined flex flex-row justify-center items-center text-3xl">
              photo_camera
            </span>
            <br />
            <div className="">No Posts</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
