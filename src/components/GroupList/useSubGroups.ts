import { useCallback } from 'react';
import { RuleGroup, RuleGroup as RuleGroupType } from '../../types.ts';
import { v4 as uuidv4 } from 'uuid';

export default (group: RuleGroup, onChange: (group: RuleGroup) => void) => {
  const handleAddSubGroup = useCallback(
    (ruleId: string) => {
      const newSubGroup: RuleGroupType = {
        _id: uuidv4(),
        operator: 'AND',
        rules: [
          {
            _id: uuidv4(),
            field: '',
            value: '',
            operator: null,
            subGroups: [],
          },
        ],
      };
      const updatedRules = [...group.rules];
      const rule = updatedRules.find((rule) => rule._id === ruleId);

      if (rule) {
        rule.subGroups.push(newSubGroup);
        onChange({ ...group, rules: updatedRules });
      }
    },
    [group, onChange]
  );

  const handleSubGroupChange = (
    ruleIndex: number,
    subGroupIndex: number,
    updatedSubGroup: RuleGroupType
  ) => {
    const updatedRules = [...group.rules];
    updatedRules[ruleIndex].subGroups![subGroupIndex] = updatedSubGroup;
    onChange({ ...group, rules: updatedRules });
  };

  const handleRemoveSubGroup = (ruleIndex: number, subGroupIndex: number) => {
    const updatedRules = [...group.rules];
    updatedRules[ruleIndex].subGroups = updatedRules[
      ruleIndex
    ].subGroups!.filter((_, i) => i !== subGroupIndex);
    onChange({ ...group, rules: updatedRules });
  };

  return {
    handleAddSubGroup,
    handleSubGroupChange,
    handleRemoveSubGroup,
  };
};
