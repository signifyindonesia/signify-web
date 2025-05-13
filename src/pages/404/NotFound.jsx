import { Link } from "react-router-dom";
import logo from "../../assets/logo/signify_logo.png"; // sesuaikan path logomu
import { motion as Motion } from "framer-motion";
import Button from "../../components/ui/button/Button";

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center relative overflow-hidden'>
      {/* Logo */}
      <Motion.img
        src={logo}
        alt='Signify Logo'
        className='w-24 h-24 mb-6'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* 404 text */}
      <Motion.h1
        className='text-6xl font-bold text-blue-600 mb-2'
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </Motion.h1>

      <Motion.h2
        className='text-xl sm:text-2xl font-semibold mb-3'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Halaman tidak ditemukan
      </Motion.h2>

      <Motion.p
        className='text-gray-600 mb-6 max-w-md'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Ups! Coba kembali ke halaman utama atau periksa kembali URL yang kamu
        masukkan.
      </Motion.p>

      <Motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          as='a'
          href='/'
          variant='solid'
          color='accent'
          className='w-full px-6 py-3 transition rounded-lg shadow'
        >
          Kembali ke Beranda
        </Button>
      </Motion.div>
    </div>
  );
};

export default NotFound;
