import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal, useAnimatedCounter } from '@/hooks/use-scroll-reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Zap, Shield, GraduationCap, Tractor, Heart, Briefcase, Rocket, Users, UserCheck, Accessibility, IndianRupee } from 'lucide-react';

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
    <div className="bg-[hsl(214,70%,14%)] text-white/90 text-[11px] py-1.5 text-center tracking-wide" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {t(
        '🇮🇳 भारतीय नागरिकों के लिए एक डिजिटल पहल',
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
  const { t } = useLanguage();
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-1 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-center relative">
        {/* Left - Login */}
        <div className="absolute left-4 flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate('/auth')}>
            {t('लॉगिन / रजिस्टर', 'Login / Register')}
          </Button>
        </div>

        {/* Center - Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(24,95%,50%)] via-white to-[hsl(142,60%,35%)] flex items-center justify-center shadow-md">
            <IndianRupee className="w-5 h-5 text-[hsl(214,70%,22%)]" />
          </div>
          <div className="text-center">
            <span className="font-bold text-lg text-foreground tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>SchemeSync India</span>
            <p className="text-[10px] text-muted-foreground leading-none -mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {t('सरकारी योजना खोजक • Government Scheme Finder', 'Government Scheme Finder • सरकारी योजना खोजक')}
            </p>
          </div>
        </div>

        {/* Right - Language Toggle */}
        <div className="absolute right-4">
          <LanguageToggle />
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection({ onStart }: { onStart: () => void }) {
  const { t, lang } = useLanguage();
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center gradient-hero overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(24 95% 50%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(142 60% 35%) 0%, transparent 50%)`,
      }} />

      {/* Floating tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { hi: '🎓 छात्रवृत्ति', en: '🎓 Scholarship' },
          { hi: '🌾 किसान योजना', en: '🌾 Farmer Scheme' },
          { hi: '🏥 आयुष्मान भारत', en: '🏥 Ayushman Bharat' },
          { hi: '🏠 आवास योजना', en: '🏠 Housing Scheme' },
          { hi: '💼 रोजगार', en: '💼 Employment' },
        ].map((tag, i) => (
          <motion.div
            key={i}
            className="absolute glass-dark rounded-lg px-3 py-2 text-xs text-white/60 font-medium"
            style={{
              top: `${18 + i * 14}%`,
              left: i % 2 === 0 ? `${5 + i * 2}%` : undefined,
              right: i % 2 !== 0 ? `${5 + i * 2}%` : undefined,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            {t(tag.hi, tag.en)}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-5 backdrop-blur-sm border border-white/10">
            {t('🇮🇳 AI-संचालित • आधिकारिक सरकारी डेटा स्रोत', '🇮🇳 AI-Powered • Official Government Data Source')}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            {t('अपनी सरकारी योजना खोजें', 'Find Your Government Scheme')}
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/80 mb-5" style={{ fontFamily: "'Lexend', sans-serif" }}>
            {lang === 'hi' ? (
              <>60 सेकंड में अपनी योजना खोजें — <span className="text-[hsl(24,95%,60%)]">AI-संचालित</span></>
            ) : (
              <>Find Your Scheme in <span className="text-[hsl(24,95%,60%)]">60 Seconds</span></>
            )}
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto mb-8" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {t(
              'सैकड़ों पोर्टल खोजना बंद करें। कुछ सवालों के जवाब दें और हमारा AI आपको सही योजनाओं से जोड़ेगा।',
              'Stop searching hundreds of portals. Answer a few questions and our AI will connect you to the right schemes.'
            )}
          </p>
          <Button
            size="lg"
            onClick={onStart}
            className="gradient-accent text-accent-foreground font-bold text-base px-8 py-5 rounded-lg animate-pulse-glow hover:scale-105 transition-transform"
          >
            {t('योजना खोजें — Find My Scheme', 'Find My Scheme — योजना खोजें')} <ArrowRight className="w-5 h-5" />
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
  const schemesCount = useAnimatedCounter(2500, 2000, isVisible);
  const benefits = useAnimatedCounter(15, 2000, isVisible);
  const states = useAnimatedCounter(28, 1500, isVisible);

  const stats = [
    { value: `${schemesCount.toLocaleString()}+`, label: t('योजनाएं अनुक्रमित', 'Schemes Indexed'), icon: Search },
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
              className="text-center p-5 gov-card rounded-lg border-t-2 border-t-[hsl(24,95%,50%)]"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1" style={{ fontFamily: "'Georgia', serif" }}>
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>{stat.label}</div>
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
          <span className="text-accent font-bold text-xs uppercase tracking-widest">{t('चुनौती', 'The Challenge')}</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3 mb-5" style={{ fontFamily: "'Georgia', serif" }}>
            {t(
              'करोड़ों भारतीय अपनी पात्र योजनाओं से वंचित रहते हैं',
              'Millions of Indians miss the schemes they are eligible for'
            )}
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {t(
              '2,500+ केंद्र और राज्य योजनाओं के साथ दर्जनों पोर्टल पर सही योजना ढूंढना लगभग असंभव है।',
              'With 2,500+ central and state schemes spread across dozens of portals, finding the right scheme is nearly impossible.'
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: '60%', hi: 'पात्र नागरिक कभी आवेदन नहीं करते', en: 'of eligible citizens never apply' },
              { num: '2,500+', hi: 'केंद्र और राज्य सरकार की योजनाएं', en: 'central & state government schemes' },
              { num: '45+', hi: 'सरकारी पोर्टल पर नेविगेट करना', en: 'government portals to navigate' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="p-5 gov-card"
              >
                <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "'Georgia', serif" }}>{item.num}</div>
                <p className="text-foreground text-sm font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>{t(item.hi, item.en)}</p>
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
    { icon: '📝', title: t('सवालों के जवाब दें', 'Answer Questions'), desc: t('अपनी उम्र, आय, व्यवसाय, राज्य जैसे बुनियादी विवरण साझा करें। 60 सेकंड से कम समय लगता है।', 'Share basic details like age, income, occupation, state. Takes less than 60 seconds.') },
    { icon: '🤖', title: t('AI विश्लेषण', 'AI Analysis'), desc: t('हमारा इंजन 2,500+ योजनाओं को स्कैन करता है और आपकी पात्रता के अनुसार रैंक करता है।', 'Our engine scans 2,500+ schemes and ranks them based on your eligibility.') },
    { icon: '✅', title: t('आवेदन करें', 'Apply with Confidence'), desc: t('दस्तावेजों की सूची, समय-सीमा और सीधे आवेदन लिंक प्राप्त करें।', 'Get document checklists, deadlines, and direct application links.') },
  ];

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="text-center mb-10"
        >
          <span className="text-accent font-bold text-xs uppercase tracking-widest">{t('कैसे काम करता है', 'How It Works')}</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3" style={{ fontFamily: "'Georgia', serif" }}>
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
              className="relative text-center p-6 gov-card group border-t-2 border-t-[hsl(142,60%,35%)]"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                {i + 1}
              </div>
              <div className="text-3xl mb-3 mt-2">{step.icon}</div>
              <h3 className="text-base font-bold text-foreground mb-1.5" style={{ fontFamily: "'Georgia', serif" }}>{step.title}</h3>
              <p className="text-muted-foreground text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>{step.desc}</p>
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
    { icon: Users, label: t('नागरिक', 'Citizen') },
    { icon: UserCheck, label: t('वरिष्ठ नागरिक', 'Senior Citizen') },
    { icon: Accessibility, label: t('दिव्यांगजन', 'Disabled') },
  ];

  return (
    <section ref={ref} className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} className="text-center mb-10">
          <span className="text-accent font-bold text-xs uppercase tracking-widest">{t('किसके लिए', 'Who It\'s For')}</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3" style={{ fontFamily: "'Georgia', serif" }}>
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
              className="p-5 gov-card group cursor-pointer hover:border-primary/40 border-l-2 border-l-[hsl(24,95%,50%)]"
            >
              <role.icon className="w-7 h-7 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-bold text-foreground text-sm block" style={{ fontFamily: "'Georgia', serif" }}>{role.label}</span>
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
    <section className="py-16 gradient-hero relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(24,95%,50%)] via-white to-[hsl(142,60%,35%)]" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            {t('आपके हक़ की योजनाओं से न चूकें', "Don't Miss the Benefits You Deserve")}
          </h2>
          <p className="text-white/55 text-sm mb-8 max-w-lg mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {t(
              'हजारों भारतीयों के साथ जुड़ें जिन्होंने अपनी सही योजनाएं खोज ली हैं। यह मुफ्त, तेज़ और सुरक्षित है।',
              'Join thousands of Indians who found the right schemes. It\'s free, fast, and secure.'
            )}
          </p>
          <Button
            size="lg"
            onClick={onStart}
            className="gradient-accent text-accent-foreground font-bold text-base px-8 py-5 rounded-lg animate-pulse-glow hover:scale-105 transition-transform"
          >
            {t('अभी शुरू करें — Start Now', 'Start Now — अभी शुरू करें')} <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(142,60%,35%)] via-white to-[hsl(24,95%,50%)]" />
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-8 bg-[hsl(214,70%,14%)] text-white/80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[hsl(24,95%,50%)] via-white to-[hsl(142,60%,35%)] flex items-center justify-center">
              <IndianRupee className="w-3.5 h-3.5 text-[hsl(214,70%,22%)]" />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: "'Georgia', serif" }}>SchemeSync India</span>
          </div>
          <div className="text-center">
            <p className="text-white/50 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {t(
                'अस्वीकरण: यह कोई सरकारी वेबसाइट नहीं है। आधिकारिक पोर्टल से लिया गया डेटा केवल संदर्भ हेतु।',
                'Disclaimer: Not a government website. Data sourced from official portals for reference only.'
              )}
            </p>
          </div>
          <div className="flex gap-4 text-xs text-white/50">
            <span className="hover:text-white cursor-pointer transition-colors">{t('हमारे बारे में', 'About')}</span>
            <span className="hover:text-white cursor-pointer transition-colors">{t('गोपनीयता', 'Privacy')}</span>
            <span className="hover:text-white cursor-pointer transition-colors">{t('शर्तें', 'Terms')}</span>
          </div>
        </div>
      </div>
      <div className="tricolor-bar mt-6" />
    </footer>
  );
}

export default Index;
