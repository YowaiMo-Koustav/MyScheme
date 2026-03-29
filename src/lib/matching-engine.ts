import { Scheme, MatchedScheme, UserProfile, ConfidenceLabel } from '@/types/scheme';

export function matchSchemes(profile: Partial<UserProfile>, schemes: Scheme[]): MatchedScheme[] {
  return schemes
    .filter(s => s.is_active)
    .map(scheme => scoreScheme(profile, scheme))
    .filter(m => m.match_score > 15)
    .sort((a, b) => b.match_score - a.match_score);
}

function scoreScheme(profile: Partial<UserProfile>, scheme: Scheme): MatchedScheme {
  const rules = scheme.eligibility_rules;
  const dimensions: ScoringDimension[] = [];
  let hardFail = false;
  const reasons: string[] = [];
  const missing: string[] = [];

  // 1. Role match (weight: 30) — primary signal
  if (rules.roles && rules.roles.length > 0) {
    const dim: ScoringDimension = { weight: 30, score: 0 };
    if (profile.selected_roles && profile.selected_roles.length > 0) {
      const overlap = rules.roles.filter(r => profile.selected_roles!.includes(r));
      if (overlap.length > 0) {
        // Proportional scoring: more role overlaps = higher score
        dim.score = Math.min(1, overlap.length / Math.min(rules.roles.length, 2));
        reasons.push(`Matches your role: ${overlap.join(', ')}`);
      } else {
        // No role match — strong negative signal but not always a hard fail
        dim.score = 0;
      }
    } else {
      dim.score = 0.4; // unknown, partial credit
    }
    dimensions.push(dim);
  }

  // 2. Age (weight: 20) — hard fail if out of range
  if (rules.min_age || rules.max_age) {
    const dim: ScoringDimension = { weight: 20, score: 0 };
    if (profile.age !== undefined) {
      const minOk = !rules.min_age || profile.age >= rules.min_age;
      const maxOk = !rules.max_age || profile.age <= rules.max_age;
      if (minOk && maxOk) {
        // Bonus for being well within range (not edge cases)
        const range = (rules.max_age || 100) - (rules.min_age || 0);
        const distFromEdge = Math.min(
          profile.age - (rules.min_age || 0),
          (rules.max_age || 100) - profile.age
        );
        dim.score = range > 0 ? 0.7 + 0.3 * Math.min(distFromEdge / (range * 0.3), 1) : 1;
        reasons.push(`Age ${profile.age} is within eligible range (${rules.min_age || '—'}–${rules.max_age || '—'})`);
      } else {
        hardFail = true;
        reasons.push(`Age requirement: ${rules.min_age || '—'}–${rules.max_age || '—'} years`);
      }
    } else {
      dim.score = 0.45;
    }
    dimensions.push(dim);
  }

  // 3. Income (weight: 22) — hard fail if over limit
  if (rules.income_max) {
    const dim: ScoringDimension = { weight: 22, score: 0 };
    if (profile.income !== undefined) {
      if (profile.income <= rules.income_max) {
        // Higher score for lower income (needier beneficiaries)
        const ratio = profile.income / rules.income_max;
        dim.score = 0.6 + 0.4 * (1 - ratio);
        reasons.push(`Income ₹${(profile.income / 100000).toFixed(1)}L within ₹${(rules.income_max / 100000).toFixed(1)}L limit`);
      } else {
        hardFail = true;
        reasons.push(`Income exceeds ₹${(rules.income_max / 100000).toFixed(1)}L limit`);
      }
    } else {
      dim.score = 0.4;
      missing.push('Income certificate');
    }
    dimensions.push(dim);
  }

  // 4. Gender (weight: 12) — hard fail if mismatch
  if (rules.gender && rules.gender.length > 0) {
    const dim: ScoringDimension = { weight: 12, score: 0 };
    if (profile.gender) {
      if (rules.gender.includes(profile.gender)) {
        dim.score = 1;
        reasons.push('Gender eligibility met');
      } else {
        hardFail = true;
      }
    } else {
      dim.score = 0.4;
    }
    dimensions.push(dim);
  }

  // 5. Caste category (weight: 10)
  if (rules.caste_category && rules.caste_category.length > 0) {
    const dim: ScoringDimension = { weight: 10, score: 0 };
    if (profile.caste_category) {
      if (rules.caste_category.includes(profile.caste_category)) {
        dim.score = 1;
        reasons.push(`${profile.caste_category} category eligible`);
      } else {
        // Some caste-specific schemes are exclusive
        dim.score = 0;
      }
    } else {
      dim.score = 0.3;
      missing.push('Caste certificate');
    }
    dimensions.push(dim);
  }

  // 6. State (weight: 12) — hard fail for state-specific schemes
  if (rules.states && rules.states.length > 0) {
    const dim: ScoringDimension = { weight: 12, score: 0 };
    if (profile.state) {
      if (rules.states.includes(profile.state)) {
        dim.score = 1;
        reasons.push(`Available in ${profile.state}`);
      } else {
        hardFail = true;
      }
    } else {
      dim.score = 0.35;
      missing.push('Domicile certificate');
    }
    dimensions.push(dim);
  }

  // 7. Disability (weight: 8)
  if (rules.disability !== undefined) {
    const dim: ScoringDimension = { weight: 8, score: 0 };
    if (profile.disability_status !== undefined) {
      if (rules.disability === profile.disability_status) {
        dim.score = 1;
        reasons.push('Disability status matches requirement');
      } else {
        hardFail = true;
      }
    } else {
      dim.score = 0.3;
    }
    dimensions.push(dim);
  }

  // 8. Education level cross-match (bonus)
  if (profile.education && rules.roles) {
    const educationBonus = getEducationBonus(profile.education, rules.roles, scheme.category);
    if (educationBonus > 0) {
      dimensions.push({ weight: 6, score: educationBonus });
      reasons.push('Education level aligns with scheme requirements');
    }
  }

  // 9. Occupation-scheme alignment (bonus)
  if (profile.occupation) {
    const occupationBonus = getOccupationBonus(profile.occupation, scheme.category, rules.roles || []);
    if (occupationBonus > 0) {
      dimensions.push({ weight: 6, score: occupationBonus });
      reasons.push('Occupation aligns with scheme category');
    }
  }

  // Calculate weighted score
  let score: number;
  if (dimensions.length === 0) {
    score = 55;
    reasons.push('Open to all eligible citizens');
  } else {
    const totalWeight = dimensions.reduce((sum, d) => sum + d.weight, 0);
    const weightedSum = dimensions.reduce((sum, d) => sum + d.weight * d.score, 0);
    score = Math.round((weightedSum / totalWeight) * 100);
  }

  // Hard fail penalty
  if (hardFail) {
    score = Math.min(score, 25);
  }

  // Boost schemes where most criteria matched perfectly
  const perfectMatches = dimensions.filter(d => d.score >= 0.9).length;
  if (!hardFail && perfectMatches >= 3 && score < 90) {
    score = Math.min(95, score + 8);
  }

  score = Math.max(0, Math.min(100, score));

  // Confidence labels with finer granularity
  let confidence: ConfidenceLabel;
  if (score >= 85) confidence = 'Strong Match';
  else if (score >= 65) confidence = 'Likely Eligible';
  else if (score >= 40) confidence = 'Possible Match';
  else confidence = 'Check Eligibility';

  if (reasons.length === 0) {
    reasons.push('Based on general eligibility criteria');
  }

  return {
    ...scheme,
    match_score: score,
    confidence,
    match_reasons: reasons,
    missing_documents: missing,
  };
}

interface ScoringDimension {
  weight: number;
  score: number; // 0-1
}

function getEducationBonus(education: string, roles: string[], category: string): number {
  const eduLower = education.toLowerCase();
  if (category === 'Education' || category === 'Scholarship') {
    if (eduLower.includes('10th') || eduLower.includes('12th') || eduLower.includes('graduate')) return 0.9;
  }
  if (roles.includes('student') && (eduLower.includes('10th') || eduLower.includes('12th'))) return 0.7;
  if (roles.includes('entrepreneur') && eduLower.includes('graduate')) return 0.5;
  return 0;
}

function getOccupationBonus(occupation: string, category: string, roles: string[]): number {
  const occLower = occupation.toLowerCase();
  if (category === 'Agriculture' && (occLower.includes('farm') || occLower.includes('agri'))) return 0.9;
  if (category === 'Employment' && (occLower.includes('unemploy') || occLower.includes('job'))) return 0.8;
  if (category === 'Entrepreneurship' && (occLower.includes('business') || occLower.includes('self'))) return 0.8;
  if (roles.includes('farmer') && occLower.includes('farm')) return 0.7;
  return 0;
}
