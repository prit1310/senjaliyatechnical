import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import {useParams} from 'react-router-dom'
import {toast} from "react-toastify"

const Adminupdate = () => {
    const { authorizationToken } = useAuth();
  const [userData, setUserData] = useState({ username: '', email: '', phone: '' }); 
  const params = useParams();

  useEffect(() => {
    const getSingleUserData = async () => {
      try {
        const response = await fetch(`/api/admin/users/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedData = await response.json();
        setUserData(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleUserData();
  }, [params.id, authorizationToken]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value })); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/admin/users/update/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success('Updated Successfully');
      } else {
        toast.error('Not Updated');
      }
    } catch (error) {
      console.log(error);
    }
  };

    return (
        <>
            <section className="section-content">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User Data</h1>
                    <div className="container grid grid-two-cols">
                        <section className="section-form">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">username</label>
                                    <input type="text" name="username" id="username" autoComplete="off"
                                        required onChange={handleInput} value={userData.username} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">email</label>
                                    <input type="email" name="email" id="email" autoComplete="off"
                                        required onChange={handleInput} value={userData.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">phone</label>
                                    <input type="number" name="phone" id="phone" autoComplete="off"
                                        required onChange={handleInput} value={userData.phone} />
                                </div>
                                <div className="form-group">
                                    <button type="submit"  className="update-button">Update</button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Adminupdate
