import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/ui/button/Button";

import { registerUser, loginWithGoogle } from "../../services/authService";
import { setUser } from "../../utils/auth";

// Firebase untuk Google Sign-in
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await registerUser(form);

      // Debugging - lihat response lengkap
      console.log("Registration response:", data);

      if (data.data && data.data.token) {
        const { token, user } = data.data;
        setUser(user, token);

        await Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil!",
          text: `Selamat datang, ${user.name || "Pengguna"}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/login");
      } else {
        // Jika sukses tapi tidak ada token (sesuai backend lama)
        await Swal.fire({
          icon: "success",
          title: data.message || "Registrasi Berhasil!",
          text: "Silakan login dengan akun Anda",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const msg =
        error.response?.data?.message || error.message || "Registrasi gagal!";
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: msg,
      });
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Kirim token ke backend (gunakan endpoint login/register Google)
      const response = await loginWithGoogle({ token: idToken });
      const { token, user } = response.data.data;

      setUser(user, token);

      await Swal.fire({
        icon: "success",
        title: "Registrasi Google Berhasil!",
        text: `Halo, ${user.name || "Pengguna"}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        console.log("Popup Google ditutup oleh user.");
        return;
      }

      console.error("Google register error", err);
      Swal.fire({
        icon: "error",
        title: "Registrasi Google Gagal",
        text: "Gagal registrasi dengan Google. Coba lagi nanti.",
      });
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-[var(--color-secondary)] rounded-xl shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Daftar akun Signify
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Nama Lengkap
            </label>
            <input
              id='name'
              type='text'
              placeholder='Nama Lengkap'
              value={form.name}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='Alamat email'
              value={form.email}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='Masukkan password baru'
              value={form.password}
              onChange={handleChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='flex items-start text-sm'>
            <input type='checkbox' id='terms' className='mt-1 mr-2' required />
            <label htmlFor='terms' className='text-gray-700'>
              Dengan melakukan pendaftaran, Anda setuju dengan{" "}
              <a
                href='/terms'
                className='text-blue-600 underline hover:text-blue-800'
              >
                syarat & ketentuan
              </a>{" "}
              Signify.
            </label>
          </div>

          <Button
            type='submit'
            variant='solid'
            color='accent'
            className='w-full text-white'
          >
            Register
          </Button>
        </form>

        <div className='flex items-center my-6'>
          <div className='flex-grow h-px bg-gray-400'></div>
          <span className='px-4 text-sm text-[var(--color-text)]-500'>
            Atau
          </span>
          <div className='flex-grow h-px bg-gray-400'></div>
        </div>

        <Button
          variant='outline'
          color='gray'
          onClick={handleGoogleRegister}
          className='w-full flex items-center justify-center gap-2'
        >
          <img src='/icons/google.svg' alt='Google' className='w-5 h-5' />
          Register with Google
        </Button>

        <div className='mt-6 text-center'>
          <Button as='a' href='/login' variant='link'>
            Sudah punya akun? Login
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Register;
