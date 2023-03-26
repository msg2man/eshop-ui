//import logo from './logo.svg';
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
//import HomePage from "./components/HomePage/HomePage";
import AddProduct from "./components/AddProduct/AddProduct";
import EditProduct from "./components/EditProduct/EditProduct";
import Product from "./components/Product/Product";
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route exact path="/Home" element={<HomePage/>}/> */}
        <Route exact path="/Home" element={<Product/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/AddProduct" element={<AddProduct/>}/>
        <Route exact path="/Signup" element={<Signup/>}/>
        <Route exact path="/Product" element={<Product/>}/>
        <Route exact path="/EditProduct" element={<EditProduct/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
