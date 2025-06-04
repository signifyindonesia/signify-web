// src/routes/routes.js
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "../components/pagewrapper/Pagewrapper";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import About from "../pages/about/About";
import Docs from "../pages/docs/Docs";
import NotFound from "../pages/404/NotFound";
import Translation from "../pages/translation/Translation";
import Academy from "../pages/academy/Academy";
import Profile from "../pages/profile/Profile";
import Update from "../pages/update/Update";
import ChangePassword from "../pages/changePassword/ChangePassword";

export default function AppRoutes() {
  const location = useLocation();

  return (
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<PageWrapper><Home /></PageWrapper>} />
        <Route path='/login' element={<PageWrapper><Login /></PageWrapper>} />
        <Route path='/register' element={<PageWrapper><Register /></PageWrapper>} />
        <Route path='/about' element={<PageWrapper><About /></PageWrapper>} />
        <Route path='/translation' element={<PageWrapper><Translation /></PageWrapper>} />
        <Route path='/docs' element={<PageWrapper><Docs /></PageWrapper>} />
        <Route path='/academy' element={<PageWrapper><Academy /></PageWrapper>} />
        <Route path='/profile' element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path='/update' element={<PageWrapper><Update /></PageWrapper>} />
        <Route path='/changePassword' element={<PageWrapper><ChangePassword /></PageWrapper>} />
        <Route path='*' element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
  );
}