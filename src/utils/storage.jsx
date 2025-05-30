export const uploadImage = async (file) => {
  try {
    if (!file) {
      throw new Error('No file selected');
    }

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('https://signify-api.onrender.com/profile/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });

    if (!response.ok) {
      let errorMessage = 'Upload failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result.downloadURL || result.photoUrl;
    
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Terjadi kesalahan pada server');
  }
};