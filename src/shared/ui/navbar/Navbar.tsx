'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import logo from '@/assets/logo.webp';
import { useState, useCallback, useRef, useEffect } from 'react';

const navLinks = [
  { href: '/movies', label: 'Movies' },
  { href: '/characters', label: 'Characters' },
  { href: '/quotes', label: 'Quotes' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  const handleDrawerOpen = useCallback(() => setIsDrawerOpen(true), []);
  const handleDrawerClose = useCallback(() => setIsDrawerOpen(false), []);

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <Link href="/movies">
        <Image src={logo} alt="Logo" className={styles.logo} priority />
      </Link>
      <button
        className={styles.hamburger}
        aria-label="Open navigation menu"
        aria-controls="mobile-drawer"
        aria-expanded={isDrawerOpen}
        onClick={handleDrawerOpen}
        type="button"
      >
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
      </button>
      <div className={styles.right}>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={pathname.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link}
            aria-current={pathname.startsWith(href) ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </div>
      {isDrawerOpen && (
        <>
          <div
            className={styles.overlay}
            tabIndex={-1}
            aria-hidden="true"
            onClick={handleDrawerClose}
          />
          <aside
            id="mobile-drawer"
            className={styles.drawer}
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <button
              className={styles.closeButton}
              aria-label="Close navigation menu"
              onClick={handleDrawerClose}
              type="button"
            >
              ×
            </button>
            <nav className={styles.drawerNav} aria-label="Mobile navigation">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={
                    pathname.startsWith(href)
                      ? `${styles.drawerLink} ${styles.active}`
                      : styles.drawerLink
                  }
                  aria-current={pathname.startsWith(href) ? 'page' : undefined}
                  onClick={handleDrawerClose}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}
    </nav>
  );
}
