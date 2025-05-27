import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Button from "../../components/ui/button/Button";
import { loginUser } from "../../services/authService";
import { setUser } from "../../utils/auth";

import { useAuth } from "../../contexts/AuthContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({ email, password });
      const { token, user } = response.data.data;

      setUser(user, token);
      login();

      await Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: `Selamat datang, ${user.name || "Pengguna"}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/"); // redirect setelah login
    } catch (err) {
      const msg =
        err.response?.data?.message || "Gagal login. Coba lagi nanti.";

      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: msg,
      });

      setError(msg); // opsional kalau mau tetap munculkan di bawah input
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-[var(--color-secondary)] rounded-xl shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Masuk ke Signify
        </h2>

        <form className='space-y-4' onSubmit={handleSubmit}>
          {error && (
            <div className='text-red-600 text-sm text-center'>{error}</div>
          )}

          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />

          <div className='flex justify-between items-center text-sm text-gray-600'>
            <label className='flex items-center gap-2'>
              <input type='checkbox' className='accent-blue-500' />
              Remember me
            </label>
            <Button
              as='a'
              href='/forgot-password'
              variant='link'
              color='blue'
              className='p-0'
            >
              Lupa Password?
            </Button>
          </div>

          <Button
            type='submit'
            variant='solid'
            color='accent'
            className='w-full'
          >
            Login
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
          type='button'
          variant='outline'
          color='gray'
          className='w-full flex items-center justify-center gap-2'
        >
          <img src='icons/google.svg' alt='Google' className='w-5 h-5' />
          Masuk dengan Google
        </Button>

        <div className='mt-6 text-center text-sm'>
          <Button as='a' href='/register' variant='link'>
            Belum punya akun? Daftar
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Login;
