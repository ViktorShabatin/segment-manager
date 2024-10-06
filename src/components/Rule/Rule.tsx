import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import { IDynamicRuleItem } from '../../types.ts';
import useStrategy from './strategies/useStrategy.ts';
import { ExtendedInputRule } from './strategies/ExtendedInputRenderStrategy/ExtendedInputRenderStrategy.tsx';
import { SelectRule } from './strategies/SelectRenderStrategy/SelectRenderStrategy.tsx';
import { CheckboxRule } from './strategies/CheckboxRenderStrategy/CheckboxRenderStrategy.tsx';
import RuleTypeSelector from './components/RuleTypeSelector/RuleTypeSelector.tsx';
import { RuleComponentType } from './strategies/types.ts';
import { InputRule } from './strategies/InputRenderStrategy/InputRenderStrategy.tsx';

import './styles.css';

interface RuleProps {
  rule: RuleComponentType;
  onChange: (updatedRule: RuleComponentType) => void;
  onRemove: (ruleId: string) => void;
  availableRules: IDynamicRuleItem[];
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
  const { getStrategy } = useStrategy();

  const handleRuleTypeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const selectedField: string = e.target.value;

      const selectedRule: IDynamicRuleItem | undefined = availableRules.find(
        (r) => r.ruleName === selectedField
      );

      if (!selectedRule) return;

      const commonProps = { ...rule, field: selectedField };
      let updatedRule;

      switch (selectedRule.type) {
        case 'input':
          updatedRule = { ...commonProps, value: '' } as InputRule;
          break;
        case 'extendedInput':
          updatedRule = {
            ...commonProps,
            condition:
              selectedRule.rules.length > 0 ? selectedRule.rules[0].value : '',
            value: '',
          } as ExtendedInputRule;
          break;
        case 'select':
          updatedRule = {
            ...commonProps,
            value:
              selectedRule.rules.length > 0 ? selectedRule.rules[0].value : '',
          } as SelectRule;
          break;
        case 'checkbox':
          updatedRule = {
            ...commonProps,
            value: Boolean((e.target as HTMLInputElement).checked),
          } as CheckboxRule;
          break;
        default:
          return;
      }

      onChange(updatedRule);
    },
    [availableRules, rule, onChange]
  );

  const currentRuleOptions = useMemo(() => {
    return availableRules.find((r) => r.ruleName === rule.field) || null;
  }, [rule]);

  const StrategyComponent = currentRuleOptions
    ? getStrategy(currentRuleOptions.type)
    : null;

  return (
    <div className="rule-container">
      <RuleTypeSelector
        field={rule.field}
        availableRules={availableRules}
        onChange={handleRuleTypeChange}
      />

      {StrategyComponent && (
        <StrategyComponent
          rule={rule}
          onChange={onChange}
          options={currentRuleOptions?.rules}
        />
      )}

      {isRemovable && (
        <button
          className="rule-remove-button"
          onClick={() => onRemove(rule._id)}
        >
          Remove Rule
        </button>
      )}

      {!isSubGroup && (rule.operator === 'AND' || rule.operator === null) && (
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
