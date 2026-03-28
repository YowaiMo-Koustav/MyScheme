export type SchemeCategory =
  | 'education'
  | 'agriculture'
  | 'women_child'
  | 'employment'
  | 'health'
  | 'housing'
  | 'financial_inclusion'
  | 'social_security'
  | 'disability'
  | 'entrepreneurship';

export type UserRole =
  | 'student'
  | 'individual'
  | 'worker'
  | 'farmer'
  | 'entrepreneur'
  | 'woman'
  | 'senior_citizen'
  | 'disabled';

export type ConfidenceLabel = 'Strong Match' | 'Likely Eligible' | 'Possible Match' | 'Check Eligibility';

export type SavedSchemeStatus = 'to_apply' | 'applied' | 'received';

export interface EligibilityRules {
  min_age?: number;
  max_age?: number;
  gender?: string[];
  income_max?: number;
  education?: string[];
  occupation?: string[];
  caste_category?: string[];
  states?: string[];
  disability?: boolean;
  marital_status?: string[];
  roles?: UserRole[];
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  category: SchemeCategory;
  benefit_amount: string;
  benefit_type: string;
  eligibility_rules: EligibilityRules;
  required_documents: string[];
  application_link: string;
  deadline: string | null;
  source_url: string;
  last_updated: string;
  state_specific: string | null;
  is_active: boolean;
  application_difficulty: 'easy' | 'medium' | 'hard';
  ministry: string;
}

export interface MatchedScheme extends Scheme {
  match_score: number;
  confidence: ConfidenceLabel;
  match_reasons: string[];
  missing_documents: string[];
}

export interface UserProfile {
  selected_roles: UserRole[];
  state: string;
  age: number;
  gender: string;
  income: number;
  education: string;
  occupation: string;
  caste_category: string;
  disability_status: boolean;
  family_situation: string;
  marital_status: string;
}

export interface MatcherQuestion {
  id: string;
  question: string;
  type: 'select' | 'number' | 'multi-select' | 'boolean';
  options?: { label: string; value: string }[];
  field: keyof UserProfile;
  sensitive?: boolean;
  skip_text?: string;
}
