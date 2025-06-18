
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
import PrivacyConsent from "@/components/privacy/PrivacyConsent";
import FeedbackWidget from "@/components/feedback/FeedbackWidget";
import { usePrivacySettings } from "@/hooks/usePrivacySettings";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { hasConsented, giveConsent } = usePrivacySettings();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Show privacy consent if user hasn't consented yet
    const timer = setTimeout(() => {
      if (!hasConsented) {
        setShowConsent(true);
      }
    }, 1000); // Delay to let the app load first

    return () => clearTimeout(timer);
  }, [hasConsented]);

  const handleConsentGiven = (consents: any) => {
    giveConsent(consents);
    setShowConsent(false);
  };

  const handleConsentDeclined = () => {
    setShowConsent(false);
    // In a real app, you might redirect to a different page or show limited functionality
  };

  const handleFeedbackSubmit = (feedback: any) => {
    console.log('Feedback submitted:', feedback);
    // In a real app, send this to your analytics or feedback service
  };

  return (
    <>
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

      {/* Privacy Consent Modal */}
      {showConsent && (
        <PrivacyConsent
          onConsentGiven={handleConsentGiven}
          onDecline={handleConsentDeclined}
        />
      )}

      {/* Feedback Widget */}
      {hasConsented && (
        <FeedbackWidget onSubmit={handleFeedbackSubmit} />
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
