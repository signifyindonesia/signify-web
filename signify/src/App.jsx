import React from "react";
import AppRoutes from "./routes/routes";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className='app'>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
      <h1 className='text-3xl font-bold underline'>TEST Tailwind</h1>
    </div>
  );
}

export default App;
