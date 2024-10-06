import {
  RuleComponentType,
  RuleType,
} from './components/Rule/strategies/types.ts';

export type Operator = 'AND' | 'OR' | null;

export interface RuleGroup {
  _id: string;
  operator: Operator;
  rules: RuleComponentType[];
}

export interface ISelectOptionItem {
  label: string;
  value: string;
}

export interface IDynamicRuleItem {
  ruleName: string;
  type: RuleType;
  rules: ISelectOptionItem[];
}
