import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal, useAnimatedCounter } from '@/hooks/use-scroll-reveal';
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
  return (
    <div className="bg-[hsl(214,70%,14%)] text-white/90 text-[11px] py-1.5 text-center tracking-wide" style={{ fontFamily: "'Nunito', sans-serif" }}>
      🇮🇳 A Digital Initiative for Indian Citizens &nbsp;|&nbsp; भारतीय नागरिकों के लिए एक डिजिटल पहल
    </div>
  );
}

function TricolorBar() {
  return <div className="tricolor-bar sticky top-0 z-[60]" />;
}

function Navbar() {
  const navigate = useNavigate();
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
            Login / Register
          </Button>
        </div>

        {/* Center - Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(24,95%,50%)] via-white to-[hsl(142,60%,35%)] flex items-center justify-center shadow-md">
            <IndianRupee className="w-5 h-5 text-[hsl(214,70%,22%)]" />
          </div>
          <div className="text-center">
            <span className="font-bold text-lg text-foreground tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>SchemeSync India</span>
            <p className="text-[10px] text-muted-foreground leading-none -mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>सरकारी योजना खोजक • Government Scheme Finder</p>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Subtle Ashoka wheel pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(24 95% 50%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(142 60% 35%) 0%, transparent 50%)`,
      }} />

      {/* Floating tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🎓 छात्रवृत्ति', '🌾 किसान योजना', '🏥 आयुष्मान भारत', '🏠 आवास योजना', '💼 रोजगार'].map((text, i) => (
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-5 backdrop-blur-sm border border-white/10">
            🇮🇳 AI-संचालित • आधिकारिक सरकारी डेटा स्रोत
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            अपनी सरकारी योजना खोजें
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/80 mb-5" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Find Your Government Scheme in <span className="text-[hsl(24,95%,60%)]">60 Seconds</span>
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto mb-8" style={{ fontFamily: "'Nunito', sans-serif" }}>
            सैकड़ों पोर्टल खोजना बंद करें। कुछ सवालों के जवाब दें और हमारा AI आपको सही योजनाओं से जोड़ेगा।
          </p>
          <Button
            size="lg"
            onClick={onStart}
            className="gradient-accent text-accent-foreground font-bold text-base px-8 py-5 rounded-lg animate-pulse-glow hover:scale-105 transition-transform"
          >
            योजना खोजें — Find My Scheme <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function StatsSection() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();
  const schemes = useAnimatedCounter(2500, 2000, isVisible);
  const benefits = useAnimatedCounter(15, 2000, isVisible);
  const states = useAnimatedCounter(28, 1500, isVisible);

  const stats = [
    { value: `${schemes.toLocaleString()}+`, label: 'योजनाएं अनुक्रमित • Schemes Indexed', icon: Search },
    { value: `₹${benefits}L Cr+`, label: 'लाभ राशि • In Benefits', icon: Zap },
    { value: `${states}`, label: 'राज्य कवर • States Covered', icon: Shield },
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

  return (
    <section ref={ref} className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-accent font-bold text-xs uppercase tracking-widest">चुनौती • The Challenge</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3 mb-5" style={{ fontFamily: "'Georgia', serif" }}>
            करोड़ों भारतीय अपनी पात्र योजनाओं से वंचित रहते हैं
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-2xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
            2,500+ केंद्र और राज्य योजनाओं के साथ दर्जनों पोर्टल पर सही योजना ढूंढना लगभग असंभव है।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: '60%', text: 'पात्र नागरिक कभी आवेदन नहीं करते', subtext: 'of eligible citizens never apply' },
              { num: '2,500+', text: 'केंद्र और राज्य सरकार की योजनाएं', subtext: 'central & state government schemes' },
              { num: '45+', text: 'सरकारी पोर्टल पर नेविगेट करना', subtext: 'government portals to navigate' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="p-5 gov-card"
              >
                <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: "'Georgia', serif" }}>{item.num}</div>
                <p className="text-foreground text-sm font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>{item.text}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{item.subtext}</p>
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
  const steps = [
    { icon: '📝', title: 'सवालों के जवाब दें', titleEn: 'Answer Questions', desc: 'अपनी उम्र, आय, व्यवसाय, राज्य जैसे बुनियादी विवरण साझा करें। 60 सेकंड से कम समय लगता है।' },
    { icon: '🤖', title: 'AI विश्लेषण', titleEn: 'AI Analysis', desc: 'हमारा इंजन 2,500+ योजनाओं को स्कैन करता है और आपकी पात्रता के अनुसार रैंक करता है।' },
    { icon: '✅', title: 'आवेदन करें', titleEn: 'Apply with Confidence', desc: 'दस्तावेजों की सूची, समय-सीमा और सीधे आवेदन लिंक प्राप्त करें।' },
  ];

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="text-center mb-10"
        >
          <span className="text-accent font-bold text-xs uppercase tracking-widest">कैसे काम करता है • How It Works</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3" style={{ fontFamily: "'Georgia', serif" }}>
            तीन आसान चरण
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
              <h3 className="text-base font-bold text-foreground mb-0.5" style={{ fontFamily: "'Georgia', serif" }}>{step.title}</h3>
              <p className="text-xs text-primary font-medium mb-1.5">{step.titleEn}</p>
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
  const roles = [
    { icon: GraduationCap, label: 'छात्र', labelEn: 'Student' },
    { icon: Tractor, label: 'किसान', labelEn: 'Farmer' },
    { icon: Heart, label: 'महिला', labelEn: 'Woman' },
    { icon: Briefcase, label: 'कामगार', labelEn: 'Worker' },
    { icon: Rocket, label: 'उद्यमी', labelEn: 'Entrepreneur' },
    { icon: Users, label: 'नागरिक', labelEn: 'Individual' },
    { icon: UserCheck, label: 'वरिष्ठ नागरिक', labelEn: 'Senior Citizen' },
    { icon: Accessibility, label: 'दिव्यांगजन', labelEn: 'Disabled' },
  ];

  return (
    <section ref={ref} className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} className="text-center mb-10">
          <span className="text-accent font-bold text-xs uppercase tracking-widest">किसके लिए • Who It's For</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3" style={{ fontFamily: "'Georgia', serif" }}>
            हर भारतीय नागरिक के लिए योजनाएं
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
              <span className="text-muted-foreground text-xs">{role.labelEn}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onStart }: { onStart: () => void }) {
  return (
    <section className="py-16 gradient-hero relative overflow-hidden">
      {/* Tricolor accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(24,95%,50%)] via-white to-[hsl(142,60%,35%)]" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            आपके हक़ की योजनाओं से न चूकें
          </h2>
          <p className="text-white/80 text-lg mb-2" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Don't miss the benefits you deserve
          </p>
          <p className="text-white/55 text-sm mb-8 max-w-lg mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
            हजारों भारतीयों के साथ जुड़ें जिन्होंने अपनी सही योजनाएं खोज ली हैं। यह मुफ्त, तेज़ और सुरक्षित है।
          </p>
          <Button
            size="lg"
            onClick={onStart}
            className="gradient-accent text-accent-foreground font-bold text-base px-8 py-5 rounded-lg animate-pulse-glow hover:scale-105 transition-transform"
          >
            अभी शुरू करें — Start Now <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(142,60%,35%)] via-white to-[hsl(24,95%,50%)]" />
    </section>
  );
}

function Footer() {
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
              अस्वीकरण: यह कोई सरकारी वेबसाइट नहीं है। आधिकारिक पोर्टल से लिया गया डेटा केवल संदर्भ हेतु।
            </p>
            <p className="text-white/40 text-[10px] mt-1">
              Disclaimer: Not a government website. Data sourced from official portals for reference only.
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
