

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Passwordinput from '../../components/Input/Passwordinput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(Email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!Password) {
      setError("Please enter the password");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/createuser", {
        fullName,
        Email,
        Password,
      });

      if (response.data && response.data.accessToken) {
        toast.success("Account created successfully!");
        localStorage.setItem("token", response.data.accessToken);
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      {/* <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10"> */}
  <div className='flex items-center justify-center mt-28 px-4'>
  <div className="w-95 max-w-sm sm:max-w-md md:max-w-lg border rounded bg-white px-5 py-8">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>

            <input
              type="text"
              value={fullName}
              placeholder="Full Name"
              className="input-box"
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="text"
              value={Email}
              placeholder="Email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Passwordinput
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="font-medium text-blue-500 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
