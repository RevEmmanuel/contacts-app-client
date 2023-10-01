import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";
import LandingPage from "../pages/landing";
import HomePage from "../pages/home";
import Protected from "./Protected";
import Layout from "../components/Layout";
import ContactPage from "../pages/contact";
import EditContactPage from "../pages/editContact";
import CreateContactPage from "../pages/createContact";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Unprotected from "./Unprotected";

interface IProps {
}

function RootNavigation(props: IProps) {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>

        {!isAuthenticated && <Route path="" element={<LandingPage/>}/>}

        <Route element={<Protected><Layout/></Protected>}>
          {isAuthenticated && (
            <Route path="" element={<HomePage/>}/>
          )}

          <Route path="contact/new" element={<CreateContactPage/>}/>
          <Route path="contact/:id" element={<ContactPage/>}/>
          <Route path="contact/:id/edit" element={<EditContactPage/>}/>
        </Route>

        <Route element={<Unprotected><Outlet/></Unprotected>}>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigation;
