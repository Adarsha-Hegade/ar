import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} 
          <a
            href="https://magnific.in"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-400 hover:underline"
          >
            Magnific
          </a>
        </p>
        <p className="text-sm text-center md:text-right">
          Developed by
          <a
            href="https://inktypedesign.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-400 hover:underline"
          >
            Inktype Design Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
