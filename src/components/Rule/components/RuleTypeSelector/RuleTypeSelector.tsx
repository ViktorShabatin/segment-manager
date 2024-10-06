import { ChangeEvent, memo } from 'react';
import { IDynamicRuleItem } from '../../../../types.ts';

interface IProps {
  availableRules: IDynamicRuleItem[];
  field: string;
  onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

const RuleTypeSelector = ({ availableRules, field, onChange }: IProps) => {
  return (
    <select className="rule-field-select" value={field} onChange={onChange}>
      <option className="rule-option" value="">
        Select Rule
      </option>
      {availableRules.map((r) => (
        <option className="rule-option" key={r.ruleName} value={r.ruleName}>
          {r.ruleName}
        </option>
      ))}
    </select>
  );
};

export default memo(RuleTypeSelector);
