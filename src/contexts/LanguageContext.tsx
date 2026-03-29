import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'hi' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (hi: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'hi',
  toggleLang: () => {},
  t: (hi) => hi,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('hi');

  const toggleLang = () => setLang(prev => (prev === 'hi' ? 'en' : 'hi'));
  const t = (hi: string, en: string) => (lang === 'hi' ? hi : en);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
