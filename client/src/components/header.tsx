import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import pixelPassLogo from "@assets/pixel_pass_logo_1754551439357.png";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b-2 border-gray-600 bg-dark-secondary relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 no-underline" onClick={closeMobileMenu}>
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img 
                src={pixelPassLogo} 
                alt="Pixel Pass Logo" 
                className="w-full h-full object-contain pixel-border"
              />
            </div>
            <div>
              <h1 className="text-white text-lg md:text-xl lg:text-2xl" data-testid="site-title">
                GAME GRABBER
              </h1>
              <p className="text-gray-400 text-xs hidden sm:block">FREE GAME TRACKER</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2 text-xs">
            <Link href="/">
              <button 
                className={`px-4 py-2 transition-all retro-button border border-gray-600 ${
                  isActive('/') 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                data-testid="nav-home"
              >
                HOME
              </button>
            </Link>
            <Link href="/trending">
              <button 
                className={`px-4 py-2 transition-all retro-button border border-gray-600 ${
                  isActive('/trending') 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                data-testid="nav-trending"
              >
                TRENDING
              </button>
            </Link>
            <Link href="/about">
              <button 
                className={`px-4 py-2 transition-all retro-button border border-gray-600 ${
                  isActive('/about') 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                data-testid="nav-about"
              >
                ABOUT
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            onClick={toggleMobileMenu}
            data-testid="mobile-menu-button"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-600">
            <nav className="flex flex-col gap-2 text-xs">
              <Link href="/">
                <button 
                  className={`w-full px-4 py-3 text-left transition-all retro-button border border-gray-600 ${
                    isActive('/') 
                      ? 'bg-gray-600 text-white' 
                      : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  data-testid="nav-home-mobile"
                  onClick={closeMobileMenu}
                >
                  HOME
                </button>
              </Link>
              <Link href="/trending">
                <button 
                  className={`w-full px-4 py-3 text-left transition-all retro-button border border-gray-600 ${
                    isActive('/trending') 
                      ? 'bg-gray-600 text-white' 
                      : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  data-testid="nav-trending-mobile"
                  onClick={closeMobileMenu}
                >
                  TRENDING
                </button>
              </Link>
              <Link href="/about">
                <button 
                  className={`w-full px-4 py-3 text-left transition-all retro-button border border-gray-600 ${
                    isActive('/about') 
                      ? 'bg-gray-600 text-white' 
                      : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  data-testid="nav-about-mobile"
                  onClick={closeMobileMenu}
                >
                  ABOUT
                </button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
