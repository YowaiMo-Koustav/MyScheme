import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal, useAnimatedCounter } from '@/hooks/use-scroll-reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Search, GraduationCap, Tractor, Heart, Briefcase, Rocket, Users, UserCheck, Accessibility } from 'lucide-react';
import { categoryIcons } from '@/data/schemes';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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

function Navbar() {
  const navigate = useNavigate();
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">SchemeSync</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>Login</Button>
          <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => navigate('/auth')}>
            Find My Scheme <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 gradient-hero overflow-hidden">
      {/* Floating cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🎓 Scholarships', '🌾 Kisan Yojana', '🏥 Health Cover', '🏠 Housing Aid'].map((text, i) => (
          <motion.div
            key={i}
            className="absolute glass-dark rounded-xl px-4 py-3 text-sm text-white/80 font-medium"
            style={{
              top: `${20 + i * 18}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, i % 2 === 0 ? 2 : -2, 0],
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            🇮🇳 Powered by AI • Trusted Government Sources
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6 text-balance">
            Find Your Government<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, hsl(38 92% 60%), hsl(28 90% 65%))' }}>
              Scheme in 60 Seconds
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 text-balance">
            Stop searching through hundreds of portals. Answer a few questions and our AI matches you with schemes you're actually eligible for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onStart}
              className="gradient-accent text-accent-foreground font-bold text-lg px-8 py-6 rounded-xl animate-pulse-glow hover:scale-105 transition-transform"
            >
              Find My Scheme <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl"
              onClick={onStart}
            >
              Browse All Schemes
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
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
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
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
    <section ref={ref} className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-accent font-bold text-sm uppercase tracking-widest">The Problem</span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-foreground mt-4 mb-6 text-balance">
            Millions of Indians miss benefits they're eligible for
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            With 2,500+ central and state schemes across dozens of portals, finding the right one feels impossible. Most people don't even know these schemes exist.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '60%', text: 'of eligible citizens never apply for schemes' },
              { num: '2,500+', text: 'schemes across central and state governments' },
              { num: '45+', text: 'government portals to navigate' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="text-3xl font-display font-extrabold text-primary mb-2">{item.num}</div>
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
    { icon: '📝', title: 'Answer Questions', desc: 'Tell us about yourself — age, income, occupation, state. Takes under 60 seconds.' },
    { icon: '🤖', title: 'AI Matches', desc: 'Our engine scans 2,500+ schemes and ranks the ones you\'re most eligible for.' },
    { icon: '✅', title: 'Apply with Confidence', desc: 'Get documents list, deadlines, and direct application links.' },
  ];

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="text-center mb-16"
        >
          <span className="text-accent font-bold text-sm uppercase tracking-widest">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-foreground mt-4">
            Three steps. That's it.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                {i + 1}
              </div>
              <div className="text-4xl mb-4 mt-2">{step.icon}</div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">{step.title}</h3>
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
    { icon: GraduationCap, label: 'Student', color: 'from-blue-500/10 to-blue-600/5' },
    { icon: Tractor, label: 'Farmer', color: 'from-green-500/10 to-green-600/5' },
    { icon: Heart, label: 'Woman', color: 'from-pink-500/10 to-pink-600/5' },
    { icon: Briefcase, label: 'Worker', color: 'from-amber-500/10 to-amber-600/5' },
    { icon: Rocket, label: 'Entrepreneur', color: 'from-purple-500/10 to-purple-600/5' },
    { icon: Users, label: 'Individual', color: 'from-teal-500/10 to-teal-600/5' },
    { icon: UserCheck, label: 'Senior Citizen', color: 'from-orange-500/10 to-orange-600/5' },
    { icon: Accessibility, label: 'Disabled', color: 'from-indigo-500/10 to-indigo-600/5' },
  ];

  return (
    <section ref={ref} className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} className="text-center mb-16">
          <span className="text-accent font-bold text-sm uppercase tracking-widest">Who It's For</span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-foreground mt-4 text-balance">
            Schemes for every Indian citizen
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roles.map((role, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              onClick={onStart}
              className={`p-6 rounded-2xl bg-gradient-to-br ${role.color} border border-border hover:border-primary/40 hover:shadow-md transition-all group cursor-pointer`}
            >
              <role.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-display font-bold text-foreground text-sm">{role.label}</span>
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
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}}>
          <span className="text-accent font-bold text-sm uppercase tracking-widest">Trusted Sources</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-foreground mt-4 mb-8">
            Data sourced from official government portals
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['india.gov.in', 'pmkisan.gov.in', 'scholarships.gov.in', 'pmjay.gov.in', 'startupindia.gov.in', 'eshram.gov.in'].map((site, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium border border-border"
              >
                🔗 {site}
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-sm">Last updated: December 2024 • Data refreshed monthly</p>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection({ onStart }: { onStart: () => void }) {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6 text-balance">
            Don't miss the benefits you deserve
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of Indians who've found their matching schemes. It's free, fast, and private.
          </p>
          <Button
            size="lg"
            onClick={onStart}
            className="gradient-accent text-accent-foreground font-bold text-lg px-10 py-6 rounded-xl animate-pulse-glow hover:scale-105 transition-transform"
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
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <Shield className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">SchemeSync India</span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            Not a government website. Data sourced from official portals. For reference only.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">About</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Index;
