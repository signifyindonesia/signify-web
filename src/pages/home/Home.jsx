import { useState } from "react";
import Hero from "../../components/hero/Hero";
import { Link } from "react-router-dom";
import {
  FaCrown,
  FaRobot,
  FaWheelchair,
  FaBolt,
  FaVideo,
  FaRegSmileWink,
  FaRegLightbulb,
  FaHandsHelping,
  FaGraduationCap,
  FaMobileAlt,
} from "react-icons/fa";
import { MdPower } from "react-icons/md";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Diperuntukan untuk section Cara kerja signify
const steps = [
  {
    id: 1,
    title: "Daftar",
    description:
      "Buat akun gratis dan mulai perjalanan pembelajaran bahasa isyarat Anda.",
    icon: <FaRegLightbulb className="w-6 h-6 text-blue-500" />,
    image:
      "/registration.jpg", // Registration/signup form
  },
  {
    id: 2,
    title: "Pilih Modul",
    description:
      "Pilih dari berbagai modul pembelajaran yang disesuaikan dengan tingkat kemampuan Anda.",
    icon: <FaHandsHelping className="w-6 h-6 text-blue-500" />,
    image:
      "/choosemodul.jpg", // Person choosing/selecting modules
  },
  {
    id: 3,
    title: "Belajar",
    description:
      "Pelajari bahasa isyarat dengan video interaktif, latihan, dan pengenalan karakter.",
    icon: <FaGraduationCap className="w-6 h-6 text-blue-500" />,
    image:
      "/study.jpg", // Learning/studying scene
  },
  {
    id: 4,
    title: "Praktek",
    description:
      "Gunakan fitur penerjemah AI untuk mempraktekkan dan menerima umpan balik secara real-time.",
    icon: <FaMobileAlt className="w-6 h-6 text-blue-500" />,
    image:
      "/practice.jpg", // Hands practicing sign language
  },
];

export default function Home() {
  // Data
  const populationData = [
    { tahun: "2018", jumlah: 2.5 },
    { tahun: "2019", jumlah: 2.7 },
    { tahun: "2020", jumlah: 2.8 },
    { tahun: "2021", jumlah: 3.0 },
    { tahun: "2022", jumlah: 3.2 },
    { tahun: "2023", jumlah: 3.4 },
    { tahun: "2024", jumlah: 3.5 },
  ];

  const ageDistributionData = [
    { name: "0-14 tahun", value: 15 },
    { name: "15-24 tahun", value: 22 },
    { name: "25-44 tahun", value: 38 },
    { name: "45-64 tahun", value: 18 },
    { name: "65+ tahun", value: 7 },
  ];

  const assistiveTechData = [
    { name: "Alat Bantu Dengar", pengguna: 45 },
    { name: "Implant Koklea", pengguna: 15 },
    { name: "Aplikasi Isyarat", pengguna: 65 },
    { name: "Alat Komunikasi Visual", pengguna: 35 },
    { name: "Caption", pengguna: 85 },
  ];

  const accessibilityData = [
    { sektor: "Pendidikan", tingkat: 45, target: 100 },
    { sektor: "Kesehatan", tingkat: 38, target: 100 },
    { sektor: "Pekerjaan", tingkat: 25, target: 100 },
    { sektor: "Transportasi", tingkat: 30, target: 100 },
    { sektor: "Digital", tingkat: 50, target: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
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
                src="/signify.png"
                alt="Feature illustration"
                className="w-full h-full object-fit rounded-xl shadow-md"
              />
            </div>

            {/* Text */}
            <div className="order-1 md:order-2">
              <div className="max-w-lg">
                <h2 className="text-2xl font-semibold text-black sm:text-3xl">
                  Tentang Kami
                </h2>
                <p className="mt-4 text-black text-justify">
                  Signify, sebuah aplikasi penerjemah bahasa isyarat berbasis
                  AI, hadir sebagai solusi inovatif untuk menjembatani
                  kesenjangan komunikasi antara penyandang tunarungu dan
                  masyarakat umum. Mengandalkan teknologi kecerdasan buatan
                  terkini, aplikasi ini memiliki kemampuan untuk menerjemahkan
                  gerakan bahasa isyarat secara real-time menjadi teks maupun
                  suara. Dengan target pengguna yang luas, mulai dari individu
                  penyandang tunarungu, institusi pendidikan dan layanan publik,
                  hingga lingkungan kerja yang inklusif, Signify diharapkan
                  dapat memfasilitasi interaksi yang lebih mudah dan efektif.
                  Proyek ambisius ini merupakan hasil kolaborasi antara tim
                  Machine Learning dan Frontend-Backend Development dalam
                  program capstone Coding Camp powered by DBS Foundation 2025.
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
                      <Link to="/login">
                        <button className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                          Try Now
                        </button>
                      </Link>
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
              title: "Upload Image",
              desc: "Pengguna dapat mengunggah gambar yang berisi isyarat tangan, kemudian sistem secara otomatis menganalisis konten visual tersebut dan menerjemahkannya ke dalam bahasa isyarat.",
              img: "/upload-img.jpg",
              reverse: false,
            },
            {
              title: "Kamera Langsung (Live Camera)",
              desc: "Melalui integrasi kamera secara langsung, pengguna dapat merekam atau menunjukkan isyarat secara real-time dan mendapatkan terjemahan langsung ke dalam teks.",
              img: "/live-cam.jpg",
              reverse: true,
            },
            {
              title: "Video Realtime",
              desc: "Fitur ini memungkinkan pemrosesan video secara real-time dengan dukungan subtitle untuk diterjemahkan secara langsung ke dalam bahasa isyarat",
              img: "/video-realtime.jpg",
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
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Card Grid - 3x3 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Teknologi AI Canggih",
                desc: "Menggunakan kecerdasan buatan terkini untuk menerjemahkan bahasa isyarat secara real-time.",
                icon: <FaRobot className="text-white" />,
              },
              {
                title: "Meningkatkan Aksesibilitas",
                desc: "Membantu pengguna tunarungu memahami konten digital lebih mudah dan mandiri.",
                icon: <FaWheelchair className="text-white" />,
              },
              {
                title: "Integrasi Mudah",
                desc: "Plugin bisa langsung diintegrasikan ke website dan video tanpa coding rumit.",
                icon: <MdPower className="text-white" />,
              },
              {
                title: "Waktu Respons Cepat",
                desc: "Terjemahan berlangsung secara instan ketika pengguna klik konten.",
                icon: <FaBolt className="text-white" />,
              },
              {
                title: "Multimedia Support",
                desc: "Bekerja di berbagai format: teks, gambar, dan realtime video untuk pengalaman menyeluruh.",
                icon: <FaVideo className="text-white" />,
              },
              {
                title: "Ramah Pengguna",
                desc: "UI/UX yang mudah digunakan bahkan oleh pengguna awam sekalipun.",
                icon: <FaRegSmileWink className="text-white" />,
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

      {/* Banner Section */}
      <div className="bg-orange-300 shadow-md px-4 md:px-6 py-4 flex justify-center">
        <h1 className="text-white text-lg font-semibold">
          Statistik Data Terhadap Teman Tuli
        </h1>
      </div>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Visualisasi Data Komunitas Tuli
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Data dan statistik inklusif untuk memahami lebih baik tentang
              komunitas tuli di Indonesia dan tantangan aksesibilitas yang
              dihadapi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Grafik Populasi */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Estimasi Populasi Tuli di Indonesia
              </h3>
              <p className="text-gray-600 mb-4">
                Pertumbuhan jumlah populasi tuli dalam jutaan orang (2018-2024)
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={populationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tahun" />
                    <YAxis
                      label={{
                        value: "Jutaan",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="jumlah"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribusi Usia */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Distribusi Usia Komunitas Tuli
              </h3>
              <p className="text-gray-600 mb-4">
                Persentase berdasarkan kelompok usia
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {ageDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Penggunaan Teknologi Asistif */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Penggunaan Teknologi Asistif
              </h3>
              <p className="text-gray-600 mb-4">
                Persentase penggunaan berbagai alat bantu dan teknologi
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assistiveTechData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="pengguna"
                      fill="#00C49F"
                      name="Persentase Pengguna (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tingkat Aksesibilitas */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Tingkat Aksesibilitas di Berbagai Sektor
              </h3>
              <p className="text-gray-600 mb-4">
                Perbandingan kondisi sekarang dan target ideal (dalam %)
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accessibilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sektor" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="tingkat"
                      fill="#0088FE"
                      name="Tingkat Saat Ini (%)"
                    />
                    <Bar
                      dataKey="target"
                      fill="#FFBB28"
                      name="Target Ideal (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
