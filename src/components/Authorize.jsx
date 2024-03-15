import React, { useContext } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { instance } from "../utils/axios";
import AppContext from "../context/AppContext";
export const Authorize = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const { register, control, handleSubmit, reset } = useForm();
  const handleSubmitForm = async (data) => {
    if (location.pathname === "/signin" || location.pathname === "/") {
      const { username, password } = data;
      try {
        const result = await instance.post("/User/Login", null, {
          params: {
            username,
            password,
          },
        });
        setUser(result.data);
        reset();
        navigate("/chatmainpage");
      } catch (error) {
        console.log("In /User/Login: ", error);
      }
    } else {
      const { username, confirmPassword, password } = data;
      if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        reset();
      } else {
        try {
          const result = await instance.post("/User/Register", null, {
            params: {
              username,
              password,
            },
          });
          setUser(result.data);
          reset();
          navigate("/chatmainpage");
        } catch (error) {
          console.log("In /User/Register :", error);
        }
      }
    }
  };
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mt-6">
            <Link
              to={"/signin"}
              onClick={reset}
              className={`w-1/3 pb-4 font-medium text-center 
              text-gray-500 capitalize border-b ${
                location.pathname === "/signin" || location.pathname === "/"
                  ? "border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
                  : "border-b dark:border-gray-400 dark:text-gray-300"
              } 
              `}
            >
              sign in
            </Link>

            <Link
              to={"/signup"}
              onClick={reset}
              className={`w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2  ${
                location.pathname === "/signup"
                  ? "border-blue-500 dark:border-blue-400 dark:text-white"
                  : "border-b dark:border-gray-400 dark:text-gray-300"
              }`}
            >
              sign up
            </Link>
          </div>
          {location.pathname === "/" || location.pathname === "/signin" ? (
            <SignIn
              register={register}
              control={control}
              submit={handleSubmit(handleSubmitForm)}
            />
          ) : (
            <SignUp
              register={register}
              control={control}
              submit={handleSubmit(handleSubmitForm)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
