import { memo, ChangeEvent } from 'react';
import { Operator, RuleGroup } from '../../../../types.ts';

export interface ExtendedInputRule {
  _id: string;
  field: string;
  value: number;
  operator: Operator;
  condition: string;
  subGroups?: RuleGroup[];
}

interface Option {
  value: string;
  label: string;
}

interface ExtendedInputRenderStrategyProps {
  rule: ExtendedInputRule;
  onChange: (updatedRule: ExtendedInputRule) => void;
  options: Option[];
}

const ExtendedInputRenderStrategy = ({
  rule,
  onChange,
  options,
}: ExtendedInputRenderStrategyProps) => {
  const handleOperatorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...rule, condition: e.target.value });
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...rule, value: Number(e.target.value) });
  };

  return (
    <div className="rule-input-container">
      <select
        className="rule-operator-field-select rule-value-select"
        value={rule.condition}
        onChange={handleOperatorChange}
      >
        {options.map((option) => (
          <option
            className="rule-value-select rule-operator-value-select"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <input
        className="rule-value-input"
        type="number"
        value={rule.value}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default memo(ExtendedInputRenderStrategy);
