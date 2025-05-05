import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className='navbar'>
      <h1>Signify</h1>
      <ul>
        <li>
          <Link to='/'>Beranda</Link>
        </li>
        <li>
          <Link to='/about'>Tentang</Link>
        </li>
        <li>
          <Link to='/academy'>Akademi</Link>
        </li>
        <li>
          <Link to='/translator'>Penerjemah</Link>
        </li>
        <li>
          <Link to='/docs'>Dokumentasi API</Link>
        </li>
      </ul>
    </nav>
  );
}
