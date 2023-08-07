import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./login";
// import Home from "./home";
// import Banking from "./banking";
import Company from "./company";

const Navbar = () => {
  return (
    <nav className="w-full h-12 shadow-lg flex justify-between items-center px-8">
      <div className="">
        <h1 className="text-2xl font-bold text-teal-600">Hello.</h1>
        <div className="-mt-2">
          <p className="text-[7pt] ">The Powered Company.</p>
        </div>
      </div>
      <BrowserRouter>
        <ul className="flex items-center text-sm">
          <li className="px-4">
            <Link to="">Home</Link>
          </li>
          <li className="px-4">{/* <Link to="/banking">Banking</Link> */}a</li>
          <li className="px-4">
            <Link to="/company">Company</Link>
          </li>
          <li className="px-4">
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/banking" element={<Banking />} /> */}
          <Route path="/company" element={<Company />} />
          <Route path="/login" element={<Login />}/>
            
         
        </Routes>
      </BrowserRouter>
    </nav>
  );
};

export default Navbar;
