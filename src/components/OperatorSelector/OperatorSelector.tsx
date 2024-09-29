import { memo, FC } from 'react';
import { Operator } from '../../types.ts';

import './styles.css';

type NotNullableOperator = NonNullable<Operator>;

interface OperatorSelectorProps {
  value: NotNullableOperator;
  onChange: (operator: NotNullableOperator) => void;
}

const OperatorSelector: FC<OperatorSelectorProps> = ({ value, onChange }) => (
  <div className="operator-container">
    <select
      className="operator-select"
      value={value}
      onChange={(e) => onChange(e.target.value as NotNullableOperator)}
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
