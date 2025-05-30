import { useEffect, useState } from 'react';
import { getUser } from "../../utils/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      try {
        const currentUser = getUser();
        if (!currentUser) {
          toast.error('Please login to view profile');
          navigate('/login');
          return;
        }
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleUpdateProfile = () => {
    navigate('/update');
  };
  const handleChangePassword = () => {
    navigate('/changePassword');
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <p className="text-center text-red-500">No user data available</p>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto mt-10 my-10 p-6 bg-white rounded-lg shadow-md'>
      <div className='flex flex-col items-center'>
         <img
          src={
            user?.photoUrl ||
            "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Null"
          }
          alt={user?.name}
          className='w-24 h-24 rounded-full border-2 border-blue-500'
        />
        <h2 className='mt-4 text-xl font-semibold'>{user.name}</h2>
        <p className='text-gray-600'>{user.email}</p>
        
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleUpdateProfile}
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
          >
            Perbaharui Profil
          </button>
          <button
            onClick={handleChangePassword}
            className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors'
          >
            Ubah Kata Sandi
          </button>
        </div>
      </div>
      
     <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium">Detail Akun</h3>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Bergabung:</span>
            <span>
              {user.createdAt && !isNaN(new Date(user.createdAt)) 
                ? new Date(user.createdAt).toLocaleDateString() 
                : 'Tidak Diketahui'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Terakhir Diperbaharui:</span>
            <span>
              {user.updatedAt && !isNaN(new Date(user.updatedAt)) 
                ? new Date(user.updatedAt).toLocaleDateString() 
                : user.createdAt && !isNaN(new Date(user.createdAt)) 
                  ? new Date(user.createdAt).toLocaleDateString() 
                  : 'Tidak Diketahui'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}