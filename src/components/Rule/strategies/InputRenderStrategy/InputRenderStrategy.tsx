import { memo, ChangeEvent } from 'react';
import { Operator, RuleGroup } from '../../../../types.ts';

export interface InputRule {
  _id: string;
  field: string;
  value: number;
  operator: Operator;
  subGroups?: RuleGroup[];
}

interface ExtendedInputRenderStrategyProps {
  rule: InputRule;
  onChange: (updatedRule: InputRule) => void;
}

const InputRenderStrategy = ({
  rule,
  onChange,
}: ExtendedInputRenderStrategyProps) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...rule, value: e.target.value });
  };

  return (
    <div className="rule-input-container">
      <input
        className="rule-value-input"
        type="text"
        value={rule.value}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default memo(InputRenderStrategy);
