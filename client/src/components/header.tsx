import { Link } from "wouter";
import pixelPassLogo from "@assets/pixel_pass_logo_1754551439357.png";

export default function Header() {
  return (
    <header className="border-b-2 border-gray-600 bg-dark-secondary relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link href="/" className="flex items-center gap-4 no-underline">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src={pixelPassLogo} 
                alt="Pixel Pass Logo" 
                className="w-full h-full object-contain pixel-border"
              />
            </div>
            <div>
              <h1 className="text-white text-xl md:text-2xl" data-testid="site-title">
                PIXEL PASS
              </h1>
              <p className="text-gray-400 text-xs">FREE GAME TRACKER</p>
            </div>
          </Link>
          
          <nav className="flex flex-wrap gap-2 text-xs">
            <Link href="/">
              <button 
                className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 transition-all retro-button border border-gray-600"
                data-testid="nav-home"
              >
                HOME
              </button>
            </Link>
            <button 
              className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all retro-button"
              data-testid="nav-trending"
            >
              TRENDING
            </button>
            <button 
              className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all retro-button"
              data-testid="nav-about"
            >
              ABOUT
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
