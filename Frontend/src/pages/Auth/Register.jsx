import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/user.js";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [registerApi, { isLoading }] = useRegisterMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await registerApi({ username, email, password }).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User registered successfully");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form className="container w-[40rem]" onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your Name"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              className="mt-1 p-2 border rounded w-full"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="mt-1 p-2 border rounded w-full"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Password"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="mt-1 p-2 border rounded w-full"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Confirm Password"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register Yourself"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-teal-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-[65rem] w-[55%] xl:block md:hidden sm:hidden rounded-lg"
      /> */}
    </div>
  );
};

export default Register;
