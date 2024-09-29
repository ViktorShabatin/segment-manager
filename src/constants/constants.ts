import { IDynamicRuleItem } from '../types.ts';

export const DYNAMIC_RULES = [
  {
    ruleName: 'Age',
    rules: [
      { label: 'age > 20', value: '> 20' },
      { label: 'age > 30', value: '> 30' },
      { label: 'age > 40', value: '> 40' },
      { label: 'age > 50', value: '> 50' },
      { label: 'age <= 20', value: '<= 20' },
      { label: 'age <= 30', value: '<= 30' },
      { label: 'age <= 40', value: '<= 40' },
      { label: 'age <= 50', value: '<= 50' },
    ],
  },
  {
    ruleName: 'Payer',
    rules: [
      { label: 'true', value: true },
      { label: 'false', value: false },
    ],
  },
  {
    ruleName: 'Payments',
    rules: [
      { label: '< 3', value: '< 3' },
      { label: '< 5', value: '< 5' },
      { label: '< 7', value: '< 7' },
      { label: '< 10', value: '< 10' },
      { label: '>= 3', value: '>= 3' },
      { label: '>= 5', value: '>= 5' },
      { label: '>= 7', value: '>= 7' },
      { label: '>= 10', value: '>= 10' },
    ],
  },
] as IDynamicRuleItem[];
