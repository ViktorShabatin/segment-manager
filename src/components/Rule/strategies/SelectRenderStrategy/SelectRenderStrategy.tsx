import { memo, ChangeEvent } from 'react';
import { Operator } from '../../../../types.ts';

export interface SelectRule {
  _id: string;
  field: string;
  value: string;
  operator?: Operator;
  subGroups?: [];
}

interface Option {
  value: string;
  label: string;
}

interface SelectRenderStrategyProps {
  rule: SelectRule;
  onChange: (updatedRule: SelectRule) => void;
  options: Option[];
}

const SelectRenderStrategy = ({
  rule,
  onChange,
  options,
}: SelectRenderStrategyProps) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...rule, value: e.target.value });
  };

  return (
    <div className="rule-select-container">
      <select
        className="rule-value-select"
        value={rule.value}
        onChange={handleSelectChange}
      >
        <option className="rule-option" value="">
          Select Condition
        </option>
        {options.map((option) => (
          <option
            className="rule-option"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SelectRenderStrategy);
