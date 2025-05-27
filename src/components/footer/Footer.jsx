import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className='bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Informasi Utama */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold font-heading'>
              Signify Indonesia
            </h3>
            <p className='text-blue-100'>Sahabat Tuli Indonesia.</p>
            <div className='flex space-x-4'>
              <a
                href='#'
                aria-label='Facebook'
                className='text-blue-100 hover:text-white transition-colors'
              >
                <Facebook className='w-6 h-6' />
              </a>
              <a
                href='#'
                aria-label='Twitter'
                className='text-blue-100 hover:text-white transition-colors'
              >
                <Twitter className='w-6 h-6' />
              </a>
              <a
                href='#'
                aria-label='Instagram'
                className='text-blue-100 hover:text-white transition-colors'
              >
                <Instagram className='w-6 h-6' />
              </a>
              <a
                href='#'
                aria-label='LinkedIn'
                className='text-blue-100 hover:text-white transition-colors'
              >
                <Linkedin className='w-6 h-6' />
              </a>
              <a
                href='https://github.com/signifyindonesia'
                target='_blank'
                aria-label='Github'
                className='text-blue-100 hover:text-white transition-colors'
              >
                <Github className='w-6 h-6' />
              </a>
            </div>
          </div>

          {/* Link Cepat */}
          <div>
            <h3 className='text-lg font-semibold font-heading'>Quick Links</h3>
            <ul className='mt-4 space-y-2'>
              <li>
                <a
                  href='/home'
                  className='text-blue-100 hover:text-white transition-colors'
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href='/about'
                  className='text-blue-100 hover:text-white transition-colors'
                >
                  Tentang
                </a>
              </li>
              <li>
                <a
                  href='/academy'
                  className='text-blue-100 hover:text-white transition-colors'
                >
                  Akademi
                </a>
              </li>
              <li>
                <a
                  href='/translation'
                  className='text-blue-100 hover:text-white transition-colors'
                >
                  Penerjemah
                </a>
              </li>
              <li>
                <a
                  href='/docs'
                  className='text-blue-100 hover:text-white transition-colors'
                >
                  Dokumentasi API
                </a>
              </li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className='text-lg font-semibold font-heading'>Layanan Kami</h3>
            <ul className='mt-4 space-y-2'>
              <li>
                <a
                  href='/academy'
                  className='text-blue-100 hover:text-white transition-colors'
                >
                  Akademi Belajar Bahasa Isyarat
                </a>
              </li>
              <li>
                <a
                  href='/home'
                  className='text-blue-100 hover:text-white transition-colors'
                >
                  Penerjemah Bahasa API
                </a>
              </li>
              <li>
                <a
                  href='/docs'
                  className='text-blue-100 hover:text-white transition-colors'
                >
                  Dokumentasi API
                </a>
              </li>
            </ul>
          </div>

          {/* Informasi Kontak */}
          <div>
            <h3 className='text-lg font-semibold font-heading'>Contact Us</h3>
            <address className='mt-4 not-italic space-y-2'>
              <p className='text-blue-100'>Jakarta, Indonesia</p>
              <p className='text-blue-100'>Indonesia</p>
              <p className='text-blue-100'>
                <a
                  href='mailto:info@signify.id'
                  className='hover:text-white transition-colors'
                >
                  info@signify.id
                </a>
              </p>
              <p className='text-blue-100'>
                <a
                  href='tel:+622112345678'
                  className='hover:text-white transition-colors'
                >
                  +62 21 1234 5678
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bagian Bawah */}
        <div className='mt-12 pt-8 border-t border-blue-400 flex flex-col md:flex-row justify-center items-center'>
          <p className='text-blue-100 text-sm'>
            © {new Date().getFullYear()} Signify Indonesia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
