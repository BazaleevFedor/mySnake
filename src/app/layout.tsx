import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'mySnake',
  description: 'Built by Bazaleev Fedor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href='../../public/static/square_black.webp' as="image" />
        <link rel="preload" href='../../public/static/square_blue.webp' as="image" />
        <link rel="preload" href='../../public/static/block_pause.svg' as="image" />
        <link rel="preload" href='../../public/static/block_lose.svg' as="image" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
