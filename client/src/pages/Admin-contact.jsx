import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from "react-toastify"

const AdminContacts = () => {
  const { authorizationToken,isLoggedIn } = useAuth();
  const [contactData, setContactData] = useState([])
  const getContactsData = async () => {
    try {
      const response = await fetch("/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      })
      const data = await response.json()
      if (response.ok) {
        setContactData(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      })
      if (response.ok) {
        getContactsData()
        toast.success("Deleted successfully")
      }
      else {
        toast.error("Not deleted")
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getContactsData()
  }, [deleteContactById])

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data</h1>

        <div className="container admin-contact">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
                <th>Login</th>
              </tr>
            </thead>
            <tbody>
              {
                contactData.map((curConData, index) => {
                  const { username, email, message, _id } = curConData
                  return <tr key={index}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{message}</td>
                    <td> <button className="btn" onClick={() => deleteContactById(_id)} >delete</button></td>
                    <td>{`${isLoggedIn}`}</td>
                  </tr>
                })
              }
            </tbody>
          </table>

        </div>
      </section>
    </>
  )
}

export default AdminContacts
