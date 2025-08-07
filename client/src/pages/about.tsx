import Header from "../components/header";
import Footer from "../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Gamepad2, Shield, Zap, Globe, Heart } from "lucide-react";
import pixelPassLogo from "@assets/pixel_pass_logo_1754551439357.png";

export default function About() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 flex items-center justify-center">
              <img 
                src={pixelPassLogo} 
                alt="Pixel Pass Logo" 
                className="w-full h-full object-contain pixel-border"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl text-white mb-4 flex items-center justify-center gap-3">
            <Info className="w-8 h-8" />
            ABOUT PIXEL PASS
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            Your ultimate destination for discovering free games, DLC, and exclusive content from across the gaming universe
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="bg-dark-secondary border-gray-600 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              OUR MISSION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">
              At Pixel Pass, we believe gaming should be accessible to everyone. Our mission is to help gamers discover 
              amazing free content, from full games to exclusive DLC and beta access. We aggregate giveaways from 
              trusted platforms like Steam, Epic Games Store, GOG, and more, bringing you the best deals in one place.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-dark-secondary border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                REAL-TIME UPDATES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">
                Get instant notifications about new giveaways as they go live. Never miss a free game again with our 
                real-time tracking system.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-secondary border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                MULTI-PLATFORM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">
                We track giveaways from all major gaming platforms including Steam, Epic Games, GOG, Ubisoft, 
                and many indie platforms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dark-secondary border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                TRUSTED SOURCES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">
                All giveaways are verified and sourced from official channels. We ensure you're always directed to 
                legitimate offers from trusted publishers.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <Card className="bg-dark-secondary border-gray-600 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-purple-500" />
              BY THE NUMBERS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">1000+</div>
                <div className="text-gray-400 text-xs">GAMES TRACKED</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500 mb-1">$50K+</div>
                <div className="text-gray-400 text-xs">VALUE SAVED</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500 mb-1">15+</div>
                <div className="text-gray-400 text-xs">PLATFORMS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500 mb-1">24/7</div>
                <div className="text-gray-400 text-xs">MONITORING</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="bg-dark-secondary border-gray-600 mb-8">
          <CardHeader>
            <CardTitle className="text-white">HOW IT WORKS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-600 text-white text-xs font-bold rounded flex items-center justify-center mt-1">
                  1
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">DISCOVER</h3>
                  <p className="text-gray-400 text-xs">
                    Browse our curated collection of free games and content, updated in real-time from trusted sources.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-600 text-white text-xs font-bold rounded flex items-center justify-center mt-1">
                  2
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">FILTER</h3>
                  <p className="text-gray-400 text-xs">
                    Use our advanced filters to find exactly what you're looking for - by platform, type, or value.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gray-600 text-white text-xs font-bold rounded flex items-center justify-center mt-1">
                  3
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">CLAIM</h3>
                  <p className="text-gray-400 text-xs">
                    Click through to the official giveaway page and claim your free games directly from the publisher.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact/Support */}
        <Card className="bg-dark-secondary border-gray-600">
          <CardHeader>
            <CardTitle className="text-white">GET IN TOUCH</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Have questions, suggestions, or found a great giveaway we missed? We'd love to hear from you!
            </p>
            <div className="text-gray-300 text-xs space-y-2">
              <p>• Follow us for the latest updates and announcements</p>
              <p>• Report issues or suggest improvements</p>
              <p>• Share your favorite finds with the community</p>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}