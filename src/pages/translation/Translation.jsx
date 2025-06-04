import { useState, useRef, useEffect } from 'react';

const Translation = () => {
  const [mediaType, setMediaType] = useState('upload');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [realtimeMode, setRealtimeMode] = useState(false);
  const [realtimePrediction, setRealtimePrediction] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [predictionHistory, setPredictionHistory] = useState([]);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const wsRef = useRef(null);
  const intervalRef = useRef(null);

  const IMAGE_API_URL = "https://yudhriz-signifyindonesia.hf.space";
  const VIDEO_API_URL = "https://yudhriz-signify3dcnn.hf.space";
  const WS_URL = "wss://yudhriz-signifyindonesia.hf.space/ws/realtime";

  const stopCamera = () => {
    console.log('Attempting to stop camera...');
    if (streamRef.current) {
      console.log('Stopping camera tracks...');
      streamRef.current.getTracks().forEach(track => {
        console.log(`Stopping track: ${track.kind} (${track.label})`);
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    console.log('Camera stopped successfully');
  };

  const stopRealtimePrediction = () => {
    console.log('Stopping realtime prediction...');
    setRealtimeMode(false);
    setRealtimePrediction('');
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    console.log('Realtime prediction stopped');
  };

  useEffect(() => {
    return () => {
      console.log('Component unmounting - cleaning up resources');
      stopCamera(); 
      stopRealtimePrediction();
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let tempStream = null;

    const getDevices = async () => {
      try {
        tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
        tempStream.getTracks().forEach(track => track.stop());
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (mounted) {
          setDevices(videoDevices);
          if (videoDevices.length > 0) {
            setSelectedDevice(videoDevices[0].deviceId);
          }
        }
      } catch (err) {
        console.error('Error listing devices:', err);
        if (mounted) {
          setError('Tidak dapat mengakses kamera. Pastikan izin diberikan.');
        }
      }
    };

    getDevices();

    return () => {
      mounted = false;
      if (tempStream) {
        tempStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let streamInstance = null;

    const startCameraAsync = async () => {
      try {
        console.log('Starting camera...');
        const constraints = {
          video: {
            deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamInstance = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          console.log('Camera started successfully');
        }
      } catch (err) {
        console.error('Failed to start camera:', err);
        setError('Gagal mengakses kamera. Pastikan izin diberikan.');
        setCameraActive(false);
      }
    };

    if (cameraActive && mediaType === 'camera') {
      startCameraAsync();
    } else {
      stopCamera();
    }

    return () => {
      if (streamInstance) {
        console.log('Cleaning up camera stream in effect cleanup');
        streamInstance.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraActive, selectedDevice, mediaType]);

  useEffect(() => {
    const handleRouteChange = () => {
      console.log('Route changing - stopping camera');
      stopCamera();
      stopRealtimePrediction();
    };

    if (window.ReactRouter) {
      const unlisten = window.ReactRouter.history.listen(handleRouteChange);
      return () => unlisten();
    }
    
    window.addEventListener('beforeunload', handleRouteChange);
    return () => {
      window.removeEventListener('beforeunload', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (cameraActive) {
          console.log('Page hidden - stopping camera');
          stopCamera();
          stopRealtimePrediction();
        }
      } else {
        if (cameraActive && mediaType === 'camera') {
          console.log('Page visible - restarting camera');
          startCamera();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [cameraActive, mediaType]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopCamera();
      stopRealtimePrediction();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const startCamera = async () => {
    try {
      stopCamera();

      const constraints = {
        video: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: mediaType === 'camera' ? 'user' : 'environment'
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        console.log('Camera started successfully');
      }
    } catch (err) {
      setError('Tidak dapat mengakses kamera. Pastikan izin diberikan.');
      setCameraActive(false);
      console.error('Camera error:', err);
    }
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
    }, 'image/jpeg', 0.9);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];

    if (![...validImageTypes, ...validVideoTypes].includes(file.type)) {
      return setError('Format file tidak didukung. Gunakan gambar (JPEG, PNG) atau video (MP4, WebM)');
    }

    if (file.size > 20 * 1024 * 1024) {
      return setError('Ukuran file terlalu besar. Maksimal 20MB');
    }

    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
    setError('');
    setPredictionResult(null);
  };

  const predictImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${IMAGE_API_URL}/predict/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Prediction failed');

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Image prediction error:', err);
      throw err;
    }
  };

  const predictVideo = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`${VIDEO_API_URL}/predict/video`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Video prediction failed');

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Video prediction error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const startRealtimePrediction = () => {
    if (!cameraActive || !streamRef.current) {
      setError('Kamera harus aktif untuk mode realtime');
      return;
    }

    setRealtimeMode(true);
    setRealtimePrediction('Memulai...');

    wsRef.current = new WebSocket(WS_URL);
    
    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
      
      intervalRef.current = setInterval(() => {
        if (videoRef.current && wsRef.current && wsRef.current.readyState === WebSocket.OPEN && streamRef.current) {
          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          
          canvas.toBlob(blob => {
            if (blob && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              blob.arrayBuffer().then(buffer => {
                wsRef.current.send(buffer);
              });
            }
          }, 'image/jpeg', 0.8);
        }
      }, 500);
    };
    
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === 'success') {
          const predictionText = `${data.prediction.label} (${(data.prediction.confidence * 100).toFixed(1)}%)`;
          setRealtimePrediction(predictionText);
          
          setPredictionHistory(prev => [
            { 
              text: predictionText, 
              timestamp: new Date().toLocaleTimeString() 
            },
            ...prev.slice(0, 9)
          ]);
        }
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };
    
    wsRef.current.onclose = () => {
      console.log('WebSocket disconnected');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setRealtimePrediction('Koneksi ditutup');
    };
    
    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Koneksi realtime error');
      stopRealtimePrediction();
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mediaFile) {
      return setError('Silakan pilih atau ambil media terlebih dahulu');
    }

    setIsLoading(true);
    setError('');
    setPredictionResult(null);

    try {
      let result;
      
      if (mediaFile.type.startsWith('image/')) {
        result = await predictImage(mediaFile);
      } else if (mediaFile.type.startsWith('video/')) {
        result = await predictVideo(mediaFile);
      }
      
      if (result) {
        setPredictionResult(result);
        
        setPredictionHistory(prev => [
          { 
            text: `${result.prediction.label} (${(result.prediction.confidence * 100).toFixed(1)}%)`,
            timestamp: new Date().toLocaleTimeString(),
            type: mediaFile.type.startsWith('image/') ? 'image' : 'video'
          },
          ...prev.slice(0, 9)
        ]);
      }
    } catch (err) {
      setError('Gagal memproses media. Silakan coba lagi.');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setMediaFile(null);
    setMediaPreview('');
    setError('');
    setPredictionResult(null);
    stopRealtimePrediction();
    
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTabChange = (type) => {
    setMediaType(type);
    if (type !== 'camera') {
      setCameraActive(false);
      stopRealtimePrediction();
    }
    resetForm();
  };

  const handleCameraToggle = (active) => {
    console.log(`Camera toggle requested: ${active}`);
    if (active) {
      setCameraActive(true);
    } else {
      setCameraActive(false);
      stopRealtimePrediction();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="w-full py-8 px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 mb-3 drop-shadow-lg">
          Penerjemah Bahasa Isyarat Indonesia
        </h1>
        <p className="text-blue-800 max-w-lg mx-auto">
          Terjemahkan bahasa isyarat melalui gambar, video, atau kamera langsung
        </p>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div>
              {/* Tab Selection */}
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
                    onClick={() => handleTabChange(type)}
                  >
                    {type === 'upload' ? 'Unggah Media' : 'Kamera Langsung'}
                  </button>
                ))}
              </div>

              {/* Camera Device Selection */}
              {mediaType === 'camera' && devices.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pilih Kamera
                  </label>
                  <select
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    {devices.map(device => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Kamera ${devices.indexOf(device) + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Upload Section */}
              {mediaType === 'upload' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih foto atau video
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <div className="flex justify-center text-sm text-gray-600">
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
                      </div>
                      <p className="text-xs text-gray-500">
                        Format: JPEG, PNG (maks. 20MB) atau MP4 (maks. 20MB)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Camera Section */}
              {mediaType === 'camera' && (
                <div className="mb-6">
                  <div className="space-y-4">
                    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-contain"
                      />
                      {mediaPreview && !realtimeMode && (
                        <img
                          src={mediaPreview}
                          alt="Preview"
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      )}
                      {!cameraActive && (
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <p>Kamera tidak aktif</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {!cameraActive ? (
                        <button
                          type="button"
                          onClick={() => handleCameraToggle(true)}
                          className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm"
                        >
                          Aktifkan Kamera
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={capturePhoto}
                            disabled={realtimeMode}
                            className={`flex-1 py-2 px-4 text-white font-medium rounded-md text-sm ${
                              realtimeMode ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                          >
                            Ambil Foto
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCameraToggle(false)}
                            className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md text-sm"
                          >
                            Matikan Kamera
                          </button>
                          {!realtimeMode ? (
                            <button
                              type="button"
                              onClick={startRealtimePrediction}
                              className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md text-sm"
                            >
                              Mode Realtime
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={stopRealtimePrediction}
                              className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md text-sm"
                            >
                              Stop Realtime
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Section */}
              {mediaPreview && !realtimeMode && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pratinjau Media
                  </label>
                  <div className="mt-1 flex justify-center rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
                    {mediaFile?.type?.startsWith('image/') ? (
                      <img 
                        src={mediaPreview} 
                        alt="Preview" 
                        className="max-h-64 w-auto object-contain" 
                      />
                    ) : (
                      <video 
                        src={mediaPreview} 
                        controls 
                        className="max-h-64 w-auto" 
                      />
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

              {/* Realtime Prediction Display */}
              {realtimeMode && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-700 mb-2 text-sm">HASIL REAL-TIME:</h3>
                  <div className="text-2xl font-bold text-blue-600 min-h-10">
                    {realtimePrediction || 'Menunggu input...'}
                  </div>
                </div>
              )}

              {/* Prediction Result */}
              {predictionResult && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-700 mb-2 text-sm">HASIL TERJEMAHAN:</h3>
                  <div className="text-2xl font-bold text-green-600">
                    {predictionResult.prediction?.label || 'Tidak dikenali'}
                  </div>
                  {predictionResult.prediction?.confidence && (
                    <div className="mt-1 text-sm text-green-500">
                      Tingkat akurasi: {(predictionResult.prediction.confidence * 100).toFixed(1)}%
                    </div>
                  )}
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              {!realtimeMode && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!mediaFile || isLoading}
                    className={`w-full py-3 px-4 rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm ${
                      isLoading || !mediaFile
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </span>
                    ) : 'Terjemahkan Sekarang'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* History Section */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Riwayat Terjemahan</h2>
            
            {predictionHistory.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada riwayat terjemahan</p>
            ) : (
              <ul className="space-y-3">
                {predictionHistory.map((item, index) => (
                  <li key={index} className="border-b border-gray-100 pb-2 last:border-0">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-gray-700">{item.text}</span>
                      <span className="text-xs text-gray-500">{item.timestamp}</span>
                    </div>
                    {item.type && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                        {item.type === 'image' ? 'Gambar' : 'Video'}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            
            {predictionHistory.length > 0 && (
              <button
                onClick={() => setPredictionHistory([])}
                className="mt-4 w-full py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md"
              >
                Hapus Riwayat
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500">
        <p>Signify Indonesia - Penerjemah Bahasa Isyarat © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Translation;