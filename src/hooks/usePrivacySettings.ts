
import { useState, useEffect } from 'react';

interface PrivacySettings {
  analytics: boolean;
  personalization: boolean;
  dataProcessing: boolean;
  required: boolean;
  marketingEmails: boolean;
  dataSharingWithPartners: boolean;
  lastUpdated: Date;
}

export const usePrivacySettings = () => {
  const [settings, setSettings] = useState<PrivacySettings>({
    analytics: false,
    personalization: false,
    dataProcessing: false,
    required: true,
    marketingEmails: false,
    dataSharingWithPartners: false,
    lastUpdated: new Date()
  });

  const [isLoading, setIsLoading] = useState(true);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Load privacy settings from localStorage or backend
    const loadSettings = () => {
      const stored = localStorage.getItem('jai-dee-privacy-settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({
          ...parsed,
          lastUpdated: new Date(parsed.lastUpdated)
        });
        setHasConsented(true);
      }
      setIsLoading(false);
    };

    loadSettings();
  }, []);

  const updateSettings = (newSettings: Partial<PrivacySettings>) => {
    const updated = {
      ...settings,
      ...newSettings,
      lastUpdated: new Date()
    };
    
    setSettings(updated);
    localStorage.setItem('jai-dee-privacy-settings', JSON.stringify(updated));
    
    if (!hasConsented && newSettings.required) {
      setHasConsented(true);
    }
  };

  const giveConsent = (consents: Partial<PrivacySettings>) => {
    updateSettings({ ...consents, required: true });
    console.log('Privacy consent given:', consents);
  };

  const revokeConsent = () => {
    updateSettings({
      analytics: false,
      personalization: false,
      dataProcessing: false,
      marketingEmails: false,
      dataSharingWithPartners: false,
      required: true // Keep required consent
    });
    console.log('Privacy consent revoked');
  };

  const exportData = () => {
    // Simulate data export
    const userData = {
      settings,
      exportDate: new Date(),
      format: 'JSON'
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jai-dee-data-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteData = () => {
    // In a real app, this would call an API to delete user data
    localStorage.removeItem('jai-dee-privacy-settings');
    setSettings({
      analytics: false,
      personalization: false,
      dataProcessing: false,
      required: false,
      marketingEmails: false,
      dataSharingWithPartners: false,
      lastUpdated: new Date()
    });
    setHasConsented(false);
    console.log('User data deletion requested');
  };

  return {
    settings,
    isLoading,
    hasConsented,
    updateSettings,
    giveConsent,
    revokeConsent,
    exportData,
    deleteData
  };
};
