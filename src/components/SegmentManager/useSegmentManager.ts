import { useCallback } from 'react';
import { RuleGroup as RuleGroupType } from '../../types.ts';
import { RuleProcessor } from '../../services/ruleProcessor.ts';

const useRuleBuilder = () => {
  const handleSubmit = useCallback((groups: RuleGroupType[]) => {
    const processor = new RuleProcessor();
    try {
      const result = processor.processGroups(groups);
      console.log('Result:', result);
    } catch (err) {
      console.error('Process Error', err);
    }
  }, []);

  return { handleSubmit };
};

export default useRuleBuilder;
