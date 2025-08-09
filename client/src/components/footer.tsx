export default function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
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
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-xs">© 2024 Game Grabber - Made for gamers</p>
        </div>
      </div>
    </footer>
  );
}
