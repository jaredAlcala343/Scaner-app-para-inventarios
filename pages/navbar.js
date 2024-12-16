import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeLg, faShoppingCart, faSignOut } from '@fortawesome/free-solid-svg-icons';
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
            <Link href="/dashboard"> 
            <p className={styles.cartLink}>
            <FontAwesomeIcon icon={faHomeLg}/>
            </p>
          </Link>
          <Link href="/cart">
              <p className={styles.cartLink}>
                <FontAwesomeIcon icon={faShoppingCart} />
              </p>
           </Link>

           <Link href="/">
              <p className={styles.cartLink}>
                <FontAwesomeIcon icon={faSignOut} />
              </p>
           </Link>

          </>
        ) : (
          <Link href="/signin">
            <button className={`${styles.button} ${styles.loginButton}`}>
              Iniciar sesión
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
