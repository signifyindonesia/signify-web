import React from "react";
import AppRoutes from "./routes/routes";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className='app'>
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
