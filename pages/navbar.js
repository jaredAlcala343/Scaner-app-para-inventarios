import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar = () => {
  const [name, setName] = useState('');

  // Leer el nombre del usuario desde el localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    window.location.href = '/'; // Redirigir al login
  };

  return (
    <nav className={styles.navbar}>
        <span className={styles.navbarBrand}>
          CUBYLAM & CHALET
        </span>

      <div className={styles.navbarNav}>
        {name ? (
          <>
            <span className={styles.navLink}>Hola, {name}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link href="/signin">
            <button className={styles.loginButton}>
              Iniciar sesión
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
