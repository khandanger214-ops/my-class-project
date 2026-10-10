import { ScenarioCategory } from '../types/decision';

interface ClassificationResult {
  category: ScenarioCategory;
  categoryLabel: string;
  matchedKeywords: string[];
  isCustomFallback: boolean;
}

const CATEGORY_KEYWORDS: Record<Exclude<ScenarioCategory, 'general-decision'>, { label: string; keywords: string[] }> = {
  'used-car': {
    label: 'Used-Car Purchase',
    keywords: [
      'car', 'vehicle', 'used car', 'automobile', 'sedan', 'suv', 'truck',
      'mileage', 'odometer', 'dealership', 'dealer', 'vin', 'lemon',
      'mechanic', 'pre-owned', 'cpo', 'carmax', 'test drive', 'transmission'
    ]
  },
  'city-relocation': {
    label: 'Relocating to Another City for Work',
    keywords: [
      'moving', 'relocating', 'relocate', 'relocation', 'new city', 'another city',
      'interstate', 'cross-country move', 'moving for work', 'moving out of state',
      'cost of living', 'packing up', 'movers'
    ]
  },
  'apartment-rental': {
    label: 'Renting an Apartment or Home',
    keywords: [
      'apartment', 'rent', 'renting', 'lease', 'tenant', 'landlord', 'sublet',
      'security deposit', 'studio', 'roommate', 'property manager', 'rental unit',
      'broker fee', 'eviction', 'renters insurance'
    ]
  },
  'small-business': {
    label: 'Starting a Small Business',
    keywords: [
      'business', 'startup', 'llc', 'founding', 'sole proprietorship', 'commercial',
      'store', 'ecommerce', 'clients', 'incorporate', 'freelance agency', 'venture',
      'business plan', 'revenue model', 'wholesale', 'inventory'
    ]
  },
  'job-internship-offer': {
    label: 'Accepting an Internship or Job Offer',
    keywords: [
      'job offer', 'internship', 'job', 'offer letter', 'salary', 'compensation',
      'promotion', 'equity', 'stock options', 'bonus', 'new role', 'signing bonus',
      'switching jobs', 'two job offers', 'counteroffer', 'benefits package'
    ]
  }
};

export function classifyScenario(inputText: string): ClassificationResult {
  const normalized = inputText.toLowerCase().trim();

  let bestMatch: Exclude<ScenarioCategory, 'general-decision'> | null = null;
  let maxScore = 0;
  let matchedWords: string[] = [];

  // Check specific categories
  (Object.keys(CATEGORY_KEYWORDS) as Array<Exclude<ScenarioCategory, 'general-decision'>>).forEach((cat) => {
    const { keywords } = CATEGORY_KEYWORDS[cat];
    let score = 0;
    const currentMatches: string[] = [];

    keywords.forEach((kw) => {
      // Check multi-word keywords first (given higher weight)
      if (kw.includes(' ')) {
        if (normalized.includes(kw)) {
          score += 4;
          currentMatches.push(kw);
        }
      } else {
        // Regex word boundary matching to avoid partial word collisions
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(normalized)) {
          score += 2;
          currentMatches.push(kw);
        }
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestMatch = cat;
      matchedWords = currentMatches;
    }
  });

  // If score is high enough, return matched category
  if (bestMatch && maxScore >= 2) {
    const matched = bestMatch as keyof typeof CATEGORY_KEYWORDS;
    return {
      category: matched,
      categoryLabel: CATEGORY_KEYWORDS[matched].label,
      matchedKeywords: matchedWords,
      isCustomFallback: false
    };
  }

  // Otherwise, classify as general custom decision
  return {
    category: 'general-decision',
    categoryLabel: 'General Custom Decision',
    matchedKeywords: [],
    isCustomFallback: true
  };
}

export interface ScenarioValidationResult {
  isValid: boolean;
  error: string | null;
}

/**
 * Validates user scenario input against empty, whitespace-only, or malformed (symbol/number-only) strings.
 * Preserves user input and returns an understandable recovery message when invalid.
 */
export function validateScenarioInput(
  inputText: string,
  mode: 'decision' | 'route' = 'decision'
): ScenarioValidationResult {
  const trimmed = inputText.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error:
        mode === 'route'
          ? 'Please describe a process or goal to build an action route.'
          : 'Please describe a decision or dilemma to analyze.'
    };
  }

  // Count alphabetic letters (including international letters)
  const letterMatches = trimmed.match(/[a-zA-Z\u00C0-\u024F]/g);
  const letterCount = letterMatches ? letterMatches.length : 0;

  if (trimmed.length < 4 || letterCount < 3) {
    return {
      isValid: false,
      error:
        'Please enter a clear, descriptive phrase (at least a few words with letters) rather than only symbols, punctuation, or single characters.'
    };
  }

  return {
    isValid: true,
    error: null
  };
}

