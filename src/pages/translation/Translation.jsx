import { useState, useRef, useEffect } from "react";
import {
  Image as ImageIcon,
  Video,
  UploadCloud,
  Camera,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Wifi,
  Trash2,
} from "lucide-react";

const Translation = () => {
  const [mediaType, setMediaType] = useState("upload");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [realtimeMode, setRealtimeMode] = useState(false);
  const [realtimePrediction, setRealtimePrediction] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
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
    console.log("Attempting to stop camera...");
    if (streamRef.current) {
      console.log("Stopping camera tracks...");
      streamRef.current.getTracks().forEach((track) => {
        console.log(`Stopping track: ${track.kind} (${track.label})`);
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    console.log("Camera stopped successfully");
  };

  const stopRealtimePrediction = () => {
    console.log("Stopping realtime prediction...");
    setRealtimeMode(false);
    setRealtimePrediction("");

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    console.log("Realtime prediction stopped");
  };

  useEffect(() => {
    return () => {
      console.log("Component unmounting - cleaning up resources");
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
        tempStream.getTracks().forEach((track) => track.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        if (mounted) {
          setDevices(videoDevices);
          if (videoDevices.length > 0) {
            setSelectedDevice(videoDevices[0].deviceId);
          }
        }
      } catch (err) {
        console.error("Error listing devices:", err);
        if (mounted) {
          setError("Tidak dapat mengakses kamera. Pastikan izin diberikan.");
        }
      }
    };

    getDevices();

    return () => {
      mounted = false;
      if (tempStream) {
        tempStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let streamInstance = null;

    const startCameraAsync = async () => {
      try {
        console.log("Starting camera...");
        const constraints = {
          video: {
            deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamInstance = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          console.log("Camera started successfully");
        }
      } catch (err) {
        console.error("Failed to start camera:", err);
        setError("Gagal mengakses kamera. Pastikan izin diberikan.");
        setCameraActive(false);
      }
    };

    if (cameraActive && mediaType === "camera") {
      startCameraAsync();
    } else {
      stopCamera();
    }

    return () => {
      if (streamInstance) {
        console.log("Cleaning up camera stream in effect cleanup");
        streamInstance.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive, selectedDevice, mediaType]);

  useEffect(() => {
    const handleRouteChange = () => {
      console.log("Route changing - stopping camera");
      stopCamera();
      stopRealtimePrediction();
    };

    if (window.ReactRouter) {
      const unlisten = window.ReactRouter.history.listen(handleRouteChange);
      return () => unlisten();
    }

    window.addEventListener("beforeunload", handleRouteChange);
    return () => {
      window.removeEventListener("beforeunload", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (cameraActive) {
          console.log("Page hidden - stopping camera");
          stopCamera();
          stopRealtimePrediction();
        }
      } else {
        if (cameraActive && mediaType === "camera") {
          console.log("Page visible - restarting camera");
          startCamera();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [cameraActive, mediaType]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopCamera();
      stopRealtimePrediction();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
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
          facingMode: mediaType === "camera" ? "user" : "environment",
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        console.log("Camera started successfully");
      }
    } catch (err) {
      setError("Tidak dapat mengakses kamera. Pastikan izin diberikan.");
      setCameraActive(false);
      console.error("Camera error:", err);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !streamRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        setMediaFile(file);
        setMediaPreview(URL.createObjectURL(blob));
      },
      "image/jpeg",
      0.9
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const validVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];

    if (![...validImageTypes, ...validVideoTypes].includes(file.type)) {
      return setError(
        "Format file tidak didukung. Gunakan gambar (JPEG, PNG) atau video (MP4, WebM)"
      );
    }

    if (file.size > 20 * 1024 * 1024) {
      return setError("Ukuran file terlalu besar. Maksimal 20MB");
    }

    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
    setError("");
    setPredictionResult(null);
  };

  const predictImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${IMAGE_API_URL}/predict/image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Prediction failed");

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Image prediction error:", err);
      throw err;
    }
  };

  const predictVideo = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`${VIDEO_API_URL}/predict/video`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Video prediction failed");

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Video prediction error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const startRealtimePrediction = () => {
    if (!cameraActive || !streamRef.current) {
      setError("Kamera harus aktif untuk mode realtime");
      return;
    }

    setRealtimeMode(true);
    setRealtimePrediction("Memulai...");

    wsRef.current = new WebSocket(WS_URL);

    wsRef.current.onopen = () => {
      console.log("WebSocket connected");

      intervalRef.current = setInterval(() => {
        if (
          videoRef.current &&
          wsRef.current &&
          wsRef.current.readyState === WebSocket.OPEN &&
          streamRef.current
        ) {
          const canvas = document.createElement("canvas");
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (
                blob &&
                wsRef.current &&
                wsRef.current.readyState === WebSocket.OPEN
              ) {
                blob.arrayBuffer().then((buffer) => {
                  wsRef.current.send(buffer);
                });
              }
            },
            "image/jpeg",
            0.8
          );
        }
      }, 500);
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === "success") {
          const predictionText = `${data.prediction.label} (${(
            data.prediction.confidence * 100
          ).toFixed(1)}%)`;
          setRealtimePrediction(predictionText);

          setPredictionHistory((prev) => [
            {
              text: predictionText,
              timestamp: new Date().toLocaleTimeString(),
            },
            ...prev.slice(0, 9),
          ]);
        }
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setRealtimePrediction("Koneksi ditutup");
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("Koneksi realtime error");
      stopRealtimePrediction();
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mediaFile) {
      return setError("Silakan pilih atau ambil media terlebih dahulu");
    }

    setIsLoading(true);
    setError("");
    setPredictionResult(null);

    try {
      let result;

      if (mediaFile.type.startsWith("image/")) {
        result = await predictImage(mediaFile);
      } else if (mediaFile.type.startsWith("video/")) {
        result = await predictVideo(mediaFile);
      }

      if (result) {
        setPredictionResult(result);

        setPredictionHistory((prev) => [
          {
            text: `${result.prediction.label} (${(
              result.prediction.confidence * 100
            ).toFixed(1)}%)`,
            timestamp: new Date().toLocaleTimeString(),
            type: mediaFile.type.startsWith("image/") ? "image" : "video",
          },
          ...prev.slice(0, 9),
        ]);
      }
    } catch (err) {
      setError("Gagal memproses media. Silakan coba lagi.");
      console.error("Prediction error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setMediaFile(null);
    setMediaPreview("");
    setError("");
    setPredictionResult(null);
    stopRealtimePrediction();

    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleTabChange = (type) => {
    setMediaType(type);
    if (type !== "camera") {
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <header className="w-full py-10 px-8 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-600 mb-4">
          Penerjemah Bahasa Isyarat
        </h1>
        <p className="text-blue-900 max-w-lg mx-auto text-lg">
          Terjemahkan BISINDO dari gambar, video, atau langsung dengan kamera
          Anda.
        </p>
      </header>

      <main className="flex-grow container mx-auto px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Input Section */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-lg border border-gray-300">
            <div>
              {/* Tabs */}
              <div className="flex bg-gray-200 rounded-lg p-2 mb-8">
                {[
                  { id: "upload", name: "Unggah Media", icon: UploadCloud },
                  { id: "camera", name: "Kamera Langsung", icon: Camera },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`w-full flex items-center justify-center gap-2 py-3 px-5 font-semibold text-md rounded-md transition-colors duration-300 ${
                      mediaType === item.id
                        ? "bg-blue-700 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handleTabChange(item.id)}
                  >
                    <item.icon className="w-6 h-6" />
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Camera Device Selection */}
              {mediaType === "camera" && devices.length > 0 && (
                <div className="mb-6">
                  <label
                    htmlFor="camera-select"
                    className="block text-md font-medium text-gray-800 mb-2"
                  >
                    Pilih Perangkat Kamera
                  </label>
                  <select
                    id="camera-select"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="w-full p-3 bg-gray-100 border border-gray-400 rounded-md text-md text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  >
                    {devices.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label ||
                          `Kamera ${devices.indexOf(device) + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Upload Section */}
              {mediaType === "upload" && (
                <div className="mb-8">
                  <label
                    htmlFor="media-upload"
                    className="relative flex flex-col items-center justify-center w-full h-56 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-6 pb-8 text-center">
                      <UploadCloud
                        className="w-12 h-12 mb-4 text-gray-500"
                        strokeWidth={1.5}
                      />
                      <p className="mb-2 text-md text-gray-600">
                        <span className="font-semibold text-blue-700">
                          Klik untuk mengunggah
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Gambar (JPG, PNG) atau Video (MP4)
                      </p>
                      <p className="text-sm text-gray-500">Maks. 20MB</p>
                    </div>
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
              )}

              {/* Camera Section */}
              {mediaType === "camera" && (
                <div className="mb-8 space-y-6">
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video border border-gray-300 shadow-inner">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {mediaPreview && !realtimeMode && (
                      <img
                        src={mediaPreview}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover bg-black/50"
                      />
                    )}
                    {!cameraActive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/70">
                        <Video className="w-20 h-20 opacity-50" />
                        <p className="mt-2 font-semibold">Kamera Tidak Aktif</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {!cameraActive ? (
                      <button
                        type="button"
                        onClick={() => handleCameraToggle(true)}
                        className="col-span-full flex items-center justify-center gap-2 py-3 px-5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow transition-all duration-300"
                      >
                        <Camera className="w-6 h-6" /> Aktifkan Kamera
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={capturePhoto}
                          disabled={realtimeMode}
                          className={`flex items-center justify-center gap-2 py-3 px-5 font-semibold rounded-lg transition-all duration-300 ${
                            realtimeMode
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-blue-700 hover:bg-blue-800 text-white shadow"
                          }`}
                        >
                          <ImageIcon className="w-6 h-6" /> Ambil Foto
                        </button>
                        {!realtimeMode ? (
                          <button
                            type="button"
                            onClick={startRealtimePrediction}
                            className="flex items-center justify-center gap-2 py-3 px-5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow transition-all duration-300"
                          >
                            <Wifi className="w-6 h-6" /> Realtime
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={stopRealtimePrediction}
                            className="flex items-center justify-center gap-2 py-3 px-5 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg shadow transition-all duration-300"
                          >
                            <Wifi className="w-6 h-6" /> Stop
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCameraToggle(false)}
                          className="col-span-2 md:col-span-2 flex items-center justify-center gap-2 py-3 px-5 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg transition-all duration-300"
                        >
                          Matikan Kamera
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Preview & Result Section */}
              <div className="space-y-6">
                {mediaPreview && !realtimeMode && (
                  <div className="space-y-3">
                    <label className="block text-md font-medium text-gray-800">
                      Pratinjau Media
                    </label>
                    <div className="flex justify-center rounded-lg overflow-hidden border border-gray-300 bg-gray-200">
                      {mediaFile?.type?.startsWith("image/") ? (
                        <img
                          src={mediaPreview}
                          alt="Preview"
                          className="max-h-72 w-auto object-cover"
                        />
                      ) : (
                        <video
                          src={mediaPreview}
                          controls
                          className="max-h-72 w-auto"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-md text-red-600 hover:text-red-500 flex items-center gap-1"
                    >
                      <XCircle className="w-5 h-5" /> Hapus Media
                    </button>
                  </div>
                )}

                {realtimeMode && (
                  <div className="p-5 bg-blue-100 rounded-lg border border-blue-300">
                    <h3 className="font-medium text-blue-800 mb-3 text-md flex items-center gap-2">
                      <Wifi className="w-6 h-6" /> HASIL REAL-TIME:
                    </h3>
                    <div className="text-3xl font-bold text-blue-600 min-h-[36px]">
                      {realtimePrediction || "Menunggu input..."}
                    </div>
                  </div>
                )}

                {predictionResult && (
                  <div className="p-5 bg-green-100 rounded-lg border border-green-300">
                    <h3 className="font-medium text-green-800 mb-3 text-md flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" /> HASIL TERJEMAHAN:
                    </h3>
                    <div className="text-4xl font-bold text-green-700">
                      {predictionResult.prediction?.label || "Tidak dikenali"}
                    </div>
                    {predictionResult.prediction?.confidence && (
                      <div className="mt-2 text-md text-green-600">
                        Akurasi:{" "}
                        {(predictionResult.prediction.confidence * 100).toFixed(
                          1
                        )}
                        %
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg text-md flex items-center gap-2 border border-red-300">
                    <AlertTriangle className="w-6 h-6" />
                    {error}
                  </div>
                )}

                {!realtimeMode && (
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!mediaFile || isLoading}
                      className={`w-full py-4 px-5 rounded-lg shadow-lg text-white font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-lg transition-all duration-300 ${
                        isLoading || !mediaFile
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700"
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Memproses...
                        </span>
                      ) : (
                        "Terjemahkan Sekarang"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 h-fit shadow-lg border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Riwayat Terjemahan
            </h2>

            {predictionHistory.length === 0 ? (
              <div className="text-center py-10 px-6 border-2 border-gray-300 border-dashed rounded-lg">
                <p className="text-md text-gray-500">
                  Belum ada riwayat terjemahan.
                </p>
              </div>
            ) : (
              <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {predictionHistory.map((item, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-white transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        {item.text}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.timestamp}
                      </span>
                    </div>
                    {item.type && (
                      <span
                        className={`inline-flex items-center mt-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                          item.type === "image"
                            ? "bg-cyan-200 text-cyan-800"
                            : "bg-purple-200 text-purple-800"
                        }`}
                      >
                        {item.type === "image" ? "Gambar" : "Video"}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {predictionHistory.length > 0 && (
              <button
                onClick={() => setPredictionHistory([])}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 text-md bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" /> Hapus Riwayat
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Translation;
