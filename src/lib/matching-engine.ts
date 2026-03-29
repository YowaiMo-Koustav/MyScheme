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
  let totalWeight = 0;
  let earnedWeight = 0;
  const reasons: string[] = [];
  const missing: string[] = [];
  let hardFail = false;

  // Role match (weight: 25)
  if (rules.roles && rules.roles.length > 0) {
    totalWeight += 25;
    if (profile.selected_roles && profile.selected_roles.length > 0) {
      const overlap = rules.roles.filter(r => profile.selected_roles!.includes(r));
      if (overlap.length > 0) {
        earnedWeight += 25;
        reasons.push(`Matches your role: ${overlap.join(', ')}`);
      }
    }
  }

  // Age check (weight: 20)
  if (rules.min_age || rules.max_age) {
    totalWeight += 20;
    if (profile.age !== undefined) {
      const ageOk = (!rules.min_age || profile.age >= rules.min_age) &&
                     (!rules.max_age || profile.age <= rules.max_age);
      if (ageOk) {
        earnedWeight += 20;
        reasons.push(`Age ${profile.age} is within eligible range (${rules.min_age || '—'}–${rules.max_age || '—'})`);
      } else {
        hardFail = true;
        reasons.push(`Age requirement: ${rules.min_age || '—'}–${rules.max_age || '—'} years`);
      }
    } else {
      earnedWeight += 10; // partial credit when unknown
    }
  }

  // Gender (weight: 15)
  if (rules.gender && rules.gender.length > 0) {
    totalWeight += 15;
    if (profile.gender) {
      if (rules.gender.includes(profile.gender)) {
        earnedWeight += 15;
        reasons.push('Gender eligibility met');
      } else {
        hardFail = true;
      }
    } else {
      earnedWeight += 7;
    }
  }

  // Income (weight: 20)
  if (rules.income_max) {
    totalWeight += 20;
    if (profile.income !== undefined) {
      if (profile.income <= rules.income_max) {
        earnedWeight += 20;
        reasons.push(`Income within ₹${(rules.income_max / 100000).toFixed(1)}L limit`);
      } else {
        hardFail = true;
        reasons.push(`Income exceeds ₹${(rules.income_max / 100000).toFixed(1)}L limit`);
      }
    } else {
      earnedWeight += 10;
    }
  }

  // Caste (weight: 10)
  if (rules.caste_category && rules.caste_category.length > 0) {
    totalWeight += 10;
    if (profile.caste_category) {
      if (rules.caste_category.includes(profile.caste_category)) {
        earnedWeight += 10;
        reasons.push(`${profile.caste_category} category eligible`);
      }
    } else {
      earnedWeight += 5;
    }
  }

  // Disability (weight: 10)
  if (rules.disability !== undefined) {
    totalWeight += 10;
    if (profile.disability_status !== undefined) {
      if (rules.disability === profile.disability_status) {
        earnedWeight += 10;
        reasons.push('Disability status matches requirement');
      } else {
        hardFail = true;
      }
    } else {
      earnedWeight += 5;
    }
  }

  // State (weight: 10)
  if (rules.states && rules.states.length > 0) {
    totalWeight += 10;
    if (profile.state) {
      if (rules.states.includes(profile.state)) {
        earnedWeight += 10;
        reasons.push(`Available in ${profile.state}`);
      } else {
        hardFail = true;
      }
    } else {
      earnedWeight += 5;
    }
  }

  // Calculate percentage score
  let score: number;
  if (totalWeight === 0) {
    score = 60; // general scheme with no specific criteria
    reasons.push('Open to all eligible citizens');
  } else {
    score = Math.round((earnedWeight / totalWeight) * 100);
  }

  // Penalize hard fails significantly
  if (hardFail) {
    score = Math.min(score, 35);
  }

  score = Math.max(0, Math.min(100, score));

  // Confidence label
  let confidence: ConfidenceLabel;
  if (score >= 80) confidence = 'Strong Match';
  else if (score >= 60) confidence = 'Likely Eligible';
  else if (score >= 40) confidence = 'Possible Match';
  else confidence = 'Check Eligibility';

  if (reasons.length === 0) {
    reasons.push('Based on general eligibility criteria');
  }

  // Identify missing documents based on profile gaps
  if (!profile.income && rules.income_max) missing.push('Income certificate');
  if (!profile.caste_category && rules.caste_category) missing.push('Caste certificate');
  if (!profile.state && rules.states) missing.push('Domicile certificate');

  return {
    ...scheme,
    match_score: score,
    confidence,
    match_reasons: reasons,
    missing_documents: missing,
  };
}
