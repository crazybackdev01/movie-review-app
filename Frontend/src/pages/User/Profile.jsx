import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useProfileMutation } from "../../redux/api/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfileApi, { isLoading }] = useProfileMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords should be Matched");
    } else {
      try {
        const res = await updateProfileApi({
          _id: userInfo.userId,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-4 rounded-sm w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-4 rounded-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-input p-4 rounded-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-input p-4 rounded-sm w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-teal-500 w-screen mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600"
                  disabled={isLoading}
                >
                  Update
                </button>

                {isLoading && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
