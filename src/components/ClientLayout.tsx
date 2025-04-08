"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#FFD800] z-50 shadow-md border-b-4 border-red-600">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="PINZORO" width={40} height={40} className="mr-2" />
            <span className="text-2xl font-bold text-red-600">PINZORO</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link href="/" className="hover:text-red-600 transition-colors font-bold">トップ</Link></li>
              <li><Link href="/#message" className="hover:text-red-600 transition-colors font-bold">メッセージ</Link></li>
              <li><Link href="/#business" className="hover:text-red-600 transition-colors font-bold">会社概要</Link></li>
              <li><Link href="/#youtube" className="hover:text-red-600 transition-colors font-bold">PINZORO体験</Link></li>
              <li><Link href="/#shops" className="hover:text-red-600 transition-colors font-bold">店舗情報</Link></li>
              <li><Link href="/#recruit" className="hover:text-red-600 transition-colors font-bold">採用情報</Link></li>
            </ul>
          </nav>
          <button onClick={toggleMenu} className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="fixed top-20 right-0 w-64 bg-[#FECF02] z-40 shadow-md border-l-4 border-red-600 md:hidden">
          <nav className="px-4 py-4">
            <ul className="flex flex-col space-y-4">
              <li><Link href="/" className="block text-lg font-bold hover:text-red-600 transition-colors">トップ</Link></li>
              <li><Link href="/#message" className="block text-lg font-bold hover:text-red-600 transition-colors">メッセージ</Link></li>
              <li><Link href="/#business" className="block text-lg font-bold hover:text-red-600 transition-colors">会社概要</Link></li>
              <li><Link href="/#youtube" className="block text-lg font-bold hover:text-red-600 transition-colors">PINZORO体験</Link></li>
              <li><Link href="/#shops" className="block text-lg font-bold hover:text-red-600 transition-colors">店舗情報</Link></li>
              <li><Link href="/#recruit" className="block text-lg font-bold hover:text-red-600 transition-colors">採用情報</Link></li>
            </ul>
          </nav>
        </div>
      )}
      
      <main className="pt-20">
        {children}
      </main>
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} PINZORO All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
