import GroupList from '../GroupList/GroupList.tsx';
import { IDynamicRuleItem } from '../../types.ts';
import useSegmentationForm from './useSegmentManager.ts';

import './styles.css';

interface RuleBuilderComponentProps {
  rules: IDynamicRuleItem[];
}

const SegmentManager = ({ rules }: RuleBuilderComponentProps) => {
  const { handleSubmit } = useSegmentationForm();

  return (
    <div>
      <GroupList availableRules={rules} handleSubmit={handleSubmit} />
    </div>
  );
};

export default SegmentManager;
