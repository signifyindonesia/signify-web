import Button from "../../components/ui/button/Button";

const Login = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-[var(--color-secondary)] rounded-xl shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Masuk ke Signify
        </h2>

        <form className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='password'
            placeholder='Password'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          {/* Remember Me dan Lupa Password */}
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

          {/* Tombol Login */}
          <Button
            type='submit'
            variant='solid'
            color='accent'
            className='w-full'
          >
            Login
          </Button>
        </form>

        {/* Garis OR */}
        <div className='flex items-center my-6'>
          <div className='flex-grow h-px bg-gray-400'></div>
          <span className='px-4 text-sm text-[var(--color-text)]-500'>
            Atau
          </span>
          <div className='flex-grow h-px bg-gray-400'></div>
        </div>

        {/* Tombol Masuk dengan Google */}
        <Button
          type='button'
          variant='outline'
          color='gray'
          className='w-full flex items-center justify-center gap-2'
        >
          <img src='icons/google.svg' alt='Google' className='w-5 h-5' />
          Masuk dengan Google
        </Button>

        {/* Tautan Daftar */}
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
