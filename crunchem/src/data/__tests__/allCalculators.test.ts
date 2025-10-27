import { describe, it, expect } from 'vitest';
import allCalculators, {
  getCalculatorsByCategory,
  searchCalculators
} from '../allCalculators';

const getCalculatorIds = (items: typeof allCalculators) => items.map(calc => calc.id);

describe('allCalculators utilities', () => {
  it('finds calculators by title search', () => {
    const results = searchCalculators('basic calculator');
    const ids = getCalculatorIds(results);

    expect(ids).toContain('basic-calculator');
    expect(results.length).toBeGreaterThan(0);
  });

  it('matches calculators by tag keywords', () => {
    const results = searchCalculators('arithmetic');
    const ids = getCalculatorIds(results);

    expect(ids).toContain('basic-calculator');
  });

  it('filters calculators by category', () => {
    const results = getCalculatorsByCategory('Physics');

    expect(results.length).toBeGreaterThan(0);
    expect(results.every(calc => calc.category === 'Physics')).toBe(true);
  });

  it('returns all calculators for empty queries', () => {
    const results = searchCalculators('   ');

    expect(results.length).toBe(allCalculators.length);
  });
});
