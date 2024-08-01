import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import {toast} from "react-toastify"

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })

  const navigate = useNavigate()

  const {storeTokenInLS} = useAuth()

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response data : ", response);

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        toast.success("registration successfully");
        setUser({ username: "", email: "", phone: "", password: "" });
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
                <img src="/images/register.png"
                  alt="a girl is trying to do registration"
                  width="500"
                  height="500" />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" required
                      placeholder="username" id="username" autoComplete="off"
                      value={user.username} onChange={handleInput} />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" required
                      placeholder="Enter your email" id="email" autoComplete="off"
                      value={user.email} onChange={handleInput} />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input type="number" name="phone" required
                      placeholder="phone" id="phone" autoComplete="off"
                      value={user.phone} onChange={handleInput} />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" required
                      placeholder="password" id="password" autoComplete="off"
                      value={user.password} onChange={handleInput} />
                  </div>
                  <br />
                  <button type="submit" className='btn btn-submit'>Register Now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Register
