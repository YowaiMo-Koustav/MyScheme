import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal, useAnimatedCounter } from '@/hooks/use-scroll-reveal';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Zap, Shield, GraduationCap, Tractor, Heart, Briefcase, Rocket, Users, UserCheck, Accessibility, IndianRupee, Moon, Sun, Languages } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <TopStrip />
      <TricolorBar />
      <Navbar />
      <HeroSection onStart={() => navigate('/auth')} />
      <StatsSection />
      <ProblemSection />
      <HowItWorksSection />
      <RolesSection onStart={() => navigate('/auth')} />
      <CTASection onStart={() => navigate('/auth')} />
      <Footer />
    </div>
  );
};

function TopStrip() {
  const { t } = useLanguage();
  return (
    <div className="bg-navy text-navy-foreground/90 text-[11px] py-1.5 text-center tracking-wide font-body">
      {t(
        '🇮🇳 A Digital Initiative for Indian Citizens | भारतीय नागरिकों के लिए एक डिजिटल पहल',
        '🇮🇳 A Digital Initiative for Indian Citizens'
      )}
    </div>
  );
}

function TricolorBar() {
  return <div className="tricolor-bar sticky top-0 z-[60]" />;
}

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-1 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-center relative">
        {/* Left — Controls */}
        <div className="absolute left-4 flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs font-bold text-muted-foreground hover:text-foreground gap-1"
            onClick={toggleLang}
          >
            <Languages className="w-3.5 h-3.5" />
            {lang === 'hi' ? 'EN' : 'हि'}
          </Button>
        </div>

        {/* Center — Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber to-success flex items-center justify-center shadow-md">
            <IndianRupee className="w-5 h-5 text-navy" />
          </div>
          <div className="text-center">
            <span className="font-display font-bold text-lg text-foreground tracking-tight">SchemeSync India</span>
            <p className="text-[10px] text-muted-foreground leading-none -mt-0.5 font-body">
              सरकारी योजना खोजक • Government Scheme Finder
            </p>
          </div>
        </div>

        {/* Right — Login */}
        <div className="absolute right-4 flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate('/auth')}>
            Login / Register
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection({ onStart }: { onStart: () => void }) {
  const { t, lang } = useLanguage();
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-navy overflow-hidden">
      {/* Subtle tricolor glow */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `radial-gradient(ellipse at 20% 50%, hsl(var(--amber)) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, hsl(var(--success)) 0%, transparent 50%)`,
      }} />

      {/* Floating tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          t('🎓 छात्रवृत्ति', '🎓 Scholarships'),
          t('🌾 किसान योजना', '🌾 Farmer Schemes'),
          t('🏥 आयुष्मान भारत', '🏥 Ayushman Bharat'),
          t('🏠 आवास योजना', '🏠 Housing Scheme'),
          t('💼 रोजगार', '💼 Employment'),
        ].map((text, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg px-3 py-2 text-xs text-white/40 font-medium border border-white/10 bg-white/5 backdrop-blur-sm"
            style={{
              top: `${18 + i * 14}%`,
              left: i % 2 === 0 ? `${5 + i * 2}%` : undefined,
              right: i % 2 !== 0 ? `${5 + i * 2}%` : undefined,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-medium mb-5 backdrop-blur-sm border border-white/10">
            {t('🇮🇳 AI-संचालित • आधिकारिक सरकारी डेटा स्रोत', '🇮🇳 AI-Powered • Official Government Data Source')}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-3">
            {t('अपनी सरकारी योजना खोजें', 'Find Your Government Scheme')}
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/70 mb-5 font-body">
            {lang === 'hi' ? (
              <>Find Your Government Scheme in <span className="text-amber">60 Seconds</span></>
            ) : (
              <>Discover Benefits You Deserve in <span className="text-amber">60 Seconds</span></>
            )}
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto mb-8 font-body">
            {t(
              'सैकड़ों पोर्टल खोजना बंद करें। कुछ सवालों के जवाब दें और हमारा AI आपको सही योजनाओं से जोड़ेगा।',
              'Stop searching hundreds of portals. Answer a few questions and our AI will connect you to the right schemes.'
            )}
          </p>
          <Button
            size="lg"
            onClick={onStart}
            className="bg-amber text-amber-foreground font-bold text-base px-8 py-5 rounded-lg animate-pulse-glow hover:scale-105 transition-transform"
          >
            {t('योजना खोजें — Find My Scheme', 'Find My Scheme')} <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function StatsSection() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const { t } = useLanguage();
  const schemes = useAnimatedCounter(2500, 2000, isVisible);
  const benefits = useAnimatedCounter(15, 2000, isVisible);
  const states = useAnimatedCounter(28, 1500, isVisible);

  const stats = [
    { value: `${schemes.toLocaleString()}+`, label: t('योजनाएं अनुक्रमित', 'Schemes Indexed'), icon: Search },
    { value: `₹${benefits}L Cr+`, label: t('लाभ राशि', 'In Benefits'), icon: Zap },
    { value: `${states}`, label: t('राज्य कवर', 'States Covered'), icon: Shield },
  ];

  return (
    <section ref={ref} className="py-14 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center p-5 rounded-lg bg-card border border-border shadow-sm border-t-2 border-t-amber"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs font-medium font-body">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-amber font-bold text-xs uppercase tracking-widest">
            {t('चुनौती • The Challenge', 'The Challenge')}
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mt-3 mb-5">
            {t(
              'करोड़ों भारतीय अपनी पात्र योजनाओं से वंचित रहते हैं',
              'Millions of Indians miss schemes they are eligible for'
            )}
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl mx-auto font-body">
            {t(
              '2,500+ केंद्र और राज्य योजनाओं के साथ दर्जनों पोर्टल पर सही योजना ढूंढना लगभग असंभव है।',
              'With 2,500+ central and state schemes spread across dozens of portals, finding the right one is nearly impossible.'
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: '60%', text: t('पात्र नागरिक कभी आवेदन नहीं करते', 'Eligible citizens never apply'), subtext: t('of eligible citizens never apply', '') },
              { num: '2,500+', text: t('केंद्र और राज्य सरकार की योजनाएं', 'Central & state government schemes'), subtext: t('central & state government schemes', '') },
              { num: '45+', text: t('सरकारी पोर्टल पर नेविगेट करना', 'Government portals to navigate'), subtext: t('government portals to navigate', '') },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="p-5 rounded-lg bg-card border border-border shadow-sm"
              >
                <div className="text-2xl font-bold text-primary mb-1 font-display">{item.num}</div>
                <p className="text-foreground text-sm font-medium font-body">{item.text}</p>
                {item.subtext && <p className="text-muted-foreground text-xs mt-0.5">{item.subtext}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const { t } = useLanguage();
  const steps = [
    { icon: '📝', title: t('सवालों के जवाब दें', 'Answer Questions'), desc: t('अपनी उम्र, आय, व्यवसाय, राज्य जैसे बुनियादी विवरण साझा करें।', 'Share basic details like age, income, occupation, state. Takes less than 60 seconds.') },
    { icon: '🤖', title: t('AI विश्लेषण', 'AI Analysis'), desc: t('हमारा इंजन 2,500+ योजनाओं को स्कैन करता है और आपकी पात्रता के अनुसार रैंक करता है।', 'Our engine scans 2,500+ schemes and ranks them based on your eligibility.') },
    { icon: '✅', title: t('आवेदन करें', 'Apply with Confidence'), desc: t('दस्तावेजों की सूची, समय-सीमा और सीधे आवेदन लिंक प्राप्त करें।', 'Get document lists, deadlines, and direct application links.') },
  ];

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="text-center mb-10"
        >
          <span className="text-amber font-bold text-xs uppercase tracking-widest">
            {t('कैसे काम करता है', 'How It Works')}
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mt-3">
            {t('तीन आसान चरण', 'Three Simple Steps')}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center p-6 rounded-lg bg-card border border-border shadow-sm group border-t-2 border-t-success"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {i + 1}
              </div>
              <div className="text-3xl mb-3 mt-2">{step.icon}</div>
              <h3 className="text-base font-display font-bold text-foreground mb-1.5">{step.title}</h3>
              <p className="text-muted-foreground text-sm font-body">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RolesSection({ onStart }: { onStart: () => void }) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const { t } = useLanguage();
  const roles = [
    { icon: GraduationCap, label: t('छात्र', 'Student') },
    { icon: Tractor, label: t('किसान', 'Farmer') },
    { icon: Heart, label: t('महिला', 'Woman') },
    { icon: Briefcase, label: t('कामगार', 'Worker') },
    { icon: Rocket, label: t('उद्यमी', 'Entrepreneur') },
    { icon: Users, label: t('नागरिक', 'Individual') },
    { icon: UserCheck, label: t('वरिष्ठ नागरिक', 'Senior Citizen') },
    { icon: Accessibility, label: t('दिव्यांगजन', 'Differently Abled') },
  ];

  return (
    <section ref={ref} className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} className="text-center mb-10">
          <span className="text-amber font-bold text-xs uppercase tracking-widest">
            {t('किसके लिए', 'Who It\'s For')}
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mt-3">
            {t('हर भारतीय नागरिक के लिए योजनाएं', 'Schemes for Every Indian Citizen')}
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roles.map((role, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              onClick={onStart}
              className="p-5 rounded-lg bg-card border border-border shadow-sm group cursor-pointer hover:border-primary/40 border-l-2 border-l-amber"
            >
              <role.icon className="w-7 h-7 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-display font-bold text-foreground text-sm block">{role.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();
  return (
    <section className="py-16 bg-navy relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber via-white to-success" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-3">
            {t('आपके हक़ की योजनाओं से न चूकें', "Don't Miss the Benefits You Deserve")}
          </h2>
          <p className="text-white/60 text-sm mb-8 max-w-lg mx-auto font-body">
            {t(
              'हजारों भारतीयों के साथ जुड़ें जिन्होंने अपनी सही योजनाएं खोज ली हैं। यह मुफ्त, तेज़ और सुरक्षित है।',
              'Join thousands of Indians who have already found their eligible schemes. It\'s free, fast, and secure.'
            )}
          </p>
          <Button
            size="lg"
            onClick={onStart}
            className="bg-amber text-amber-foreground font-bold text-base px-8 py-5 rounded-lg animate-pulse-glow hover:scale-105 transition-transform"
          >
            {t('अभी शुरू करें — Start Now', 'Start Now')} <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-white to-amber" />
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-8 bg-navy text-white/80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-amber via-white to-success flex items-center justify-center">
              <IndianRupee className="w-3.5 h-3.5 text-navy" />
            </div>
            <span className="font-display font-bold text-sm">SchemeSync India</span>
          </div>
          <div className="text-center">
            <p className="text-white/50 text-xs font-body">
              {t(
                'अस्वीकरण: यह कोई सरकारी वेबसाइट नहीं है। आधिकारिक पोर्टल से लिया गया डेटा केवल संदर्भ हेतु।',
                'Disclaimer: Not a government website. Data sourced from official portals for reference only.'
              )}
            </p>
          </div>
          <div className="flex gap-4 text-xs text-white/50">
            <span className="hover:text-white cursor-pointer transition-colors">About</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
      <div className="tricolor-bar mt-6" />
    </footer>
  );
}

export default Index;
