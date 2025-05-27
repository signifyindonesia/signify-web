import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

const About = () => {
  const [activeMenu, setActiveMenu] = useState("Tentang Kami");

  const menuItems = [
    {
      label: "Tentang Kami",
      content: (
        <>
          <p>
            <strong>Signify</strong> adalah aplikasi penerjemah bahasa isyarat
            berbasis AI yang bertujuan menjembatani komunikasi antara penyandang
            tunarungu dan masyarakat umum. Dengan teknologi kecerdasan buatan
            terkini, Signify mampu menerjemahkan gerakan bahasa isyarat secara
            real-time menjadi teks atau suara.
          </p>
          <br />
          <p>Signify dirancang untuk berbagai pengguna, termasuk:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Individu penyandang tunarungu</li>
            <li>Institusi pendidikan dan layanan publik</li>
            <li>Lingkungan kerja inklusif</li>
          </ul>
          <br />
          <p>
            Proyek ini dikembangkan oleh tim capstone{" "}
            <b>Coding Camp powered by DBS Foundation 2025</b>, hasil kolaborasi
            antara Machine Learning dan Frontend-Backend Development.
          </p>
          <br />
          <p>
            GitHub Repository:{" "}
            <a
              href="https://github.com/signifyindonesia/"
              className="underline text-blue-500 hover:text-black"
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
          <p>
            Visi kami adalah menjadi platform penerjemah bahasa isyarat terdepan
            secara global yang:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Menghubungkan semua orang tanpa hambatan komunikasi</li>
            <li>
              Mendorong inklusivitas di bidang pendidikan, pekerjaan, dan
              layanan publik
            </li>
            <li>Mudah diakses di berbagai perangkat dan platform</li>
            <li>Memberikan solusi berkelanjutan berbasis teknologi terkini</li>
          </ul>
        </>
      ),
    },
    {
      label: "Misi",
      content: (
        <>
          <p>
            Misi kami adalah mengembangkan solusi AI yang efektif dan inklusif
            melalui:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Pengembangan teknologi AI yang akurat dan ramah pengguna</li>
            <li>
              Keterlibatan aktif komunitas tunarungu dalam pengujian dan
              pengembangan
            </li>
            <li>Edukasi masyarakat tentang pentingnya komunikasi inklusif</li>
            <li>
              Penyediaan pelatihan dan dokumentasi untuk pengguna dan mitra
            </li>
            <li>
              Integrasi feedback pengguna sebagai dasar pengembangan
              berkelanjutan
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen p-6 sm:p-10 md:p-16 bg-gradient-to-r from-blue-600 to-blue-300 flex flex-col xl:flex-row gap-6">
        {/* Menu Kiri */}
        <nav className="bg-white/90 backdrop-blur-md rounded-lg shadow-md w-full xl:w-80 flex flex-col xl:justify-center pt-8 pb-8 px-4 sm:px-6">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.label)}
              className={`w-full text-left px-4 py-3 border-b-2 border-blue-300 ${
                index === menuItems.length - 1 ? "border-b-0" : ""
              } flex justify-between items-center transition-colors duration-300 ${
                activeMenu === item.label
                  ? "bg-blue-200 font-semibold text-blue-800"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <span>{item.label}</span>
              <FaAngleRight
                className={`transition-transform duration-300 ${
                  activeMenu === item.label ? "rotate-90" : ""
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Konten Kanan */}
        <section className="flex-1 bg-white/90 backdrop-blur-md text-gray-800 px-4 sm:px-6 py-6 rounded-lg overflow-auto  leading-relaxed text-base sm:text-lg shadow-md border border-gray-200">
          {menuItems.find((item) => item.label === activeMenu).content}
        </section>
      </div>
    </>
  );
};

export default About;
