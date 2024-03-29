import React from 'react';
import {Routes, Route} from "react-router-dom";
import {Auth, Users, Blog, Courses, Menu, Newsletter,Inyde,Come, Ope, Asesor, Omicronshoppagos} from "../pages/admin";
import {AdminLayout} from "../layouts";
import {useAuth} from "../hooks";

export function AdminRouter() {
  const {user} = useAuth();
  const loadLayout = (Layout, Page )=>{
    return (
      <Layout>
        <Page />
      </Layout>
    )
  }
  return (
    <Routes>
      {!user ?(
        <Route path="/admin/*" element={<Auth/>}/> //login
      ): (
        <>
        {["/admin","/admin/blog"].map((path)=>(
         <Route 
         key={path} 
         path={path} 
         element={loadLayout(AdminLayout, Courses)}/> // Donde esta "Courses" cambia la pagina de inicio
        ))}
        <Route path="/admin/users" element={loadLayout(AdminLayout, Users)}/>
        <Route path="/admin/courses" element={loadLayout(AdminLayout, Courses)}/>
        <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)}/>
        <Route path="/admin/newsletter" element={loadLayout(AdminLayout, Newsletter)}/>
        <Route path="/admin/blog" element={loadLayout(AdminLayout,Blog)}/>
        <Route path="/admin/inyde" element={loadLayout(AdminLayout,Inyde)}/>
        <Route path="/admin/ope" element={loadLayout(AdminLayout,Ope)}/>
        <Route path="/admin/come" element={loadLayout(AdminLayout, Come)}/>
        <Route path="/admin/asesor" element={loadLayout(AdminLayout, Asesor)}/>
        <Route path="/admin/omicronshoppagos" element={loadLayout(AdminLayout, Omicronshoppagos)}/>
        </>
      )}
    </Routes>
  )
}
