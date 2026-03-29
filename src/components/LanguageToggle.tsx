import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors text-xs font-semibold tracking-wide"
      style={{ fontFamily: "'Nunito', sans-serif" }}
      aria-label="Toggle language"
    >
      <motion.span
        key={lang}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="text-primary"
      >
        {lang === 'hi' ? 'EN' : 'हिं'}
      </motion.span>
      <span className="text-muted-foreground">|</span>
      <span className="text-foreground">
        {lang === 'hi' ? 'अंग्रेज़ी' : 'Hindi'}
      </span>
    </button>
  );
};

export default LanguageToggle;
