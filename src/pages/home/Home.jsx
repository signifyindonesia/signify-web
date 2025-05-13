import { useState } from "react";
import Hero from "../../components/hero/Hero";
import { FaCrown } from "react-icons/fa";
import {
  FaRegLightbulb,
  FaHandsHelping,
  FaGraduationCap,
  FaMobileAlt,
} from "react-icons/fa";

// Diperuntukan untuk section Cara kerja signify
const steps = [
  {
    id: 1,
    title: "Daftar",
    description:
      "Buat akun gratis dan mulai perjalanan pembelajaran bahasa isyarat Anda.",
    icon: <FaRegLightbulb className="w-6 h-6 text-blue-500" />,
    image:
      "https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Pilih Modul",
    description:
      "Pilih dari berbagai modul pembelajaran yang disesuaikan dengan tingkat kemampuan Anda.",
    icon: <FaHandsHelping className="w-6 h-6 text-blue-500" />,
    image:
      "https://images.unsplash.com/photo-1746990263194-0e2826fed608?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Belajar",
    description:
      "Pelajari bahasa isyarat dengan video interaktif, latihan, dan pengenalan karakter.",
    icon: <FaGraduationCap className="w-6 h-6 text-blue-500" />,
    image: "https://images.unsplash.com/photo-1746730251085-34132b6dcec5?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  },
  {
    id: 4,
    title: "Praktek",
    description:
      "Gunakan fitur penerjemah AI untuk mempraktekkan dan menerima umpan balik secara real-time.",
    icon: <FaMobileAlt className="w-6 h-6 text-blue-500" />,
    image: "https://images.unsplash.com/photo-1746950862687-3017c5818710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
  // Variabel untuk dibagian section cara kerja signify
  const [activeStep, setActiveStep] = useState(steps[0]);
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-200 shadow-md px-4 md:px-6 py-4 flex justify-center">
        <h1 className="text-white text-lg font-semibold">
          Free Sign Learning Module
        </h1>
      </div>

      {/* Feature Section */}
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Image - Added flex and object-cover to make it fill the height */}
            <div className="order-2 md:order-1 flex items-center h-full">
              <img
                src="https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature illustration"
                className="w-full h-full object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <div className="max-w-lg">
                <h2 className="text-2xl font-semibold text-black sm:text-3xl">
                  Tentang Kami
                </h2>
                <p className="mt-4 text-blue-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur doloremque saepe architecto maiores repudiandae amet
                  perferendis repellendus, reprehenderit voluptas sequi.
                </p>

                {/* Fitur Signify */}
                <div className="mt-10 rounded-xl bg-white shadow-md">
                  <div className="px-6 py-4 bg-blue-500 rounded-t-xl">
                    <h2 className="text-white text-2xl font-semibold text-center">
                      Fitur Signify
                    </h2>
                  </div>

                  <ul className="px-8 py-6 space-y-5 text-gray-700 text-base bg-blue-200">
                    <li className="flex items-start gap-3">
                      <FaCrown className="text-yellow-500 w-5 h-5 mt-1" />
                      <span>
                        Akses modul pembelajaran bahasa isyarat secara gratis
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCrown className="text-yellow-500 w-5 h-5 mt-1" />
                      <span>Penerjemah otomatis teks ke bahasa isyarat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCrown className="text-yellow-500 w-5 h-5 mt-1" />
                      <span>Akademi daring untuk semua usia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCrown className="text-yellow-500 w-5 h-5 mt-1" />
                      <span>API dokumentasi untuk integrasi pihak ketiga</span>
                    </li>
                    <div className="flex justify-center mt-8">
                      <button className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                        Try Now
                      </button>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja Signify Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-200 py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Cara Kerja Signify
            </h2>
            <p className="mt-4 text-white max-w-2xl mx-auto">
              Platform pembelajaran bahasa isyarat yang mudah digunakan untuk
              semua orang. Berikut adalah bagaimana Signify membantu Anda
              belajar.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Step List */}
            <div className="flex-1 space-y-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step)}
                  className={`cursor-pointer p-4 rounded-lg border ${
                    activeStep.id === step.id
                      ? "bg-orange-300 border-purple-800 shadow-md"
                      : "bg-white hover:shadow"
                  } transition`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-blue-100">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {step.id}. {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Displayed Image */}
            <div className="flex-1 flex justify-center items-center">
              <img
                src={activeStep.image}
                alt={`Ilustrasi ${activeStep.title}`}
                className="w-full max-w-md rounded-lg shadow-lg transition duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Signify Section */}
      <section id="solutions" className="py-24 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-4">
              Fitur Signify
            </h2>
            <p className="text-gray-500 text-lg">
              Teknologi aksesibel dengan dukungan kecerdasan buatan untuk semua
              media
            </p>
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
          </div>

          {/* Solutions */}
          {[
            {
              title: "Web Sign Language Plugin",
              desc: "It makes the sentences on the websites clickable, and with the support of artificial intelligence, the clicked sentences are instantly translated into sign language.",
              img: "https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop",
              reverse: false,
            },
            {
              title: "Video Sign Language Plugin",
              desc: "With the support of artificial intelligence it translates videos with subtitles into sign language synchronously.",
              img: "https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop",
              reverse: true,
            },
            {
              title: "PDF Sign Language Plugin",
              desc: "Sentences in contracts, documents, forms etc. in PDF format become clickable and instantly translated into sign language with the support of artificial intelligence.",
              img: "https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop",
              reverse: false,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`relative mb-20 group transition-transform duration-500 hover:scale-[1.01]`}
            >
              {/* Background Gradient Blur */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-3xl -z-10 transform ${
                  item.reverse ? "-translate-x-4" : "translate-x-4"
                } translate-y-4 blur-sm`}
              ></div>

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div
                  className={`flex flex-col ${
                    item.reverse ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Text Content */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {item.title.split(" ").slice(0, -2).join(" ")} <br />
                      {item.title.split(" ").slice(-2).join(" ")}
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">{item.desc}</p>
                  </div>

                  {/* Image Area */}
                  <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-500 p-6">
                    <div className="relative w-full max-w-md z-10 transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Signify */}
      <section
        id="why-signify"
        className="py-24 bg-gradient-to-r from-blue-500 to-blue-200"
      >
        <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Kenapa Harus Memilih Signify?
            </h2>
            <p className="text-white text-lg">
              Kami percaya bahwa aksesibilitas digital adalah hak semua orang.
              Inilah alasan Signify menjadi pilihan terbaik.
            </p>
          </div>

          {/* Vertical Card List */}
          <div className="space-y-8">
            {[
              {
                title: "Teknologi AI Canggih",
                desc: "Menggunakan kecerdasan buatan terkini untuk menerjemahkan bahasa isyarat secara real-time.",
                icon: "🤖",
              },
              {
                title: "Meningkatkan Aksesibilitas",
                desc: "Membantu pengguna tunarungu memahami konten digital lebih mudah dan mandiri.",
                icon: "♿",
              },
              {
                title: "Integrasi Mudah",
                desc: "Plugin bisa langsung diintegrasikan ke website, video, dan dokumen PDF tanpa coding rumit.",
                icon: "🔌",
              },
              {
                title: "Waktu Respons Cepat",
                desc: "Terjemahan berlangsung secara instan ketika pengguna klik konten atau subtitle.",
                icon: "⚡",
              },
              {
                title: "Multimedia Support",
                desc: "Bekerja di berbagai format: teks, video, dan PDF untuk pengalaman menyeluruh.",
                icon: "🎥",
              },
              {
                title: "Ramah Pengguna",
                desc: "UI/UX yang mudah digunakan bahkan oleh pengguna awam sekalipun.",
                icon: "👌",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 bg-orange-300 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-black">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
