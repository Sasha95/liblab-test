'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import logo from '@/assets/logo.webp';
import { useState, useCallback, useRef } from 'react';
import { Button, CloseButton, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const navLinks = [
  { href: '/movies', label: 'Movies' },
  { href: '/characters', label: 'Characters' },
  { href: '/quotes', label: 'Quotes' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure(false);

  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <Link href="/movies">
        <Image src={logo} alt="Logo" className={styles.logo} priority />
      </Link>
      <button
        className={styles.hamburger}
        aria-label="Open navigation menu"
        aria-controls="mobile-drawer"
        aria-expanded={opened}
        onClick={open}
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
      <Drawer
        classNames={{
          header: styles.header,
        }}
        opened={opened}
        onClose={close}
        closeButtonProps={{ className: styles.closeButton }}
      >
        <aside
          id="mobile-drawer"
          className={styles.drawer}
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
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
                onClick={close}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
      </Drawer>
    </nav>
  );
};
