import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { schemes as initialSchemes, categoryLabels, categoryIcons } from '@/data/schemes';
import { Scheme } from '@/types/scheme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit2, ToggleLeft, ToggleRight, Shield, ExternalLink } from 'lucide-react';

const Admin = () => {
  const [schemes] = useState<Scheme[]>(initialSchemes);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return schemes;
    const q = search.toLowerCase();
    return schemes.filter(s => s.name.toLowerCase().includes(q) || s.category.includes(q));
  }, [schemes, search]);

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero py-8 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-extrabold text-white">Admin Panel</h1>
              <p className="text-white/60 text-sm">Manage scheme database</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                maxLength={100}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{schemes.length} Schemes</Badge>
              <Badge variant="secondary">{schemes.filter(s => s.is_active).length} Active</Badge>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scheme</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Benefit</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((scheme) => (
                  <TableRow key={scheme.id}>
                    <TableCell>
                      <div className="max-w-[250px]">
                        <div className="font-semibold text-foreground truncate">{scheme.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{scheme.ministry}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {categoryIcons[scheme.category]} {categoryLabels[scheme.category]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-foreground">{scheme.benefit_amount}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium capitalize ${
                        scheme.application_difficulty === 'easy' ? 'text-green-600' :
                        scheme.application_difficulty === 'medium' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {scheme.application_difficulty}
                      </span>
                    </TableCell>
                    <TableCell>
                      {scheme.is_active ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                          <ToggleRight className="w-4 h-4" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <ToggleLeft className="w-4 h-4" /> Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <a href={scheme.source_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No schemes found.</div>
          )}
        </div>
      </div>

      <div className="py-12" />
    </div>
  );
};

export default Admin;
