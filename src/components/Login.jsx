import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  turnOnLogin,
  turnOnLoading,
  turnOffLoading,
  setUser,
  turnOffFollowLoader,
} from "../features/mainSlice";
import Cookies from "js-cookie";
import { postToAPI } from "../utils/postToAPI";

const Login = () => {
  const [username, setUsername] = useState("saurabh25");
  const [password, setPassword] = useState("12345678");
  const [invalidInputArray, setInvalidInputArray] = useState([]);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("default");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("default");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      let err = [...invalidInputArray];

      dispatch(turnOnLoading());

      if (!username) {
        err.push("username");
        setUsernameErrorMessage("Please Enter Username");
      }

      if (!password) {
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
    } catch (error) {
      console.log("error", error);
    }

    try {
      const accountInfo = {
        username,
        password,
      };

      const response = await postToAPI("/api/loginuser", accountInfo);

      Cookies.set("jwt_token", response.data.token, { expires: 1 });
      Cookies.set("userId", response.data.user._id, { expires: 1 });
      Cookies.set("username", response.data.user.username, { expires: 1 });

      navigate("/");

      dispatch(setUser(response.data.user));

      dispatch(turnOnLogin());
      dispatch(turnOffLoading());
    } catch (error) {
      dispatch(turnOffLoading());

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
    <div className="h-screen flex flex-row justify-center items-center">
      <div className="flex flex-col gap-[2px]">
        <div>
          <input
            className="border-2 border-slate-200 rounded h-8 w-96 outline-none"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value.toLowerCase());
              const tempIncompleteInputArray = invalidInputArray.filter(
                (arrItem) => arrItem != "username"
              );
              setInvalidInputArray([...tempIncompleteInputArray]);
            }}
          />
          <div
            className={`text-red-300 text-xs ${
              invalidInputArray.includes("username") ? "block" : "invisible"
            }`}
          >
            <div>{usernameErrorMessage}</div>
          </div>
        </div>
        <div>
          <input
            className="border-2 border-slate-200 rounded h-8 w-96 outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              const tempIncompleteInputArray = invalidInputArray.filter(
                (arrItem) => arrItem != "password"
              );
              setInvalidInputArray([...tempIncompleteInputArray]);
            }}
          />
          <div
            className={`text-red-300 text-xs ${
              invalidInputArray.includes("password") ? "block" : "invisible"
            }`}
          >
            <div>{passwordErrorMessage}</div>
          </div>
        </div>
        <button
          className="bg-slate-900 px-4 py-2 text-white rounded-lg"
          onClick={onLogin}
        >
          Login
        </button>
        <p className="text-center mt-2">
          New here? &nbsp;
          <Link to="/u/createaccount" className="text-cyan-700">
            Create an account.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
