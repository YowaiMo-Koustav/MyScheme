import { Scheme, MatchedScheme, UserProfile, ConfidenceLabel } from '@/types/scheme';

export function matchSchemes(profile: Partial<UserProfile>, schemes: Scheme[]): MatchedScheme[] {
  return schemes
    .filter(s => s.is_active)
    .map(scheme => scoreScheme(profile, scheme))
    .filter(m => m.match_score > 20)
    .sort((a, b) => b.match_score - a.match_score);
}

function scoreScheme(profile: Partial<UserProfile>, scheme: Scheme): MatchedScheme {
  const rules = scheme.eligibility_rules;
  let score = 50; // base
  const reasons: string[] = [];
  const missing: string[] = [];
  let totalCriteria = 0;
  let metCriteria = 0;

  // Role match
  if (rules.roles && profile.selected_roles) {
    totalCriteria++;
    const overlap = rules.roles.filter(r => profile.selected_roles!.includes(r));
    if (overlap.length > 0) {
      score += 20;
      metCriteria++;
      reasons.push(`Matches your role: ${overlap.join(', ')}`);
    } else {
      score -= 15;
    }
  }

  // Age check
  if (profile.age !== undefined) {
    if (rules.min_age || rules.max_age) {
      totalCriteria++;
      const ageOk = (!rules.min_age || profile.age >= rules.min_age) &&
                     (!rules.max_age || profile.age <= rules.max_age);
      if (ageOk) {
        score += 10;
        metCriteria++;
        reasons.push(`Age ${profile.age} is within eligible range`);
      } else {
        score -= 30;
        reasons.push(`Age requirement: ${rules.min_age || '—'}–${rules.max_age || '—'} years`);
      }
    }
  }

  // Gender
  if (rules.gender && profile.gender) {
    totalCriteria++;
    if (rules.gender.includes(profile.gender)) {
      score += 10;
      metCriteria++;
      reasons.push('Gender eligibility met');
    } else {
      score -= 25;
    }
  }

  // Income
  if (rules.income_max && profile.income !== undefined) {
    totalCriteria++;
    if (profile.income <= rules.income_max) {
      score += 15;
      metCriteria++;
      reasons.push(`Income within ₹${(rules.income_max / 100000).toFixed(1)}L limit`);
    } else {
      score -= 30;
      reasons.push(`Income exceeds ₹${(rules.income_max / 100000).toFixed(1)}L limit`);
    }
  }

  // Caste
  if (rules.caste_category && profile.caste_category) {
    totalCriteria++;
    if (rules.caste_category.includes(profile.caste_category)) {
      score += 10;
      metCriteria++;
      reasons.push(`${profile.caste_category} category eligible`);
    } else {
      score -= 20;
    }
  }

  // Disability
  if (rules.disability !== undefined && profile.disability_status !== undefined) {
    totalCriteria++;
    if (rules.disability === profile.disability_status) {
      score += 15;
      metCriteria++;
      reasons.push('Disability status matches requirement');
    } else {
      score -= 30;
    }
  }

  // State
  if (rules.states && profile.state) {
    totalCriteria++;
    if (rules.states.includes(profile.state)) {
      score += 10;
      metCriteria++;
      reasons.push(`Available in ${profile.state}`);
    } else {
      score -= 20;
    }
  }

  // Clamp
  score = Math.max(0, Math.min(100, score));

  // Confidence label
  let confidence: ConfidenceLabel;
  if (score >= 80) confidence = 'Strong Match';
  else if (score >= 60) confidence = 'Likely Eligible';
  else if (score >= 40) confidence = 'Possible Match';
  else confidence = 'Check Eligibility';

  // Missing documents
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
