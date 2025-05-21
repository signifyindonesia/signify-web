import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import About from "../pages/about/About";
import Docs from "../pages/docs/Docs";
import NotFound from "../pages/404/NotFound";
import Translation from "../pages/translation/Translation";
import Academy from "../pages/academy/Academy";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/about' element={<About />} />
      <Route path='/translation' element={<Translation />} />
      <Route path='/docs' element={<Docs />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/academy' element={<Academy />} />
    </Routes>
  );
}
