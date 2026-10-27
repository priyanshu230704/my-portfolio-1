"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Code2 } from 'lucide-react';
import styles from './Navbar.module.css';

const homeSections = [
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
];

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const homeRef = useRef<HTMLLIElement>(null);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!homeOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (homeRef.current && !homeRef.current.contains(e.target as Node)) {
        setHomeOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [homeOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoIcon} aria-hidden>
              <Code2 size={18} strokeWidth={2.25} />
            </span>
            <span className={styles.logoText}>
              <span className={styles.logoPrimary}>Priyansu</span>
              <span className={styles.logoSecondary}> Chavda</span>
            </span>
          </Link>
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
          <li
            ref={homeRef}
            className={styles.dropdownWrap}
            onMouseEnter={() => setHomeOpen(true)}
            onMouseLeave={() => setHomeOpen(false)}
          >
            <button
              type="button"
              className={`${styles.navLink} ${styles.dropdownTrigger} ${homeOpen ? styles.navLinkActive : ''}`}
              onClick={() => setHomeOpen((open) => !open)}
              aria-expanded={homeOpen}
              aria-haspopup="true"
            >
              Home
              <ChevronDown size={16} className={`${styles.chevron} ${homeOpen ? styles.chevronOpen : ''}`} />
            </button>
            <ul className={`${styles.dropdown} ${homeOpen ? styles.dropdownOpen : ''}`}>
              {homeSections.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.dropdownItem}
                    onClick={() => setHomeOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className={styles.contactBtn}>
              Hire Me
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
          <li className={styles.mobileGroupLabel}>Home</li>
          {homeSections.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.mobileSubLink} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
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
            Hire Me
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
