"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">PRIYANSU</Link>
        </div>

        <button
          className={`${styles.menuToggle} ${isOpen ? styles.menuToggleHidden : ''}`}
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className={styles.contactBtn}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <span className={styles.mobileMenuLabel}>Menu</span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>

        <ul className={styles.mobileNavLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.mobileMenuFooter}>
          <Link href="/#contact" className={styles.mobileContactBtn} onClick={closeMenu}>
            Contact Me
          </Link>
        </div>
      </div>

      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      />
    </nav>
  );
};

export default Navbar;
