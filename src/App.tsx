
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import MobileLayout from "@/components/layout/MobileLayout";
import Home from "./pages/Home";
import AIChat from "./pages/AIChat";
import Content from "./pages/Content";
import Therapist from "./pages/Therapist";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MobileLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/content" element={<Content />} />
              <Route path="/therapist" element={<Therapist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MobileLayout>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
