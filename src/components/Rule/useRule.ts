import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Operator, RuleComponentType, RuleGroup } from '../../types.ts';

export default (group: RuleGroup, onChange: (group: RuleGroup) => void) => {
  const handleAddRule = () => {
    const newRule: RuleComponentType = {
      _id: uuidv4(),
      field: '',
      value: '',
      operator: 'AND',
      subGroups: [],
    };
    onChange({ ...group, rules: [...group.rules, newRule] });
  };

  const handleRuleChange = useCallback(
    (updatedRule: RuleComponentType) => {
      const updatedRules = [...group.rules];
      const ruleIndex = updatedRules.findIndex(
        (rule) => rule._id === updatedRule._id
      );

      if (ruleIndex !== -1) {
        updatedRules[ruleIndex] = updatedRule;
        onChange({ ...group, rules: updatedRules });
      }
    },
    [group, onChange]
  );

  const handleRemoveRule = useCallback(
    (ruleId: string) => {
      const updatedRules = group.rules.filter(({ _id }) => _id !== ruleId);
      onChange({ ...group, rules: updatedRules });
    },
    [group, onChange]
  );

  const handleOperatorChange = useCallback(
    (ruleId: string, operator: Operator) => {
      const updatedRules = [...group.rules];
      const rule = updatedRules.find((rule) => rule._id === ruleId);

      if (rule) {
        if (operator === 'OR') {
          rule.subGroups = [];
        }

        rule.operator = operator;
        onChange({ ...group, rules: updatedRules });
      }
    },
    [group, onChange]
  );

  return {
    handleAddRule,
    handleRuleChange,
    handleRemoveRule,
    handleOperatorChange,
  };
};
