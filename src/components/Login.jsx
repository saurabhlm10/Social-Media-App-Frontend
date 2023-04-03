import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  turnOnLogin,
  turnOnLoading,
  turnOffLoading,
  setUser,
  turnOnShowCheckmark,
  turnOffShowCheckmark,
  mainState,
} from "../features/mainSlice";
import Cookies from "js-cookie";
import { postToAPI } from "../utils/postToAPI";
import BG from "../assets/BG.png";
import { ColorRing } from "react-loader-spinner";

import './login.css'

const Login = () => {
  const [username, setUsername] = useState("saurabh25");
  const [password, setPassword] = useState("12345678");
  const [invalidInputArray, setInvalidInputArray] = useState([]);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("default");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("default");

  const { isLoading, showCheckmark } = useSelector(mainState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async () => {
      dispatch(turnOnLoading());

      const checkUsername = username.trim();
      const checkPassword = password.trim();

      setUsername(checkUsername);
      setPassword(checkPassword);

      let err = [...invalidInputArray];

      if (!checkUsername) {
        err.push("username");

        setUsernameErrorMessage("Please Enter Username");
      }

      if (checkUsername.length < 3 || checkUsername.length > 20) {
        err.push("username");

        setUsernameErrorMessage("Please Enter 3-20 characters");
      }

      const usernameRegex = new RegExp("/^[a-zA-Z0-9_-]{3,20}$/");

      if (usernameRegex.test(checkUsername) || checkUsername.includes(" ")) {
        err.push("username");

        setUsernameErrorMessage(
          "Username should only include letters, numbers, underscores and hyphens"
        );
      }

      if (!checkPassword) {
        err.push("password");

        setPasswordErrorMessage("Please Enter Password");
      } else if (password.length < 8 || password.length > 20) {
        err.push("password");

        setPasswordErrorMessage("Password should be 8-20 characters");
      }

      setInvalidInputArray((prev) => [...prev, ...err]);

      if (err.length > 0) {
        return dispatch(turnOffLoading());
      }
    

    try {
      const accountInfo = {
        username: checkUsername,
        password: checkPassword
      };

      const response = await postToAPI("/api/loginuser", accountInfo);

      Cookies.set("jwt_token", response.data.token, { expires: 1 });
      Cookies.set("userId", response.data.user._id, { expires: 1 });
      Cookies.set("username", response.data.user.username, { expires: 1 });


      dispatch(setUser(response.data.user));

      dispatch(turnOnLogin());
      dispatch(turnOffLoading());

      dispatch(turnOnShowCheckmark());

      dispatch(turnOnLogin());

      // navigate to home page
      setTimeout(() => {
        navigate("/");
        dispatch(turnOffShowCheckmark());
      }, 1500);


    } catch (error) {

      console.log('in error')
      dispatch(turnOffLoading());

      console.log(error)

      switch (error.response?.data.code) {
        case "402":
          setInvalidInputArray((prev) => [...prev, "username"]);

          setUsernameErrorMessage("User Is Not Registered");
          break;

        case "403":
          setInvalidInputArray((prev) => [...prev, "password"]);

          setPasswordErrorMessage("Password is Incorrect");
          break;
      }
    }
  };

  return (
    // Component container
    <div
      className={`h-screen flex flex-row justify-center items-center bg-cover bg-center`}
      style={{ backgroundImage: `url(${BG})` }}
    >
      {/* Form  */}
      <div
        className="flex flex-col gap-[2px] px-8 pt-8 pb-4 rounded-2xl shadow-xl backdrop-blur 
      bg-gradient-to-br from-white via-blue-50 to-[#e9fffc]"
      >
        {/* Logo  */}
        <h1 className="font-bold font-head text-center text-4xl ">LOGO</h1>

        {/* Username Input Field  */}
        <div className="mt-6 relative" data-te-input-wrapper-init>
          <input
            className="h[40px] w-[450px]  p-2 peer block min-h-[auto] rounded border-2 border-[#afe3f2]  bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transiztion-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
            type="text"
            id="usernameFormControlInput"
            placeholder="Username"
            value={username}
            disabled={isLoading}
            onChange={(e) => {
              setUsername(e.target.value.trim());
              const tempIncompleteInputArray = invalidInputArray.filter(
                (arrItem) => arrItem != "username"
              );
              setInvalidInputArray([...tempIncompleteInputArray]);
            }}
          />
          <label
            htmlFor="usernameFormControlInput"
            className={`text-[#4CADDA] pointer-events-none  absolute top-1.5 left-3 p-1 leading-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none peer-focus:text-[#4CADDA] ${
              username &&
              "-translate-y-[0.9rem] scale-[0.8] bg-  text-[#4CADDA]"
            }`}
          >
            Username
          </label>
          <div
            className={`text-red-300 text-xs ${
              invalidInputArray.includes("username") ? "block" : "invisible"
            }`}
          >
            <div>{usernameErrorMessage}</div>
          </div>
        </div>

        {/* Password Input Field  */}
        <div className="relative mt-2" data-te-input-wrapper-init>
          <input
            className=" h-[40px] w-[450px] p-2  peer block min-h-[auto] rounded border-2 border-[#afe3f2]  bg-transparent py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="passwordFormControlInput"
            type="password"
            placeholder="Password"
            value={password}
            disabled={isLoading}
            onChange={(e) => {
              setPassword(e.target.value);
              const tempIncompleteInputArray = invalidInputArray.filter(
                (arrItem) => arrItem != "password"
              );
              setInvalidInputArray([...tempIncompleteInputArray]);
            }}
          />
          <label
            htmlFor="passwordFormControlInput"
            className={` text-[#4CADDA] pointer-events-none absolute top-1.5 left-3 p-1 leading-3	  mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none  peer-focus:text-[#4CADDA] ${
              password && "-translate-y-[0.9rem] scale-[0.8] bg- text-[#4CADDA]"
            }`}
          >
            Password
          </label>
          <div
            className={`text-red-300 text-xs ${
              invalidInputArray.includes("password") ? "block" : "invisible"
            }`}
          >
            <div>{passwordErrorMessage}</div>
          </div>
        </div>

        {/* LOGIN Button  */}
        <button
          className="mt-2 text-center  relative inline-block  text-lg group w-full transition-all duration-1000 "
          onClick={onLogin}
          disabled={isLoading}
        >
          <span
            className={`relative z-10 block px-5 py-3 overflow-hidden font-bold leading-tight text-white transition-colors duration-300 ease-out border-2 border-white rounded-lg group-hover:text-white ${
              (isLoading || showCheckmark) && "text-white"
            }`}
          >
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-blue-500"></span>
            <span
              className={`absolute left-0 w-full h-[450px] transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[#6B4892] group-hover:-rotate-180 ${
                (isLoading || showCheckmark) && "-rotate-180"
              } ease`}
            ></span>
            <span className=" relative flex flex-row justify-center transition-all duration-1000 items-center  ">
              <span
                className={`transition-all duration-300 ${
                  (isLoading || showCheckmark) && "-ml-6"
                }`}
              >
                LOGIN
              </span>
              {showCheckmark && (
                <span className="relative">
                  <span className="absolute  -top-[15px] left-0 h-[30px] w-[30px] text-white flex items-center">
                    <svg
                      className="checkmark"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="2 8 40 40"
                    >
                      <path
                        className="checkmark__check"
                        fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      />
                    </svg>
                  </span>
                </span>
              )}

              {isLoading && (
                <span className="relative ">
                  <span className=" absolute top-0 left-0 bottom-0 flex items-center transition-all duration-1000">
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
            </span>
          </span>
          <span
            className={`absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-[#6B4892] rounded-lg group-hover:mb-0 group-hover:mr-0 ${
              (isLoading || showCheckmark) && "-mb-0 -mr-0"
            }`}
            data-rounded="rounded-lg"
          ></span>
        </button>

        {/* Login Link  */}
        <p
          className={`font-display ${
            isLoading && "pointer-events-none"
          } text-center mt-4`}
        >
          New here? &nbsp;
          <Link
            to="/u/createaccount"
            className="text-cyan-700"
            disabled={isLoading || showCheckmark}
          >
            Create An Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
