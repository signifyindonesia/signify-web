import { useState, useEffect } from 'react';
import { getUser, updateUserProfile } from '../../utils/auth';
import { uploadImage } from '../../utils/storage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Update() {
  const [formData, setFormData] = useState({
    name: '',
    photoUrl: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 


  useEffect(() => {
  try {
    const currentUser = getUser();
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        photoUrl: currentUser.photoUrl || ''
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

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // Maksimal 2MB
      toast.error("Image size must be under 2MB.");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = formData.photoUrl;

      if (imageFile) {
        photoUrl = await uploadImage(imageFile);
      }

      await updateUserProfile({
        name: formData.name,
        photoUrl,
      });

      const currentUser = getUser();
      const updatedUser = {
        ...currentUser,
        name: formData.name,
        photoUrl: photoUrl || currentUser.photoUrl,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setFormData({
        name: updatedUser.name,
        photoUrl: updatedUser.photoUrl,
      });

      setPreviewImage(null); 
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
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={previewImage || formData.photoUrl || "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Null"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-blue-500 object-cover"
            />
            <label className={`absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </label>
          </div>
        </div>

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
