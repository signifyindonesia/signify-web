import { useState, useEffect } from 'react';
import { getUser, updateUserProfile } from '../../utils/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Update() {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    try {
      const currentUser = getUser();
      if (currentUser) {
        setFormData({
          name: currentUser.name || ''
        });
      }
    } catch (err) {
      console.error("Error loading user:", err);
      toast.error("Failed to load user data.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile({
        name: formData.name
      });

      const currentUser = getUser();
      const updatedUser = {
        ...currentUser,
        name: formData.name
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setFormData({
        name: updatedUser.name
      });
      alert("Nama Berhasil Diperbaharui!");
      toast.success("Akun berhasil diperbaharui!");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);

    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.message || 'Akun gagal diperbaharui');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-11 mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Perbaharui Akun</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? 'Memperbaharui...' : 'Perbaharui Akun'}
          </button>
        </div>
      </form>
    </div>
  );
}