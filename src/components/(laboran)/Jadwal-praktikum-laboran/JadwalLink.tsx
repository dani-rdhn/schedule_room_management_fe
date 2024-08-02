"use client"
import Link from "next/link";
import { useState, useEffect, useRef } from 'react'; // Import useState
import { BrainCog } from 'lucide-react';

export function NavigationMenuJadwal() {
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol dropdown
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref untuk elemen dropdown

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>Menu Praktikum</span>
        <svg
          className={`w-5 h-5 ml-2 -mr-1 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} // Animasi rotasi ikon
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 w-56 mt-2 origin-top-left bg-white rounded-md shadow-lg transition-all duration-200 ease-out">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* <Link href="/jadwal-praktikum-laboran" legacyBehavior>
              <a className="flex items-center gap-2 px-4 py-3 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" role="menuitem">
                <svg
                  className="h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Jadwal Praktikum
              </a>
            </Link> */}
            <Link href="/pemetaan-ruangan" legacyBehavior>
              <a className="flex items-center gap-2 px-4 py-3 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" role="menuitem">
                {/* Tambahkan ikon di sini (misalnya, dari Heroicons) */}
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
               </svg>
                Pemetaan Ruangan
              </a>
            </Link>
            {/* Tambahkan item menu lainnya di sini dengan format yang sama */}
          </div>
        </div>
      )}
    </div>
  );
}
