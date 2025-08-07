export default function Footer() {
  return (
    <footer className="bg-dark-secondary border-t-4 border-neon-green mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-neon-green text-sm mb-4">GAMEFREEBIE TRACKER</h3>
            <p className="text-gray-400 text-xs">
              Your ultimate destination for free game giveaways and digital treasures.
            </p>
          </div>
          
          <div>
            <h4 className="text-neon-cyan text-sm mb-4">PLATFORMS</h4>
            <div className="space-y-2 text-xs">
              <div className="text-gray-400">Steam • Epic Games • GOG</div>
              <div className="text-gray-400">Ubisoft • Origin • Itch.io</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-neon-pink text-sm mb-4">POWERED BY</h4>
            <a 
              href="https://www.gamerpower.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-yellow hover:text-neon-green transition-colors text-xs"
              data-testid="link-attribution"
            >
              GamerPower.com API
            </a>
          </div>
        </div>
        
        <div className="border-t border-neon-green mt-8 pt-6 text-center">
          <p className="text-gray-500 text-xs">© 2024 GameFreebie Tracker - Made with 💚 for gamers</p>
        </div>
      </div>
    </footer>
  );
}
