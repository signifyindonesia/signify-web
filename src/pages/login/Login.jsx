import Button from "../../components/ui/button/Button";

const Login = () => {
  return (
    <>
      <main className='flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50'>
        <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-md'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
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
            <Button
              type='submit'
              variant='solid'
              color='blue'
              className='w-full'
            >
              Login
            </Button>
          </form>

          <div className='mt-4 text-center'>
            <Button as='a' href='/register' variant='link' color='blue'>
              Don't have an account? Register
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
