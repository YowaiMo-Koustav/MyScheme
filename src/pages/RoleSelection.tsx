import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMatcher } from '@/contexts/MatcherContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types/scheme';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, Tractor, Heart, Briefcase, Rocket, Users, UserCheck, Accessibility, CheckCircle2 } from 'lucide-react';

const roleCards: { role: UserRole; labelHi: string; labelEn: string; descHi: string; descEn: string; Icon: any; gradient: string }[] = [
  { role: 'student', labelHi: 'छात्र', labelEn: 'Student', descHi: 'छात्रवृत्ति, शिक्षा ऋण', descEn: 'Scholarships, education loans, skill programs', Icon: GraduationCap, gradient: 'from-blue-500 to-blue-700' },
  { role: 'farmer', labelHi: 'किसान', labelEn: 'Farmer', descHi: 'फसल बीमा, ऋण, आय सहायता', descEn: 'Crop insurance, credit, income support', Icon: Tractor, gradient: 'from-green-500 to-green-700' },
  { role: 'woman', labelHi: 'महिला', labelEn: 'Woman', descHi: 'बचत योजनाएं, मातृत्व सहायता', descEn: 'Savings schemes, maternity aid, empowerment', Icon: Heart, gradient: 'from-pink-500 to-pink-700' },
  { role: 'worker', labelHi: 'कामगार', labelEn: 'Worker', descHi: 'पेंशन, बीमा, कौशल प्रशिक्षण', descEn: 'Pensions, insurance, skill training', Icon: Briefcase, gradient: 'from-amber-500 to-amber-700' },
  { role: 'entrepreneur', labelHi: 'उद्यमी', labelEn: 'Entrepreneur', descHi: 'स्टार्टअप फंडिंग, MUDRA ऋण', descEn: 'Startup funding, MUDRA loans, MSME support', Icon: Rocket, gradient: 'from-purple-500 to-purple-700' },
  { role: 'individual', labelHi: 'नागरिक', labelEn: 'Individual', descHi: 'बैंकिंग, बीमा, आवास', descEn: 'Banking, insurance, housing, welfare', Icon: Users, gradient: 'from-teal-500 to-teal-700' },
  { role: 'senior_citizen', labelHi: 'वरिष्ठ नागरिक', labelEn: 'Senior Citizen', descHi: 'पेंशन, बचत, स्वास्थ्य सेवा', descEn: 'Pensions, savings, healthcare', Icon: UserCheck, gradient: 'from-orange-500 to-orange-700' },
  { role: 'disabled', labelHi: 'दिव्यांगजन', labelEn: 'Differently Abled', descHi: 'सहायक उपकरण, पेंशन', descEn: 'Assistive devices, pensions, support', Icon: Accessibility, gradient: 'from-indigo-500 to-indigo-700' },
];

const RoleSelection = () => {
  const [selected, setSelected] = useState<UserRole[]>([]);
  const { updateProfile } = useMatcher();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const toggle = (role: UserRole) => {
    setSelected(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };

  const proceed = () => {
    if (selected.length === 0) return;
    updateProfile('selected_roles', selected);
    navigate('/matcher');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t('मैं एक...', 'I am a...')}
          </h1>
          <p className="text-muted-foreground text-lg font-body">
            {t('सभी लागू विकल्प चुनें', 'Select all that apply. This helps us find the most relevant schemes for you.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {roleCards.map((card, i) => {
            const isSelected = selected.includes(card.role);
            return (
              <motion.button key={card.role} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                onClick={() => toggle(card.role)}
                className={`relative p-6 rounded-2xl border-2 text-left transition-all group ${
                  isSelected ? 'border-primary bg-primary/5 shadow-lg' : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
                }`}
              >
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </motion.div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4`}>
                  <card.Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-1">{t(card.labelHi, card.labelEn)}</h3>
                <p className="text-muted-foreground text-sm font-body">{t(card.descHi, card.descEn)}</p>
              </motion.button>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center">
          <Button size="lg" onClick={proceed} disabled={selected.length === 0}
            className="bg-primary text-primary-foreground font-bold text-lg px-10 py-6 rounded-xl hover:scale-105 transition-transform"
          >
            {t('प्रश्नों पर आगे बढ़ें', 'Continue to Questions')} <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-muted-foreground text-sm mt-3 font-body">
            {selected.length > 0 ? `${selected.length} ${t('भूमिका चुनी', 'role(s) selected')}` : t('कम से कम एक भूमिका चुनें', 'Select at least one role')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
