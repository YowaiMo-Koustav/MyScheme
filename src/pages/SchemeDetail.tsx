import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMatcher } from '@/contexts/MatcherContext';
import { schemes as allSchemes, categoryLabels, categoryIcons } from '@/data/schemes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck, FileText, Clock, Building2, Share2, CheckCircle, AlertCircle } from 'lucide-react';

const SchemeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { results, savedSchemes, toggleSaved } = useMatcher();

  const matched = results.find(r => r.id === id);
  const scheme = matched || allSchemes.find(s => s.id === id);

  if (!scheme) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Scheme not found</h2>
          <Button onClick={() => navigate(-1)} variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Go Back</Button>
        </div>
      </div>
    );
  }

  const isSaved = savedSchemes.includes(scheme.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero py-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" className="text-white/70 hover:text-white mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Results
          </Button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-white/80 border-white/20">
                {categoryIcons[scheme.category]} {categoryLabels[scheme.category]}
              </Badge>
              {matched && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white">
                  {matched.confidence} • {matched.match_score}% match
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-2">{scheme.name}</h1>
            <p className="text-white/60">{scheme.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Match info */}
            {matched && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" /> Why This Matches You
                </h3>
                <ul className="space-y-2">
                  {matched.match_reasons.map((reason, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5 shrink-0">✓</span> {reason}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">Match Score:</span>
                  <Progress value={matched.match_score} className="h-2 flex-1" />
                  <span className="text-sm font-bold text-primary">{matched.match_score}%</span>
                </div>
              </motion.div>
            )}

            {/* Benefits */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-display font-bold text-foreground mb-4">💰 Benefits</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="text-sm text-muted-foreground">Amount</div>
                  <div className="text-lg font-bold text-foreground">{scheme.benefit_amount}</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="text-lg font-bold text-foreground">{scheme.benefit_type}</div>
                </div>
              </div>
            </motion.div>

            {/* Documents */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Required Documents
              </h3>
              <ul className="space-y-2">
                {scheme.required_documents.map((doc, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{i + 1}</span>
                    </div>
                    <span className="text-sm text-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Application steps */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-display font-bold text-foreground mb-4">📋 How to Apply</h3>
              <ol className="space-y-3">
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs flex items-center justify-center shrink-0">1</span>
                  Gather all required documents listed above
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs flex items-center justify-center shrink-0">2</span>
                  Visit the official application portal
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs flex items-center justify-center shrink-0">3</span>
                  Fill the application form with accurate details
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs flex items-center justify-center shrink-0">4</span>
                  Upload documents and submit
                </li>
              </ol>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-card border border-border p-6 sticky top-4">
              <Button className="w-full gradient-accent text-accent-foreground font-bold py-6 rounded-xl mb-3" asChild>
                <a href={scheme.application_link} target="_blank" rel="noopener noreferrer">
                  Apply Now <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" className="w-full rounded-xl mb-3" onClick={() => toggleSaved(scheme.id)}>
                {isSaved ? <BookmarkCheck className="w-4 h-4 mr-2 text-primary" /> : <Bookmark className="w-4 h-4 mr-2" />}
                {isSaved ? 'Saved' : 'Save Scheme'}
              </Button>
              <Button variant="ghost" className="w-full rounded-xl" onClick={() => navigator.share?.({ title: scheme.name, url: window.location.href }).catch(() => {})}>
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>{scheme.ministry}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Updated: {scheme.last_updated}</span>
                </div>
                {scheme.deadline && (
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Deadline: {scheme.deadline}</span>
                  </div>
                )}
                <a
                  href={scheme.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  Official Source
                </a>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                ⚠️ This is for reference only. Please verify eligibility on the official portal.
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-12" />
    </div>
  );
};

export default SchemeDetail;
