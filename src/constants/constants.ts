import { IDynamicRuleItem } from '../types.ts';

const SIGN_OPERATORS = [
  { label: '>', value: '>' },
  { label: '>=', value: '>=' },
  { label: '=', value: '=' },
  { label: '<=', value: '<=' },
  { label: '<', value: '<' },
];

export const DYNAMIC_RULES = [
  {
    ruleName: 'age',
    type: 'extendedInput',
    rules: SIGN_OPERATORS,
  },
  {
    ruleName: 'payer',
    type: 'input',
  },
  {
    ruleName: 'payments',
    type: 'extendedInput',
    rules: SIGN_OPERATORS,
  },
  {
    ruleName: 'region',
    type: 'select',
    rules: [
      { label: 'Europe', value: 'europe' },
      { label: 'Asia', value: 'asia' },
    ],
  },
  {
    ruleName: 'active',
    type: 'checkbox',
  },
] as IDynamicRuleItem[];
