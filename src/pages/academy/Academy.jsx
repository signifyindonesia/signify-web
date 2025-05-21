import { useState, useEffect } from "react";

const alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export default function Academy() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("alphabet");
  
  const handleLetterClick = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Auto-rotate effect (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev === alphabets.length - 1 ? 0 : prev + 1));
          setIsAnimating(false);
        }, 300);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white flex flex-col overflow-hidden relative">
      {/* Background particles/dots effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      {/* Header */}
      <header className="w-full py-8 px-6 text-center relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-orange-400 mb-3 drop-shadow-lg">
          Kamus Bahasa Isyarat
        </h1>
        <p className="text-blue-900 max-w-lg mx-auto">
          Pelajari komunikasi tanpa suara dengan koleksi lengkap bahasa isyarat Indonesia
        </p>
      </header>
      
      {/* Category Tabs */}
      <div className="flex justify-center mb-6 px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex space-x-1">
          <button 
            onClick={() => handleCategoryChange("alphabet")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === "alphabet" 
                ? "bg-white text-blue-900 shadow-lg font-medium" 
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            Alfabet
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1 px-4 pb-8 gap-8 max-w-6xl mx-auto w-full">
        {/* Alphabet Selector - Left side */}
        <div className="md:w-1/3 md:max-w-xs">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 h-full shadow-xl border border-white/20">
            <h2 className="text-blue-100 font-semibold mb-4 text-lg text-center">
              Pilih Huruf
            </h2>
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {alphabets.map((letter, index) => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(index)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-lg font-bold shadow-sm transition-all duration-300 hover:scale-105 ${
                    currentIndex === index 
                      ? "bg-orange-400 text-white ring-2 ring-white/50" 
                      : "bg-white/20 text-blue-100 hover:bg-white/30"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Display Card - Right side */}
        <div className="md:w-2/3 flex flex-col">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 flex-1 shadow-xl border border-white/20 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-blue-100 font-semibold text-lg">
                Visualisasi Isyarat
              </h2>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              </div>
            </div>
            
            {/* Image display */}
            <div className="flex-1 flex items-center justify-center bg-white rounded-2xl p-6 overflow-hidden">
              <div className={`transition-all duration-300 ease-in-out transform ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'} flex flex-col items-center`}>
                <div className="bg-gradient-to-br from-blue-600 to-blue-300 p-1 rounded-full mb-6">
                  <div className=" rounded-full w-20 h-20 flex items-center justify-center text-white text-5xl font-bold">
                    {alphabets[currentIndex]}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl"></div>
                  <img
                    src={`/alphabets/${alphabets[currentIndex]}.jpg`}
                    alt={`Isyarat huruf ${alphabets[currentIndex]}`}
                    className="w-64 h-64 object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
            
            {/* Navigation controls */}
            <div className="flex justify-center mt-6 space-x-4">
              <button 
                onClick={() => handleLetterClick(currentIndex === 0 ? alphabets.length - 1 : currentIndex - 1)}
                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => handleLetterClick(currentIndex === alphabets.length - 1 ? 0 : currentIndex + 1)}
                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Description panel */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 mt-4 shadow-xl border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">
              Huruf "{alphabets[currentIndex]}"
            </h3>
            <p className="text-white">
              Isyarat untuk huruf "{alphabets[currentIndex]}" dibentuk dengan posisi tangan seperti yang ditunjukkan pada gambar. Perhatikan posisi jari dan arah telapak tangan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}