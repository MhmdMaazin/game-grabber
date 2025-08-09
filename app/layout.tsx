import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Game Grabber - Free Game Giveaway Tracker',
  description: 'Discover and claim free game giveaways from Steam, Epic Games, GOG and more with Game Grabber.',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Game Grabber - Free Game Giveaway Tracker',
    description: 'Discover and claim free game giveaways from Steam, Epic Games, GOG and more with Game Grabber.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="scanlines min-h-screen bg-dark-bg text-white font-pixel">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}


