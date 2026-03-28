import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMatcher } from '@/contexts/MatcherContext';
import { schemes as allSchemes, categoryLabels, categoryIcons } from '@/data/schemes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Bookmark, Trash2, ArrowRight, Search } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { savedSchemes, toggleSaved, profile } = useMatcher();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const saved = useMemo(
    () => allSchemes.filter(s => savedSchemes.includes(s.id)),
    [savedSchemes]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero py-8 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button variant="ghost" className="text-white/70 hover:text-white mb-4" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Home
          </Button>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white">My Dashboard</h1>
          <p className="text-white/60 mt-2">Your saved schemes and profile summary</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Saved schemes */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl bg-card border border-border p-6">
              <h2 className="font-display font-bold text-foreground text-xl mb-4">
                Saved Schemes ({saved.length})
              </h2>
              {saved.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bookmark className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p>No saved schemes yet.</p>
                  <Button className="mt-4 gradient-primary text-primary-foreground" onClick={() => navigate('/matcher')}>
                    Find Schemes <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {saved.map((scheme, i) => (
                    <motion.div
                      key={scheme.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border hover:shadow-sm transition-shadow"
                    >
                      <div className="text-2xl">{categoryIcons[scheme.category]}</div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors truncate"
                          onClick={() => navigate(`/scheme/${scheme.id}`)}
                        >
                          {scheme.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{categoryLabels[scheme.category]}</Badge>
                          <span className="text-xs text-muted-foreground">{scheme.benefit_amount}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={scheme.application_link} target="_blank" rel="noopener noreferrer">
                            Apply <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => toggleSaved(scheme.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Profile summary */}
          <div>
            <div className="rounded-2xl bg-card border border-border p-6 sticky top-4">
              <h3 className="font-display font-bold text-foreground mb-4">Your Profile</h3>
              {Object.keys(profile).length === 0 ? (
                <p className="text-muted-foreground text-sm">No profile data yet. Complete the matcher to see your profile.</p>
              ) : (
                <div className="space-y-3 text-sm">
                  {profile.selected_roles && (
                    <div>
                      <span className="text-muted-foreground">Roles:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.selected_roles.map(r => (
                          <Badge key={r} variant="secondary" className="text-xs capitalize">{r.replace('_', ' ')}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile.state && <ProfileRow label="State" value={profile.state} />}
                  {profile.age && <ProfileRow label="Age" value={String(profile.age)} />}
                  {profile.gender && <ProfileRow label="Gender" value={profile.gender} />}
                  {profile.education && <ProfileRow label="Education" value={profile.education} />}
                  {profile.occupation && <ProfileRow label="Occupation" value={profile.occupation} />}
                </div>
              )}

              <div className="mt-6 space-y-2">
                <Button className="w-full gradient-primary text-primary-foreground" onClick={() => navigate('/matcher')}>
                  <Search className="w-4 h-4 mr-2" /> Find More Schemes
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/results')}>
                  View Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12" />
    </div>
  );
};

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground capitalize">{value.replace('_', ' ')}</span>
    </div>
  );
}

export default Dashboard;
