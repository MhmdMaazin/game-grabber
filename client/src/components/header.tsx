"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import pixelPassLogo from "@assets/pixel_pass_logo_1754551439357.png";
import Image from "next/image";
import { Button } from "@/components/ui/8bit/button";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-dark-secondary relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 no-underline" onClick={closeMobileMenu}>
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <Image
                src={pixelPassLogo}
                alt="Game Grabber Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain pixel-border"
                priority
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
          <nav className="hidden md:flex gap-4 text-xs">
            <Link href="/" className="no-underline">
              <Button
                font="retro"
                size="sm"
                className={`text-xs ${
                  isActive('/')
                    ? 'bg-gray-600 text-white'
                    : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                data-testid="nav-home"
              >
                HOME
              </Button>
            </Link>
            <Link href="/trending" className="no-underline">
              <Button
                font="retro"
                size="sm"
                className={`text-xs ${
                  isActive('/trending')
                    ? 'bg-gray-600 text-white'
                    : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                data-testid="nav-trending"
              >
                TRENDING
              </Button>
            </Link>
            <Link href="/about" className="no-underline">
              <Button
                font="retro"
                size="sm"
                className={`text-xs ${
                  isActive('/about')
                    ? 'bg-gray-600 text-white'
                    : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                data-testid="nav-about"
              >
                ABOUT
              </Button>
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
            <div className="md:hidden mt-4 pt-4">
            <nav className="flex flex-col gap-2 text-xs">
              <Link href="/" className="no-underline">
                <Button
                  font="retro"
                  className={`w-full text-left text-xs ${
                    isActive('/')
                      ? 'bg-gray-600 text-white'
                      : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  data-testid="nav-home-mobile"
                  onClick={closeMobileMenu}
                >
                  HOME
                </Button>
              </Link>
              <Link href="/trending" className="no-underline">
                <Button
                  font="retro"
                  className={`w-full text-left text-xs ${
                    isActive('/trending')
                      ? 'bg-gray-600 text-white'
                      : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  data-testid="nav-trending-mobile"
                  onClick={closeMobileMenu}
                >
                  TRENDING
                </Button>
              </Link>
              <Link href="/about" className="no-underline">
                <Button
                  font="retro"
                  className={`w-full text-left text-xs ${
                    isActive('/about')
                      ? 'bg-gray-600 text-white'
                      : 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  data-testid="nav-about-mobile"
                  onClick={closeMobileMenu}
                >
                  ABOUT
                </Button>
              </Link>
            </nav>
          </div>
        )}
        
      </div>
    </header>
  );
}
