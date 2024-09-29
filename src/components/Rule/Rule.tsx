import { ChangeEvent, memo } from 'react';
import { ISelectOptionItem, Operator, RuleGroup } from '../../types.ts';

import './styles.css';

type RuleOption = {
  ruleName: string;
  rules: ISelectOptionItem[];
};

interface RuleProps {
  rule: {
    _id: string;
    field: string;
    value: string;
    operator: Operator;
    subGroups: RuleGroup[];
  };
  onChange: (updatedRule: any) => void;
  onRemove: (ruleId: string) => void;
  availableRules: RuleOption[];
  onAddSubGroup: (ruleId: string) => void;
  isRemovable: boolean;
  isSubGroup: boolean;
}

const Rule = ({
  rule,
  onChange,
  onRemove,
  availableRules,
  onAddSubGroup,
  isRemovable,
  isSubGroup,
}: RuleProps) => {
  const handleFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedField = e.target.value;
    const selectedRule = availableRules.find(
      (r) => r.ruleName === selectedField
    );
    onChange({
      ...rule,
      field: selectedField,
      value: selectedRule ? selectedRule.rules[0].value : '',
    });
  };

  const handleValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...rule, value: e.target.value });
  };

  const currentRuleOptions = availableRules.find(
    (r) => r.ruleName === rule.field
  );

  return (
    <div className="rule-container">
      <select
        className="rule-field-select"
        value={rule.field}
        onChange={handleFieldChange}
      >
        <option className="rule-option" value="">
          Select Rule
        </option>
        {availableRules.map((r) => (
          <option className="rule-option" key={r.ruleName} value={r.ruleName}>
            {r.ruleName}
          </option>
        ))}
      </select>

      {currentRuleOptions && (
        <select
          className="rule-value-select"
          value={rule.value}
          onChange={handleValueChange}
        >
          <option className="rule-option" value="">
            Select Condition
          </option>
          {currentRuleOptions.rules.map((option) => (
            <option
              className="rule-option"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      )}

      {isRemovable && (
        <button
          className="rule-remove-button"
          onClick={() => onRemove(rule._id)}
        >
          Remove Rule
        </button>
      )}

      {!isSubGroup && rule.operator === 'AND' && (
        <button
          className="rule-add-subgroup-button"
          onClick={() => onAddSubGroup(rule._id)}
        >
          Add Sub-Group
        </button>
      )}
    </div>
  );
};

export default memo(Rule);
