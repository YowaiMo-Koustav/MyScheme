import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMatcher } from '@/contexts/MatcherContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { matcherQuestions } from '@/data/matcher-questions';
import { schemes } from '@/data/schemes';
import { matchSchemes } from '@/lib/matching-engine';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, SkipForward, Loader2, Shield } from 'lucide-react';

const Matcher = () => {
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const { profile, updateProfile, setResults } = useMatcher();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const questions = matcherQuestions;
  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (value: any) => {
    const field = currentQ.field;
    if (field === 'age' || field === 'income') {
      updateProfile(field, Number(value));
    } else if (field === 'disability_status') {
      updateProfile(field, value === 'true' || value === true);
    } else {
      updateProfile(field, value);
    }
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      runMatching();
    }
  };

  const handleSkip = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else runMatching();
  };

  const runMatching = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const matched = matchSchemes(profile, schemes);
      setResults(matched);
      navigate('/results');
    }, 2500);
  };

  if (analyzing) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-amber flex items-center justify-center"
          >
            <Shield className="w-10 h-10 text-amber-foreground" />
          </motion.div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
            {t('आपकी प्रोफ़ाइल का विश्लेषण हो रहा है...', 'Analyzing your profile...')}
          </h2>
          <p className="text-white/60 mb-8 font-body">{t('2,500+ योजनाओं में खोज रहे हैं', 'Scanning 2,500+ schemes to find your best matches')}</p>
          <div className="w-64 mx-auto">
            <motion.div className="h-2 rounded-full bg-amber" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.5, ease: 'easeInOut' }} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground font-body">
              {t(`प्रश्न ${step + 1} / ${questions.length}`, `Question ${step + 1} of ${questions.length}`)}
            </span>
            <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-8 text-center text-balance">
                {currentQ.question}
              </h2>

              {currentQ.type === 'select' && currentQ.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-2">
                  {currentQ.options.map((opt) => (
                    <motion.button key={opt.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(opt.value)}
                      className="p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-left font-medium text-foreground"
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              )}

              {currentQ.type === 'number' && (
                <div className="max-w-xs mx-auto">
                  <Input type="number" placeholder={t('अपनी आयु दर्ज करें', 'Enter your age')} className="text-center text-2xl py-6 rounded-xl" min={1} max={120}
                    onKeyDown={(e) => { if (e.key === 'Enter') { const val = (e.target as HTMLInputElement).value; if (val) handleAnswer(val); } }}
                  />
                  <Button className="w-full mt-4 bg-primary text-primary-foreground py-6 rounded-xl"
                    onClick={() => { const input = document.querySelector('input[type="number"]') as HTMLInputElement; if (input?.value) handleAnswer(input.value); }}
                  >
                    {t('आगे बढ़ें', 'Continue')} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {currentQ.type === 'boolean' && (
                <div className="flex gap-4 justify-center">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(true)}
                    className="px-12 py-6 rounded-xl border-2 border-border bg-card hover:border-primary/50 font-bold text-lg text-foreground transition-all"
                  >{t('हाँ', 'Yes')}</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(false)}
                    className="px-12 py-6 rounded-xl border-2 border-border bg-card hover:border-primary/50 font-bold text-lg text-foreground transition-all"
                  >{t('नहीं', 'No')}</motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-10">
            <Button variant="ghost" onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0} className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" /> {t('पीछे', 'Back')}
            </Button>
            {currentQ.sensitive && (
              <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                <SkipForward className="w-4 h-4 mr-1" /> {t('छोड़ें', 'Skip')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matcher;
