import { memo } from 'react';
import OperatorSelector from '../OperatorSelector/OperatorSelector';
import Rule from '../Rule/Rule';
import { RuleGroup as RuleGroupType } from '../../types.ts';
import useRule from '../Rule/useRule.ts';
import useSubGroups from '../GroupList/useSubGroups.ts';

import './styles.css';

interface RuleGroupProps {
  group: RuleGroupType;
  onChange: (updatedGroup: RuleGroupType) => void;
  onRemove: (groupId: string) => void;
  availableRules: {
    ruleName: string;
    rules: { value: string; label: string }[];
  }[];
  isRemovable: boolean;
  isSubGroup: boolean;
}

const RuleGroup = ({
  group,
  onChange,
  onRemove,
  availableRules,
  isRemovable,
  isSubGroup,
}: RuleGroupProps) => {
  const {
    handleOperatorChange,
    handleRuleChange,
    handleRemoveRule,
    handleAddRule,
  } = useRule(group, onChange);

  const { handleAddSubGroup, handleSubGroupChange, handleRemoveSubGroup } =
    useSubGroups(group, onChange);

  return (
    <div className="rule-group-container">
      {group.rules.map((rule, ruleIndex) => (
        <div className="rule-group-rule" key={rule._id}>
          {ruleIndex > 0 && rule.operator !== null && (
            <OperatorSelector
              value={rule.operator}
              onChange={(operator) => handleOperatorChange(rule._id, operator)}
            />
          )}
          <Rule
            rule={rule}
            availableRules={availableRules}
            onChange={handleRuleChange}
            onRemove={handleRemoveRule}
            onAddSubGroup={handleAddSubGroup}
            isRemovable={group.rules.length > 1}
            isSubGroup={isSubGroup}
          />

          {rule.subGroups.map((subGroup, subGroupIndex) => (
            <div className="rule-group-subgroup" key={subGroup._id}>
              {subGroupIndex > 0 && (
                <OperatorSelector
                  value={subGroup.operator}
                  onChange={(operator) =>
                    handleSubGroupChange(ruleIndex, subGroupIndex, {
                      ...subGroup,
                      operator,
                    })
                  }
                />
              )}
              <RuleGroup
                group={subGroup}
                availableRules={availableRules}
                onChange={(updatedSubGroup) =>
                  handleSubGroupChange(
                    ruleIndex,
                    subGroupIndex,
                    updatedSubGroup
                  )
                }
                onRemove={() => handleRemoveSubGroup(ruleIndex, subGroupIndex)}
                isRemovable
                isSubGroup
              />
            </div>
          ))}
        </div>
      ))}
      <div className="rule-group-buttons-container">
        <button
          type="button"
          className="rule-group-add-rule-button"
          onClick={handleAddRule}
        >
          Add Rule
        </button>
        {isRemovable && (
          <button
            type="button"
            className="rule-group-remove-button"
            onClick={() => onRemove(group._id)}
          >
            Remove Group
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(RuleGroup);
