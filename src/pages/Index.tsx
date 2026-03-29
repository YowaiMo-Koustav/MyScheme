import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal, useAnimatedCounter } from '@/hooks/use-scroll-reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Search, GraduationCap, Tractor, Heart, Briefcase, Rocket, Users, UserCheck, Accessibility, ExternalLink } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <TricolorBar />
      <Navbar />
      <HeroSection onStart={() => navigate('/auth')} />
      <StatsSection />
      <ProblemSection />
      <HowItWorksSection />
      <RolesSection onStart={() => navigate('/auth')} />
      <TrustSection />
      <CTASection onStart={() => navigate('/auth')} />
      <Footer />
    </div>
  );
};

function TricolorBar() {
  return <div className="tricolor-bar fixed top-0 left-0 right-0 z-[60]" />;
}

function Navbar() {
  const navigate = useNavigate();
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-1 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm"
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-center relative">
        {/* Left - Login */}
        <div className="absolute left-4 flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate('/auth')}>
            Login / Register
          </Button>
        </div>

        {/* Center - Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded gradient-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="text-center">
            <span className="font-bold text-base text-foreground tracking-tight">SchemeSync India</span>
            <p className="text-[10px] text-muted-foreground leading-none -mt-0.5">Government Scheme Finder</p>
          </div>
        </div>

        {/* Right - CTA */}
        <div className="absolute right-4">
          <Button size="sm" className="gradient-primary text-primary-foreground text-xs" onClick={() => navigate('/auth')}>
            Find My Scheme <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 gradient-hero overflow-hidden">
      {/* Floating scheme tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🎓 Scholarships', '🌾 Kisan Yojana', '🏥 Health Cover', '🏠 Housing Aid'].map((text, i) => (
          <motion.div
            key={i}
            className="absolute glass-dark rounded-lg px-3 py-2 text-xs text-white/70 font-medium"
            style={{
              top: `${22 + i * 16}%`,
              left: i % 2 === 0 ? `${6 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${6 + i * 3}%` : undefined,
            }}
            animate={{ y: [0, -12, 0] }}
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
            🇮🇳 AI-Powered • Official Government Data Sources
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 text-balance">
            Find Your Government<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, hsl(24 95% 60%), hsl(14 90% 65%))' }}>
              Scheme in 60 Seconds
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/65 max-w-xl mx-auto mb-8 text-balance">
            Stop searching through hundreds of portals. Answer a few questions and our AI matches you with schemes you're actually eligible for.
          </p>
          <Button
            size="lg"
            onClick={onStart}
            className="gradient-accent text-accent-foreground font-bold text-base px-8 py-5 rounded-lg animate-pulse-glow hover:scale-105 transition-transform"
          >
            Find My Scheme <ArrowRight className="w-5 h-5" />
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
    { value: `${schemes.toLocaleString()}+`, label: 'Schemes Indexed', icon: Search },
    { value: `₹${benefits}L Cr+`, label: 'In Benefits', icon: Zap },
    { value: `${states}`, label: 'States Covered', icon: Shield },
  ];

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center p-6 gov-card rounded-lg"
            >
              <stat.icon className="w-7 h-7 mx-auto mb-3 text-primary" />
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
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
    <section ref={ref} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-accent font-bold text-xs uppercase tracking-widest">The Challenge</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3 mb-5 text-balance">
            Millions of Indians miss benefits they're eligible for
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-2xl mx-auto">
            With 2,500+ central and state schemes across dozens of portals, finding the right one feels impossible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: '60%', text: 'of eligible citizens never apply for schemes' },
              { num: '2,500+', text: 'schemes across central and state governments' },
              { num: '45+', text: 'government portals to navigate' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="p-5 gov-card"
              >
                <div className="text-2xl font-bold text-primary mb-1">{item.num}</div>
                <p className="text-muted-foreground text-sm">{item.text}</p>
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
    { icon: '📝', title: 'Answer Questions', desc: 'Share basic details — age, income, occupation, state. Takes under 60 seconds.' },
    { icon: '🤖', title: 'AI Analysis', desc: 'Our engine scans 2,500+ schemes and ranks the ones you\'re most eligible for.' },
    { icon: '✅', title: 'Apply with Confidence', desc: 'Get documents list, deadlines, and direct application links.' },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="text-center mb-12"
        >
          <span className="text-accent font-bold text-xs uppercase tracking-widest">How It Works</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3">
            Three simple steps
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center p-6 gov-card group"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                {i + 1}
              </div>
              <div className="text-3xl mb-3 mt-2">{step.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-1.5">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
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
    { icon: GraduationCap, label: 'Student' },
    { icon: Tractor, label: 'Farmer' },
    { icon: Heart, label: 'Woman' },
    { icon: Briefcase, label: 'Worker' },
    { icon: Rocket, label: 'Entrepreneur' },
    { icon: Users, label: 'Individual' },
    { icon: UserCheck, label: 'Senior Citizen' },
    { icon: Accessibility, label: 'Disabled' },
  ];

  return (
    <section ref={ref} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} className="text-center mb-12">
          <span className="text-accent font-bold text-xs uppercase tracking-widest">Who It's For</span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3 text-balance">
            Schemes for every Indian citizen
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
              className="p-5 gov-card group cursor-pointer hover:border-primary/40"
            >
              <role.icon className="w-7 h-7 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-bold text-foreground text-sm">{role.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}}>
          <span className="text-accent font-bold text-xs uppercase tracking-widest">Trusted Sources</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3 mb-6">
            Data sourced from official government portals
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['india.gov.in', 'pmkisan.gov.in', 'scholarships.gov.in', 'pmjay.gov.in', 'startupindia.gov.in', 'eshram.gov.in'].map((site, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="px-3 py-1.5 rounded-md bg-secondary text-muted-foreground text-xs font-medium border border-border flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" /> {site}
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground mt-5 text-xs">Last updated: December 2024 • Data refreshed monthly</p>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection({ onStart }: { onStart: () => void }) {
  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-5 text-balance">
            Don't miss the benefits you deserve
          </h2>
          <p className="text-white/65 text-base mb-8 max-w-lg mx-auto">
            Join thousands of Indians who've found their matching schemes. It's free, fast, and private.
          </p>
          <Button
            size="lg"
            onClick={onStart}
            className="gradient-accent text-accent-foreground font-bold text-base px-8 py-5 rounded-lg animate-pulse-glow hover:scale-105 transition-transform"
          >
            Start Now — It's Free <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded gradient-primary flex items-center justify-center">
              <Shield className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm text-foreground">SchemeSync India</span>
          </div>
          <p className="text-muted-foreground text-xs text-center">
            Not a government website. Data sourced from official portals for reference only.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">About</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
      <div className="tricolor-bar mt-6" />
    </footer>
  );
}

export default Index;
