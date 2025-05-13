"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-black z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="PINZORO" width={160} height={50} className="object-contain" />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8 text-white">
              <li><Link href="/" className="hover:text-red-600 transition-colors font-bold">トップ</Link></li>
              <li><Link href="/#message" className="hover:text-red-600 transition-colors font-bold">メッセージ</Link></li>
              <li><Link href="/#business" className="hover:text-red-600 transition-colors font-bold">会社概要</Link></li>
              <li><Link href="/#youtube" className="hover:text-red-600 transition-colors font-bold">PINZORO体験</Link></li>
              <li><Link href="/#shops" className="hover:text-red-600 transition-colors font-bold">店舗情報</Link></li>
              <li><Link href="/#recruit" className="hover:text-red-600 transition-colors font-bold">採用情報</Link></li>
              <li><Link href="/#sponsor" className="hover:text-red-600 transition-colors font-bold">スポンサー</Link></li>
            </ul>
          </nav>
          <button onClick={toggleMenu} className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="fixed top-[60px] right-0 w-64 bg-black z-40 shadow-md md:hidden">
          <nav className="px-4 py-4">
            <ul className="flex flex-col space-y-4 text-white">
              <li><Link href="/" className="block text-lg font-bold hover:text-red-600 transition-colors" onClick={closeMenu}>トップ</Link></li>
              <li><Link href="/#message" className="block text-lg font-bold hover:text-red-600 transition-colors" onClick={closeMenu}>メッセージ</Link></li>
              <li><Link href="/#business" className="block text-lg font-bold hover:text-red-600 transition-colors" onClick={closeMenu}>会社概要</Link></li>
              <li><Link href="/#youtube" className="block text-lg font-bold hover:text-red-600 transition-colors" onClick={closeMenu}>PINZORO体験</Link></li>
              <li><Link href="/#shops" className="block text-lg font-bold hover:text-red-600 transition-colors" onClick={closeMenu}>店舗情報</Link></li>
              <li><Link href="/#recruit" className="block text-lg font-bold hover:text-red-600 transition-colors" onClick={closeMenu}>採用情報</Link></li>
              <li><Link href="/#sponsor" className="block text-lg font-bold hover:text-red-600 transition-colors" onClick={closeMenu}>スポンサー</Link></li>
            </ul>
          </nav>
        </div>
      )}
      
      <main className="pt-[60px]">
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
