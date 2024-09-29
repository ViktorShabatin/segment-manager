export type Operator = 'AND' | 'OR' | null;

export interface Rule {
  _id: string;
  field: string;
  value: string;
  operator: Operator;
  subGroups: RuleGroup[];
}

export interface RuleGroup {
  _id: string;
  operator: Operator;
  rules: Rule[];
}

export interface ISelectOptionItem {
  label: string;
  value: string;
}

export interface IDynamicRuleItem {
  ruleName: string;
  rules: ISelectOptionItem[];
}
