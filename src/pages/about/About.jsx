import React, { useState } from "react";
import { Cpu, Code, ChevronRight } from 'lucide-react';

// Komponen TeamMemberDisplay yang akan diintegrasikan
const TeamMemberDisplay = () => {
  const teamData = [
    {
      category: "Front-End dan Back-End Developer",
      icon: <Code className="w-6 h-6 text-blue-500" />,
      members: [
        {
          name: "Yudha Rizky Alvingky",
          cohortId: "FC156D5Y1387",
          avatar: "/logo-sttnf.jpg"
        },
        {
          name: "Rizky Hilmiawan Anggoro",
          cohortId: "FC156D5Y1771",
          avatar: "/logo-sttnf.jpg"
        },
        {
          name: "Wisnu Nugroho",
          cohortId: "FC156D5Y1388",
          avatar: "/logo-sttnf.jpg"
        }
      ]
    },
    {
      category: "Machine Learning Engineer",
      icon: <Cpu className="w-6 h-6 text-orange-500" />,
      members: [
        {
          name: "Bagas Cahyawiguna",
          cohortId: "MC246D5Y2090",
          avatar: "/logo-uniku.png"
        },
        {
          name: "Alfanah Muhson Husain Nugroho",
          cohortId: "MC012D5Y2096",
          avatar: "/logo-telkom.png"
        },
        {
          name: "Muhamad Fahmi	",
          cohortId: "MC246D5Y2423",
          avatar: "/logo-uniku.png"
        }
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">Pengembang dan Perancang Aplikasi</h1>
      {teamData.map((section, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {section.category}
            </h2>
            {section.icon}
          </div>

          {section.members ? (
            <div className="space-y-4">
              {section.members.map((member, memberIndex) => (
                <div key={memberIndex} className="flex items-center space-x-3 sm:space-x-4 p-3 bg-white rounded-md shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-200">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src=member.fallbackAvatar }}
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      ID Cohort: {member.cohortId}
                    </p>
                    <div className="flex items-center mt-1">
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm sm:text-base">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


const About = () => {
  const [activeMenu, setActiveMenu] = useState("Tentang Aplikasi");

  const menuItems = [
    {
      label: "Tentang Aplikasi",
      content: (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">Signify</h1>
          <p className="mb-3">
            <strong>Signify</strong> adalah aplikasi penerjemah bahasa isyarat
            berbasis AI yang bertujuan menjembatani komunikasi antara penyandang
            tunarungu dan masyarakat umum. Dengan teknologi kecerdasan buatan
            terkini, Signify mampu menerjemahkan gerakan bahasa isyarat secara
            real-time menjadi teks atau suara.
          </p>
          <p className="mb-3">Signify dirancang untuk berbagai pengguna, termasuk:</p>
          <ul className="list-disc list-inside ml-4 mb-3 space-y-1">
            <li>Individu penyandang tunarungu</li>
            <li>Keluarga dan teman dari penyandang tunarungu</li>
            <li>Institusi pendidikan dan layanan publik</li>
            <li>Lingkungan kerja inklusif</li>
            <li>Masyarakat umum yang ingin belajar bahasa isyarat</li>
          </ul>
          <p className="mb-3">
            Proyek ini dikembangkan oleh tim capstone{" "}
            <b>Coding Camp powered by DBS Foundation 2025</b>, hasil kolaborasi
            antara Machine Learning dan Frontend-Backend Development.
          </p>
          <p>
            Repositori GitHub:{" "}
            <a
              href="https://github.com/signifyindonesia/"
              className="underline text-blue-600 hover:text-blue-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/signifyindonesia/
            </a>
          </p>
        </>
      ),
    },
    {
      label: "Visi",
      content: (
        <>
          <p className="mb-3">
            Visi kami adalah menjadi platform penerjemah bahasa isyarat terdepan
            secara global yang:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Menghubungkan semua orang tanpa hambatan komunikasi.</li>
            <li>
              Mendorong inklusivitas di bidang pendidikan, pekerjaan, dan
              layanan publik.
            </li>
            <li>Mudah diakses di berbagai perangkat dan platform.</li>
            <li>Memberikan solusi berkelanjutan berbasis teknologi terkini.</li>
            <li>Memberdayakan komunitas tunarungu melalui teknologi.</li>
          </ul>
        </>
      ),
    },
    {
      label: "Misi",
      content: (
        <>
          <p className="mb-3">
            Misi kami adalah mengembangkan solusi AI yang efektif dan inklusif
            melalui:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Pengembangan teknologi AI yang akurat dan ramah pengguna.</li>
            <li>
              Keterlibatan aktif komunitas tunarungu dalam pengujian dan
              pengembangan.
            </li>
            <li>Edukasi masyarakat tentang pentingnya komunikasi inklusif.</li>
            <li>
              Penyediaan pelatihan dan dokumentasi untuk pengguna dan mitra.
            </li>
            <li>
              Integrasi feedback pengguna sebagai dasar pengembangan
              berkelanjutan.
            </li>
          </ul>
        </>
      ),
    },
    {
      label: "Pengembang Aplikasi",
      content: <TeamMemberDisplay />,
    },
  ];

  return (
    <>
      <div className="min-h-screen p-4 sm:p-8 md:p-12 bg-gradient-to-br from-blue-600 via-blue-400 to-indigo-300 flex flex-col xl:flex-row gap-4 sm:gap-6">
        <nav className="bg-white/95 backdrop-blur-lg rounded-xl shadow-xl w-full xl:w-72 xl:max-w-xs flex-shrink-0 self-start xl:sticky xl:top-8">
          <div className="p-2 sm:p-3">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={`w-full text-left px-3 py-2.5 sm:px-4 sm:py-3 my-1 rounded-md flex justify-between items-center transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                activeMenu === item.label
                  ? "bg-blue-500 font-semibold text-white shadow-md"
                  : "hover:bg-blue-100 text-gray-700 hover:text-blue-700"
              }`}
            >
              <span className="text-sm sm:text-base">{item.label}</span>
              {/* Mengganti FaAngleRight dengan ChevronRight */}
              <ChevronRight
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                  activeMenu === item.label ? "rotate-90 text-white" : "text-blue-400"
                }`}
              />
            </button>
          ))}
          </div>
        </nav>

        <section className="flex-1 bg-white/95 backdrop-blur-lg text-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl overflow-y-auto leading-relaxed text-sm sm:text-base">
          <div key={activeMenu} className="animate-fadeIn">
            {menuItems.find((item) => item.label === activeMenu)?.content}
          </div>
        </section>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default About;