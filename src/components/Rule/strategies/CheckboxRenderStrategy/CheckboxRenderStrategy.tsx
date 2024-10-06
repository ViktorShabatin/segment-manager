import { memo, ChangeEvent } from 'react';
import { Operator, RuleGroup } from '../../../../types.ts';

export interface CheckboxRule {
  _id: string;
  field: string;
  value: boolean;
  operator?: Operator;
  subGroups?: RuleGroup[];
}

interface CheckboxRenderStrategyProps {
  rule: CheckboxRule;
  onChange: (updatedRule: CheckboxRule) => void;
}

const CheckboxRenderStrategy = ({
  rule,
  onChange,
}: CheckboxRenderStrategyProps) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...rule, value: e.target.checked });
  };

  return (
    <div className="rule-checkbox-container">
      <input
        className="rule-checkbox"
        type="checkbox"
        checked={rule.value}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default memo(CheckboxRenderStrategy);
