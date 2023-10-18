import React from 'react';
import './App.css';
import Navbar from "./components/UI/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import EmployeeRegister from "./pages/EmployeeRegister";
import Teams from "./pages/Teams";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Constructions from "./pages/Constructions";
import AddConstructions from "./pages/AddConstructions";

function App() {

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/employeeRegister" element={<EmployeeRegister/>}/>
                <Route path="/teams" element={<Teams/>}/>
                <Route path="/employees" element={<Employees/>}/>
                <Route path="/addEmployee" element={<AddEmployee/>}/>
                <Route path="/constructions" element={<Constructions/>}/>
                <Route path="/addConstruction" element={<AddConstructions/>}/>
            </Routes>
        </>
    );
}

export default App;
