import React, { useState } from 'react';
import { Menu, X, Search, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFanData } from '../../hooks/useFanData';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { fanData } = useFanData();
  const navigate = useNavigate();
  const categories = [...new Set(fanData.map(fan => fan.category))];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-white">
          Magnific
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/try-your-own"
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
          >
            <Upload size={16} />
            Try Your Own
          </Link>

          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fans..."
              className="w-48 rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:bg-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <Search size={16} />
            </button>
          </form>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Rest of the header component remains the same */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 right-0 h-full w-80 transform bg-gray-900 shadow-xl transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
          <span className="text-lg font-semibold text-white">Categories</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          <div className="px-6 py-4">
            <Link
              to="/"
              className="block py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Fans
            </Link>
            <div className="mt-4 space-y-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${encodeURIComponent(category)}`}
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}