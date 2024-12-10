import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './navbar.module.css';

const Navbar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/'; // Redirige a la página de inicio de sesión
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/products" passHref>
        <span className={styles.navbarBrand}>
          CUBYLAM & CHALET
        </span>
      </Link>
      <div className={styles.navbarNav}>
        <span className={styles.navLink}>Hola, {username}</span>
        <button className={styles.btnLink} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
