import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Passwordinput from '../../components/Input/Passwordinput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'

const Login = () => {
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async(e) => {
    e.preventDefault();
  

  if(!validateEmail(Email)) {
    setError("please enter a valid Email address");
    return;
  }

  if(!Password) {
    setError("please enter the Password");
    return;
  }
  setError(null);

  try {
    const response = await axiosInstance.post("/", {
      Email: Email,
      Password: Password,
    });
    if(response.data && response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    }
  } catch(error) {
    if(error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    }else {
      setError("an unexpected error occured please try again");
    }
  }
};
  return (
    <>
      <Navbar />
      {/* <div className='flex items-center justify-center mt-28 px-4'>
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input type="text" value={Email} placeholder="Email" className="input-box"
            onChange={(e) => setEmail(e.target.value)} />
            
            <Passwordinput  
            value={Password}
            onChange={(e) => setPassword(e.target.value)} />

            {error && <p className="text-red-500 text xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
           </button>


           <p className="text-sm text-center mt-4">Not registered yet? {" "}
            <Link to="/signUp" className="font-medium text-blue-500 underline">
            create an Account
            </Link>

           </p>

          </form>
        </div>

      </div> */}



      <div className='flex items-center justify-center mt-28 px-4'>
  <div className="w-95 max-w-sm sm:max-w-md md:max-w-lg border rounded bg-white px-5 py-8">
    <form onSubmit={handleLogin}>
      <h4 className="text-2xl mb-7">Login</h4>
      <input type="text" value={Email} placeholder="Email" className="input-box"
        onChange={(e) => setEmail(e.target.value)} />
      
      <Passwordinput  
        value={Password}
        onChange={(e) => setPassword(e.target.value)} />

      {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

      <button type="submit" className="btn-primary">Login</button>

      <p className="text-sm text-center mt-4">
        Not registered yet?{" "}
        <Link to="/signUp" className="font-medium text-blue-500 underline">
          create an Account
        </Link>
      </p>
    </form>
  </div>
</div>


    </>
  )
}

export default Login
