import { memo, FC } from 'react';
import { Operator } from '../../types.ts';

import './styles.css';

interface OperatorSelectorProps {
  value: Operator;
  onChange: (operator: Operator) => void;
}

const OperatorSelector: FC<OperatorSelectorProps> = ({ value, onChange }) => (
  <div className="operator-container">
    <select
      className="operator-select"
      value={value as string}
      onChange={(e) => onChange(e.target.value as Operator)}
    >
      <option className="operator-option" value="AND">
        AND
      </option>
      <option className="operator-option" value="OR">
        OR
      </option>
    </select>
  </div>
);

export default memo(OperatorSelector);
