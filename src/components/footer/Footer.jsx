export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Informasi Utama */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-heading">
              Signify Indonesia
            </h3>
            <p className="text-blue-100">Sahabat Tuli Indonesia.</p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.012.388a6.5 6.5 0 00-2.346 1.267A6.5 6.5 0 00.388 5.012C.204 5.52.082 6.094.048 7.041.013 7.989 0 8.396 0 12.017c0 3.624.013 4.09.048 5.020.034.926.156 1.5.34 2.009a6.5 6.5 0 001.267 2.346 6.5 6.5 0 002.357 1.267c.508.184 1.083.306 2.009.34.93.035 1.396.048 5.02.048 3.624 0 4.09-.013 5.02-.048.926-.034 1.5-.156 2.009-.34a6.5 6.5 0 002.346-1.267 6.5 6.5 0 001.267-2.357c.184-.508.306-1.083.34-2.009.035-.93.048-1.396.048-5.02 0-3.624-.013-4.09-.048-5.02-.034-.926-.156-1.5-.34-2.009a6.5 6.5 0 00-1.267-2.346A6.5 6.5 0 0019.988.388c-.508-.184-1.083-.306-2.009-.34C17.049.013 16.582 0 12.958 0h.059zm-.717 1.442h.718c3.136 0 3.553.012 4.81.046.178.008.363.02.555.037a4.02 4.02 0 011.357.261 4.178 4.178 0 011.02.598 4.178 4.178 0 01.598 1.02c.120.427.207.9.261 1.357.017.192.029.377.037.555.034 1.257.046 1.674.046 4.81 0 3.136-.012 3.553-.046 4.81-.008.178-.02.363-.037.555a4.02 4.02 0 01-.261 1.357 4.178 4.178 0 01-.598 1.02 4.178 4.178 0 01-1.02.598c-.427.12-.9.207-1.357.261-.192.017-.377.029-.555.037-1.257.034-1.674.046-4.81.046-3.136 0-3.553-.012-4.81-.046a5.4 5.4 0 01-.555-.037 4.02 4.02 0 01-1.357-.261 4.178 4.178 0 01-1.02-.598 4.178 4.178 0 01-.598-1.02 4.02 4.02 0 01-.261-1.357 5.4 5.4 0 01-.037-.555c-.034-1.257-.046-1.674-.046-4.81 0-3.136.012-3.553.046-4.81.008-.178.02-.363.037-.555a4.02 4.02 0 01.261-1.357 4.178 4.178 0 01.598-1.02 4.178 4.178 0 011.02-.598c.427-.12.9-.207 1.357-.261.192-.017.377-.029.555-.037.849-.035 1.178-.045 3.298-.046v.002zm5.932 1.409a.885.885 0 100 1.77.885.885 0 000-1.77zm-4.27 1.122a4.109 4.109 0 100 8.217 4.109 4.109 0 000-8.217zm0 1.441a2.667 2.667 0 110 5.334 2.667 2.667 0 010-5.334z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Cepat */}
          <div>
            <h3 className="text-lg font-semibold font-heading">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/home"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Tentang
                </a>
              </li>
              <li>
                <a
                  href="/academy"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Akademi
                </a>
              </li>
              <li>
                <a
                  href="/translation"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Penerjemah
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Dokumentasi API
                </a>
              </li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-lg font-semibold font-heading">Layanan Kami</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/academy"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Akademi Belajar Bahasa Isyarat
                </a>
              </li>
              <li>
                <a
                  href="/home"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Penerjemah Bahasa API
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Dokumentasi API
                </a>
              </li>
            </ul>
          </div>

          {/* Informasi Kontak */}
          <div>
            <h3 className="text-lg font-semibold font-heading">Contact Us</h3>
            <address className="mt-4 not-italic space-y-2">
              <p className="text-blue-100">Jakarta, Indonesia</p>
              <p className="text-blue-100">Indonesia</p>
              <p className="text-blue-100">
                <a
                  href="mailto:info@signify.id"
                  className="hover:text-white transition-colors"
                >
                  info@signify.id
                </a>
              </p>
              <p className="text-blue-100">
                <a
                  href="tel:+622112345678"
                  className="hover:text-white transition-colors"
                >
                  +62 21 1234 5678
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bagian Bawah */}
        <div className="mt-12 pt-8 border-t border-blue-400 flex flex-col md:flex-row justify-center items-center">
          <p className="text-blue-100 text-sm">
            © {new Date().getFullYear()} Signify Indonesia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
