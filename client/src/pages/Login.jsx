import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import {toast} from "react-toastify"

const Login = () => {
  const [user,setUser] = useState({
    email:"",
    password:"",
  })

  const navigate = useNavigate()

  const {storeTokenInLS} = useAuth()

  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]:value,
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response data : ", response);

      const responseData = await response.json();
      console.log("response data",responseData);

      if (response.ok) {
        toast.success("login successfully");
        setUser({ email: "", password: "" });
        storeTokenInLS(responseData.token)
        navigate("/")
      } else {
         toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message)
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <>
       <section>
          <main>
            <div className="section-registration">
              <div className="container grid grid-two-cols">
                <div className="registration-image">
                  <img src="/images/login.png" 
                  alt="let's fill the login form" 
                  width="500" 
                  height="500" />
                </div>
                <div className="registration-form">
                  <h1 className="main-heading mb-3">Login Form</h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" required
                        placeholder="Enter your email" id="email" autoComplete="off"
                        value={user.email} onChange={handleInput} />
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" required
                        placeholder="password" id="password" autoComplete="off"
                        value={user.password} onChange={handleInput} />
                    </div>
                    <br />
                    <button type="submit" className='btn btn-submit'>Login Now</button>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </section>
    </>
  )
}

export default Login
