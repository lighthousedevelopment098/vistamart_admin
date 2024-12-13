

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { login, selectAuthLoading, selectAuthError } from "../../redux/slices/admin/authSlice";

const LoginPage = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        toast.success("Login successful");
        setIsLoggedIn(true); // Set logged in state to true
        navigate("/");
        // Save email and password if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }
      } else {
        toast.error(resultAction.payload || "Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Automatically populate email and password if they were remembered
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
    if (rememberedPassword) {
      setPassword(rememberedPassword);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md lg:max-w-lg">
        <ToastContainer />
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold">Sign in</h1>
            {/* <span className="text-gray-500">(Admin Login)</span> */}
          </div>
          <div className="form-group">
            <label className="input-label" htmlFor="email">
              Your email
            </label>
            <input
              type="email"
              className="form-control form-control-lg mb-4 p-3 rounded border border-gray-300 outline-none w-full"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email" // Added autocomplete attribute
            />
          </div>
          <div className="form-group">
            <label className="input-label " htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-lg mb-4 p-3 rounded border border-gray-300 w-full
                outline-none
                "
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
              </button>
            </div>
          </div>
          <div className="form-group mb-4">
            <div className="custom-control custom-checkbox flex items-center justify-center gap-1">
              <input
                type="checkbox"
                className="custom-control-input"
                id="rememberMe"
                name="remember"
                checked={rememberMe}
                // onChange={handleRememberMeChange}
              />
              <label
                className="custom-control-label text-gray-500 mt-2"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>
          </div>
          {/* <div
            id="recaptcha_element"
            className="w-full mb-0"
            style={{ height: "100px" }}
          ></div> */}
          <button
            type="submit"
            className={`btn btn-block p-3 rounded bg-primary-500 hover:bg-primary-dark-500 hover:text-black text-white font-semibold mt-0 ${loading ? "opacity-50 cursor-not-allowed" : ""}` }
            disabled={loading} // Disable button while loading
           style={{color:"white"}}
       >
            {loading ? "Loading..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      <div className="text-center mt-4 flex flex-col gap-3">
  <Link to="/forgot-password" className="text-primary hover:underline"
  >
    Forgot Password By Email?
  </Link>
 
 
</div>
      </div>
    </div>
  );
};

export default LoginPage;
