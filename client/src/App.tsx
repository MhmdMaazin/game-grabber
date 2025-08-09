"use client";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import GiveawayDetails from "./pages/giveaway-details";
import Trending from "./pages/trending";
import About from "./pages/about";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="scanlines min-h-screen bg-dark-bg text-white font-pixel">
          <Toaster />
          {/* Routes are managed by Next.js App Router */}
          <Home />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
