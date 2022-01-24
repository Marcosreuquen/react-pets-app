import { MyData } from "../pages/MyData/MyData";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Pass } from "../pages/Pass/Pass";
import { MyPets } from "../pages/MyPets/MyPets";
import { PetData } from "../pages/PetData/PetData";
import { Report } from "../pages/Report/Report";
import { EditPet } from "../pages/EditPet/EditPet";

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login/:email' element={<Pass />} />

        <Route path='my-data' element={<MyData />} />
        <Route path='my-pets' element={<MyPets />} />
        <Route path='pet-data' element={<PetData />} />
        <Route path='pet-data/:id' element={<EditPet />} />
        <Route path='report' element={<Report />} />
      </Route>
    </Routes>
  );
}
