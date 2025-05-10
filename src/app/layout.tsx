import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/shared/ui/navbar/Navbar';
import styles from './layout.module.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'The Lord of the Rings',
  description: 'liblab test app for frontend interview',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.container}>
          <MantineProvider>
            <Navbar />
            <div className={styles.content}>{children}</div>
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}
