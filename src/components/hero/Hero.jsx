import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: "https://demo-source.imgix.net/canyon.jpg",
      title: "Penerjemah Bahasa Isyarat Terbaik",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis inventore aliquid ab labore facilis eum.",
      ctaPrimary: "Mulai Sekarang",
      ctaSecondary: "Tentang",
      primaryColor: "orange"
    },
    {
      image: "https://demo-source.imgix.net/mountains.jpg",
      title: "Belajar Bahasa Isyarat dengan Mudah",
      description: "Temporibus animi qui nostrum neque similique totam repudiandae sunt adipisci necessitatibus beatae.",
      ctaPrimary: "Mulai Sekarang",
      ctaSecondary: "Tentang",
      primaryColor: "orange"
    },
    {
      image: "https://demo-source.imgix.net/house.jpg",
      title: "Komunitas Tuli yang Inklusif",
      description: "Quis inventore aliquid ab labore facilis eum, temporibus animi qui nostrum neque similique.",
      ctaPrimary: "Mulai Sekarang",
      ctaSecondary: "Tentang",
      primaryColor: "green"
    }
  ];

  // Carousel Bergilir Otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Container Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Gambar Latar dengan Overlay */}
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 bg-gradient-to-r from-black/30 to-black/30"></div>
            
            {/* Konten */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-tight mb-6">
                    {slide.title.split(' ').map((word, i, words) => (
                        <span key={i}>
                        {i === words.length - 1 ? (
                            <span className={`text-${slide.primaryColor}-400`}>{word}</span>
                        ) : (
                            word + ' '
                        )}
                        </span>
                    ))}
                    </h1>
                  
                  <p className="text-lg md:text-xl mb-8 text-gray-100">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/login"
                      className={`px-8 py-3 bg-orange-400 hover:bg-${slide.primaryColor}-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-center`}
                    >
                      {slide.ctaPrimary}
                    </a>
                    <a
                      href="/about"
                      className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/20 shadow-sm transition-all duration-300 text-center backdrop-blur-sm"
                    >
                      {slide.ctaSecondary}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Titik-titik Navigasi */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}