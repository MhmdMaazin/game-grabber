export default function Footer() {
  return (
    <footer className="bg-dark-secondary mt-16">
      <div className="container mx-auto px-4 py-8 relative inline-block w-full">
        {/* Pixel frame */}
        <div className="pointer-events-none absolute -top-1.5 left-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring" />
        <div className="pointer-events-none absolute -top-1.5 right-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring" />
        <div className="pointer-events-none absolute -bottom-1.5 left-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring" />
        <div className="pointer-events-none absolute -bottom-1.5 right-1.5 h-1.5 w-1/2 bg-foreground dark:bg-ring" />
        <div className="pointer-events-none absolute top-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
        <div className="pointer-events-none absolute top-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
        <div className="pointer-events-none absolute bottom-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
        <div className="pointer-events-none absolute bottom-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
        <div className="pointer-events-none absolute top-1.5 -left-1.5 h-2/3 w-1.5 bg-foreground dark:bg-ring" />
        <div className="pointer-events-none absolute top-1.5 -right-1.5 h-2/3 w-1.5 bg-foreground dark:bg-ring" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-sm mb-4">GAME GRABBER</h3>
            <p className="text-gray-400 text-xs">
              Your ultimate destination for free game giveaways and digital treasures.
            </p>
          </div>
          
          <div>
            <h4 className="text-gray-300 text-sm mb-4">PLATFORMS</h4>
            <div className="space-y-2 text-xs">
              <div className="text-gray-400">Steam • Epic Games • GOG</div>
              <div className="text-gray-400">Ubisoft • Origin • Itch.io</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-300 text-sm mb-4">POWERED BY</h4>
            <a 
              href="https://www.gamerpower.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-xs"
              data-testid="link-attribution"
            >
              GamerPower.com API
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 text-center">
          <p className="text-gray-500 text-xs">© 2024 Game Grabber - Made for gamers</p>
        </div>
      </div>
    </footer>
  );
}
