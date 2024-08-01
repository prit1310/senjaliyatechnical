import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from "./pages/Contact"
import Service from "./pages/Service"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Logout from './pages/Logout';
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Footer from './components/Footer/Footer';
import AdminLayout from './components/layouts/Admin-layout';
import Adminusers from './pages/Admin-user';
import AdminContacts from './pages/Admin-contact';
import Adminupdate from './pages/Admin-update';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error/>}/>
        <Route path="/admin" element={<AdminLayout/>}>
            <Route path="users" element={<Adminusers/>} />
            <Route path="contacts" element={<AdminContacts/>} />
            <Route path="users/:id/edit" element={<Adminupdate />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
