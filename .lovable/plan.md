

# AI Government Scheme Matcher — "SchemeSync India"

## Overview
A premium, competition-worthy AI-powered platform that matches Indian citizens to government schemes through a cinematic UX and intelligent questionnaire. Built with Lovable Cloud (auth, database, AI matching via Lovable AI).

---

## Page 1: Cinematic Landing Page
- **Hero section**: Bold headline ("Find Your Government Scheme in 60 Seconds"), animated gradient background, floating glassmorphism scheme cards drifting subtly
- **Animated counters**: "2,500+ Schemes", "₹15L Cr+ in Benefits", "28 States Covered" with scroll-triggered count-up
- **Scroll story sections** (parallax + fade-in reveals):
  1. "The Problem" — millions miss benefits they're eligible for
  2. "How It Works" — 3-step visual (Answer → Match → Apply)
  3. "Who It's For" — role cards (Student, Farmer, Woman, etc.) with icons and hover effects
  4. "Trusted Sources" — logos of ministry sources, last-updated badge
- **Sticky CTA**: "Find My Scheme" button that follows scroll
- **Footer**: About, privacy, official source links

## Page 2: Auth + Role Selection
- Email/password authentication via Lovable Cloud
- After signup/login, a beautiful role selection screen with large illustrated cards for each role: Student, Individual, Worker, Farmer, Entrepreneur, Woman, Senior Citizen, Disabled Person
- Multi-select allowed (e.g., Woman + Student)
- Smooth transition into the matcher flow

## Page 3: AI Scheme Matcher Flow
- One question at a time, full-screen card UI with progress indicator
- Questions adapt dynamically based on previous answers (powered by Lovable AI edge function)
- Fields: State, Age, Gender, Income, Education, Occupation, Caste category, Disability status, Family situation, Marital status
- Instant visual feedback after each answer (checkmark animation, progress bar advance)
- ~8-12 questions total, adapting based on role
- "Skip" option on sensitive questions with explanation of impact
- Final step: "Analyzing your profile..." with animated loading sequence

## Page 4: Results Page
- Ranked scheme cards sorted by eligibility score (percentage match)
- Each card shows: Scheme name, benefit amount, confidence label, category badge, key eligibility reason
- Filter/sort bar: by category, benefit amount, application difficulty, deadline proximity
- "Why this matches you" expandable section per card
- Compare mode: select 2-3 schemes side-by-side
- Save/shortlist buttons on each card
- Search bar for manual scheme lookup

## Page 5: Scheme Detail Page
- Full scheme information: description, benefits, eligibility criteria, required documents checklist, application steps, deadline, official link
- "Your Match" section: why it matched, missing documents highlighted, confidence score
- "Apply Now" button linking to official portal
- Trust layer: source reference, last updated date, ministry name
- Share and save buttons

## Page 6: Saved Schemes Dashboard
- User's shortlisted/saved schemes in card grid
- Status tracking: "To Apply", "Applied", "Received"
- Filter by status and category
- Quick access to scheme details and application links
- Profile summary sidebar showing user's matcher answers

## Page 7: Admin / Scheme Upload Page
- Protected admin route (role-based access)
- Form to add/edit scheme data: name, description, eligibility rules, benefits, documents, links, deadlines, category, state
- Bulk import option (JSON format)
- View all schemes in a searchable table
- Toggle scheme active/inactive status

---

## Database Schema (Lovable Cloud)
- **profiles**: user_id, selected_roles, state, age, gender, income, education, occupation, caste_category, disability_status, family_situation
- **schemes**: id, name, description, category, benefit_amount, benefit_type, eligibility_rules (JSON), required_documents, application_link, deadline, source_url, last_updated, state_specific, is_active
- **user_saved_schemes**: user_id, scheme_id, status (to_apply/applied/received), saved_at
- **user_roles**: user_id, role (admin/user)
- **matcher_sessions**: user_id, answers (JSON), results (JSON), created_at

## AI Integration (Lovable AI)
- Edge function for dynamic question generation based on user profile
- Edge function for scheme matching & scoring — takes user answers + scheme database, returns ranked results with explanations
- Confidence scoring system with labels: "Strong Match", "Likely Eligible", "Possible Match", "Check Eligibility"

## Design System
- Modern gov-tech aesthetic: deep navy/indigo primary, warm amber accents, clean white backgrounds
- Glassmorphism cards with soft shadows and subtle blur
- Inter/Plus Jakarta Sans typography
- Smooth scroll animations, parallax, fade-in reveals
- Mobile-first responsive design
- Accessibility: proper contrast, focus states, screen reader support

## Scheme Data
- 30+ real Indian government schemes across categories: Education, Agriculture, Women & Child, Employment, Health, Housing, Financial Inclusion, Social Security, Disability, Entrepreneurship
- Real eligibility criteria, benefit amounts, and official links

