import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMatcher } from '@/contexts/MatcherContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MatchedScheme } from '@/types/scheme';
import { categoryLabels, categoryIcons } from '@/data/schemes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, ArrowRight, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, RotateCcw, ExternalLink } from 'lucide-react';

const Results = () => {
  const { results, savedSchemes, toggleSaved, resetMatcher } = useMatcher();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(results.map(r => r.category));
    return ['all', ...Array.from(cats)];
  }, [results]);

  const filtered = useMemo(() => {
    let list = results;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    if (categoryFilter !== 'all') list = list.filter(s => s.category === categoryFilter);
    return list;
  }, [results, search, categoryFilter]);

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">{t('अभी तक कोई परिणाम नहीं', 'No results yet')}</h2>
          <p className="text-muted-foreground mb-6 font-body">{t('प्रश्नावली पूरी करें', 'Complete the questionnaire to find matching schemes.')}</p>
          <Button onClick={() => navigate('/matcher')} className="bg-primary text-primary-foreground">
            {t('शुरू करें', 'Start Matcher')} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy py-12 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3">
              {t('आपकी मिलती-जुलती योजनाएं', 'Your Matching Schemes')}
            </h1>
            <p className="text-white/60 text-lg font-body">
              {t(`हमने ${results.length} योजनाएं खोजीं`, `We found ${results.length} schemes that match your profile`)}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-8">
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card border border-border shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={t('योजना खोजें...', 'Search schemes...')} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" maxLength={100} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <Button key={cat} variant={categoryFilter === cat ? 'default' : 'outline'} size="sm" onClick={() => setCategoryFilter(cat)} className="rounded-full text-xs">
                {cat === 'all' ? '🏷️ All' : `${categoryIcons[cat] || '📋'} ${categoryLabels[cat] || cat}`}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4 pb-12">
          {filtered.map((scheme, i) => (
            <SchemeCard key={scheme.id} scheme={scheme} index={i} expanded={expandedId === scheme.id}
              onToggle={() => setExpandedId(expandedId === scheme.id ? null : scheme.id)}
              saved={savedSchemes.includes(scheme.id)} onSave={() => toggleSaved(scheme.id)} onDetail={() => navigate(`/scheme/${scheme.id}`)}
            />
          ))}
        </div>

        {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground font-body">{t('कोई योजना नहीं मिली', 'No schemes match your search.')}</div>}

        <div className="text-center pb-12">
          <Button variant="outline" onClick={() => { resetMatcher(); navigate('/matcher'); }}>
            <RotateCcw className="w-4 h-4 mr-2" /> {t('फिर से प्रश्नावली भरें', 'Retake Questionnaire')}
          </Button>
        </div>
      </div>
    </div>
  );
};

function SchemeCard({ scheme, index, expanded, onToggle, saved, onSave, onDetail }: {
  scheme: MatchedScheme; index: number; expanded: boolean; onToggle: () => void; saved: boolean; onSave: () => void; onDetail: () => void;
}) {
  const confidenceColor = (c: string) => {
    switch (c) {
      case 'Strong Match': return 'bg-success/10 text-success';
      case 'Likely Eligible': return 'bg-primary/10 text-primary';
      case 'Possible Match': return 'bg-amber/10 text-amber';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.4 }}
      className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className="text-xs">{categoryIcons[scheme.category]} {categoryLabels[scheme.category]}</Badge>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${confidenceColor(scheme.confidence)}`}>{scheme.confidence}</span>
              {scheme.deadline && <Badge variant="destructive" className="text-xs">Deadline: {scheme.deadline}</Badge>}
            </div>
            <h3 className="text-lg font-display font-bold text-foreground mb-1 cursor-pointer hover:text-primary transition-colors" onClick={onDetail}>{scheme.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 font-body">{scheme.description}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-display font-bold text-primary">{scheme.match_score}%</div>
            <div className="text-xs text-muted-foreground">match</div>
            <div className="w-16 mt-1"><Progress value={scheme.match_score} className="h-1.5" /></div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-primary font-bold">{scheme.benefit_amount}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{scheme.benefit_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onSave} className="h-8 w-8">
              {saved ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onToggle} className="text-xs">
              {expanded ? 'Less' : 'Why this?'} {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </div>
      {expanded && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-6 pb-6 border-t border-border bg-muted/30">
          <div className="pt-4 space-y-3">
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-2">Why this matches you:</h4>
              <ul className="space-y-1">
                {scheme.match_reasons.map((reason, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-0.5">✓</span> {reason}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 pt-2">
              <Button size="sm" onClick={onDetail} className="bg-primary text-primary-foreground">View Details <ArrowRight className="w-3 h-3" /></Button>
              <Button size="sm" variant="outline" asChild>
                <a href={scheme.application_link} target="_blank" rel="noopener noreferrer">Apply <ExternalLink className="w-3 h-3" /></a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Results;
