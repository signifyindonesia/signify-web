import { useState, useRef, useEffect } from 'react';

const Translation = () => {
  const [mediaType, setMediaType] = useState('upload');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (cameraActive) startCamera();
    else stopCamera();

    return () => stopCamera();
  }, [cameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { video: { facingMode: 'user' }},
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch {
      setError('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const capturePhoto = () => {
    if (!videoRef.current || !streamRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(blob));
      setCameraActive(false);
    }, 'image/jpeg', 0.9);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      return setError('Format file tidak didukung. Gunakan gambar (JPEG, PNG, GIF) atau video (MP4, WebM)');
    }

    if (file.size > 10 * 1024 * 1024) {
      return setError('Ukuran file terlalu besar. Maksimal 10MB');
    }

    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mediaFile) {
      return setError('Silakan pilih atau ambil media terlebih dahulu');
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('media', mediaFile);

      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('Media berhasil dikirim untuk diproses!');
    } catch {
      setError('Gagal mengirim media. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setMediaFile(null);
    setMediaPreview('');
    setError('');
    setCameraActive(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-200 to-white">
      <header className="w-full py-8 px-6 text-center relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-orange-400 mb-3 drop-shadow-lg">
          Penerjemah Bahasa Isyarat
        </h1>
        <p className="text-blue-900 max-w-lg mx-auto">
          Izinkan penggunakan kamera untuk menerjemahkan
        </p>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              {/* Tab Unggah & Kamera */}
              <div className="flex border-b border-gray-200 mb-6">
                {['upload', 'camera'].map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`py-2 px-4 font-medium text-sm ${
                      mediaType === type
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => {
                      setMediaType(type);
                      if (type !== 'camera') setCameraActive(false);
                    }}
                  >
                    {type === 'upload' ? 'Unggah Media' : 'Ambil Foto'}
                  </button>
                ))}
              </div>

              {/* Unggah */}
              {mediaType === 'upload' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih foto atau video
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="media-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Unggah file</span>
                          <input
                            id="media-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                          />
                        </label>
                        <p className="pl-1">atau drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">Format: JPEG, PNG, GIF, MP4 (maks. 10MB)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Kamera */}
              {mediaType === 'camera' && (
                <div className="mb-6">
                  {!cameraActive ? (
                    <button
                      type="button"
                      onClick={() => setCameraActive(true)}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm"
                    >
                      Aktifkan Kamera
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative bg-black rounded-md overflow-hidden">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-auto max-h-96 mx-auto"
                        />
                        {mediaPreview && (
                          <img
                            src={mediaPreview}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={capturePhoto}
                          className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                        >
                          Ambil Foto
                        </button>
                        <button
                          type="button"
                          onClick={() => setCameraActive(false)}
                          className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md"
                        >
                          Matikan Kamera
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Preview */}
              {mediaPreview && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pratinjau</label>
                  <div className="mt-1 flex justify-center rounded-md overflow-hidden border border-gray-300">
                    {mediaFile?.type?.startsWith('image/') ? (
                      <img src={mediaPreview} alt="Preview" className="max-h-96 w-auto object-contain" />
                    ) : (
                      <video src={mediaPreview} controls className="max-h-96 w-auto" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                  >
                    Hapus Media
                  </button>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!mediaFile || isLoading}
                  className={`w-full py-3 px-4 rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoading || !mediaFile
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? 'Memproses...' : 'Terjemahkan Sekarang'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Translation;
