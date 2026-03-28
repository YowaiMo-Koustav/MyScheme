import React, { createContext, useContext, useState } from 'react';
import { UserProfile, UserRole, MatchedScheme } from '@/types/scheme';

interface MatcherContextType {
  profile: Partial<UserProfile>;
  updateProfile: (field: string, value: any) => void;
  results: MatchedScheme[];
  setResults: (results: MatchedScheme[]) => void;
  savedSchemes: string[];
  toggleSaved: (schemeId: string) => void;
  resetMatcher: () => void;
}

const MatcherContext = createContext<MatcherContextType | undefined>(undefined);

export function MatcherProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [results, setResults] = useState<MatchedScheme[]>([]);
  const [savedSchemes, setSavedSchemes] = useState<string[]>([]);

  const updateProfile = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleSaved = (schemeId: string) => {
    setSavedSchemes(prev =>
      prev.includes(schemeId) ? prev.filter(id => id !== schemeId) : [...prev, schemeId]
    );
  };

  const resetMatcher = () => {
    setProfile({});
    setResults([]);
  };

  return (
    <MatcherContext.Provider value={{ profile, updateProfile, results, setResults, savedSchemes, toggleSaved, resetMatcher }}>
      {children}
    </MatcherContext.Provider>
  );
}

export function useMatcher() {
  const context = useContext(MatcherContext);
  if (!context) throw new Error('useMatcher must be used within MatcherProvider');
  return context;
}
