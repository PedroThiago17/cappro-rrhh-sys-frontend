import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Login from "../components/Login";
import MenuPrincipal from "../components/MenuPrincipal/MenuPrincipal";
import RegistroPersonal from "../components/RegistroDePersonal/RegistroPersonal";
import MantenimientoDePersonal from "../components/MantenimientoDePersonal/MantenimientoDePersonal";
import ReportePlanillas from "../components/ReportePlanillas/ReportePlanillas";
import ReporteAsistencia from "../components/ReporteAsistencia/ReporteAsistencia";
import { ProtectedRoute } from "./ProtectedRoute"
import React, { useState } from 'react';

const LocalRoutes = () => {
    return (
        <Routes>
            <Route index element ={<Login />}/>
            <Route path="/" element={<Login />} />
            <Route path="/menu" element={
                <ProtectedRoute>
                    <MenuPrincipal/>
                </ProtectedRoute>}/>
            <Route path="/registropersonal" element={
                <ProtectedRoute>
                    <RegistroPersonal/>
                </ProtectedRoute>}/>
            <Route path="/mantenimientopersonal" element={
                <ProtectedRoute>
                    <MantenimientoDePersonal/>
                </ProtectedRoute>}/>
            <Route path="/reporteplanilla" element={
                <ProtectedRoute>
                    <ReportePlanillas/>
                </ProtectedRoute>}/>
            <Route path="/reporteasistencia" element={
                <ProtectedRoute>
                    <ReporteAsistencia/>
                </ProtectedRoute>}/>         
        </Routes>
        
    );
}
export default LocalRoutes;