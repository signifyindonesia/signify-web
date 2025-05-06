import Button from "../../components/ui/button/Button";

const Register = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50'>
      <div className='w-full max-w-md p-8 bg-[var(--color-secondary)] rounded-xl shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Daftar akun Signify
        </h2>
        <form className='space-y-4'>
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
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
          variant='outline'
          color='gray'
          className='w-full flex items-center justify-center gap-2'
        >
          <img src='/icons/google.svg' alt='Google' className='w-5 h-5' />
          Register with Google
        </Button>

        {/* Tautan Login */}
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
