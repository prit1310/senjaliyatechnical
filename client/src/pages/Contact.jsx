import React, {useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { toast } from "react-toastify"

const Contact = () => {
  const { user } = useAuth()
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  })

  const [userData, setUserData] = useState(true)

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    })
    setUserData(false)
  }


  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/form/contact", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(contact)
      })
      if (response.ok) {
        setContact({
          username: user.username,
          email: user.email,
          message: "",
        });
        toast.success("message send successfully");
      } else {
        console.log("error inside response ", "error");
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <section className='section-contact'>
        <div className="conatact-content container">
          <h1 className='main-heading'>Contact Us</h1>
        </div>

        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" width="500" height="500" />
          </div>

          <section className='section-form'>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input type="text" name="username" required
                  placeholder="Enter your username" id="username" autoComplete="off"
                  value={contact.username} onChange={handleInput} />
              </div>
              <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" required
                  placeholder="email" id="email" autoComplete="off"
                  value={contact.email} onChange={handleInput} />
              </div>
              <div>
                <label htmlFor="message">message</label>
                <textarea name="message" id="message" cols="30" rows="10" required autoComplete="off"
                  value={contact.message} onChange={handleInput}></textarea>
              </div>
              <br />
              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.655550741035!2d72.66721663628563!3d23.036416079250703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87048b490481%3A0x424b7ef07c9a2b10!2sPanchamrut%20International%20Public%20School!5e0!3m2!1sen!2sin!4v1739686837765!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

      </section>
    </>
  )
}

export default Contact
