import { Link } from "wouter";

export default function Header() {
  return (
    <header className="border-b-4 border-neon-green bg-dark-secondary relative">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link href="/" className="flex items-center gap-4 no-underline">
            <div className="w-12 h-12 bg-neon-green flex items-center justify-center text-dark-bg text-lg animate-pixel-pulse">
              🎮
            </div>
            <div>
              <h1 className="text-neon-green text-xl md:text-2xl animate-glitch" data-testid="site-title">
                GAMEFREEBIE
              </h1>
              <p className="text-neon-cyan text-xs">TRACKER v2.0</p>
            </div>
          </Link>
          
          <nav className="flex flex-wrap gap-2 text-xs">
            <Link href="/">
              <button 
                className="px-4 py-2 bg-neon-pink text-dark-bg hover:neon-glow transition-all retro-button"
                data-testid="nav-home"
              >
                HOME
              </button>
            </Link>
            <button 
              className="px-4 py-2 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-bg transition-all retro-button"
              data-testid="nav-trending"
            >
              TRENDING
            </button>
            <button 
              className="px-4 py-2 border-2 border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-dark-bg transition-all retro-button"
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
