import { FC } from 'react';
import SegmentManager from './components/SegmentManager/SegmentManager.tsx';
import { DYNAMIC_RULES } from './constants/constants';

const App: FC = () => (
  <div className="rule-builder-container">
    <h1>Segment Manager</h1>
    <SegmentManager rules={DYNAMIC_RULES} />
  </div>
);

export default App;
