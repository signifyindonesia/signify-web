export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gray-50 lg:grid lg:h-screen lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Understand user flow and{" "}
              <strong className="text-indigo-600">increase</strong> conversions
            </h1>
            <p className="mt-4 text-base text-gray-700 sm:text-lg sm:leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
              nisi. Natus, provident accusamus impedit minima harum corporis
              iusto.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="#"
                className="inline-block rounded border border-blue-500 bg-orange-300 px-5 py-3 font-medium text-black shadow-sm transition-colors hover:bg-orange-500"
              >
                Mulai Sekarang!
              </a>
            </div>
          </div>
        </div>
      </section>

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
            {/* Image */}
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature illustration"
                className="w-full h-auto rounded shadow-md"
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
                <div className="mt-6 text-center border">
                  <a
                    href="#"
                    aria-current="true"
                    className="block w-full px-4 py-2 text-xl font-medium text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer hover:bg-blue-800 transition"
                  >
                    Fitur Signify
                  </a>

                  <ul className="mt-4 space-y-3 text-gray-800 text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✔️</span>
                      <span>
                        Akses modul pembelajaran bahasa isyarat secara gratis
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✔️</span>
                      <span>Penerjemah otomatis teks ke bahasa isyarat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✔️</span>
                      <span>Akademi daring untuk semua usia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✔️</span>
                      <span>API dokumentasi untuk integrasi pihak ketiga</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
