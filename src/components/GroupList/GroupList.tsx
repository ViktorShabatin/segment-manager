import OperatorSelector from '../OperatorSelector/OperatorSelector.tsx';
import RuleGroup from '../RuleGroup/RuleGroup.tsx';
import useGroups from './useGroups.ts';
import { IDynamicRuleItem, RuleGroup as RuleGroupType } from '../../types.ts';

interface IProps {
  availableRules: IDynamicRuleItem[];
  handleSubmit: (groups: RuleGroupType[]) => void;
}

export const GroupList = ({ availableRules, handleSubmit }: IProps) => {
  const {
    groups,
    handleOperatorChange,
    handleChangeGroup,
    handleRemoveGroup,
    handleAddGroup,
  } = useGroups();

  return (
    <>
      {groups.map((group, index) => (
        <div key={group._id}>
          {index > 0 && (
            <OperatorSelector
              value={group.operator || 'AND'}
              onChange={(operator) => handleOperatorChange(group._id, operator)}
            />
          )}
          <RuleGroup
            group={group}
            availableRules={availableRules}
            onChange={handleChangeGroup}
            onRemove={handleRemoveGroup}
            isRemovable={groups.length > 1}
          />
        </div>
      ))}
      <div className="rule-builder-buttons-container">
        <button
          className="rule-builder-button add-group-button"
          onClick={handleAddGroup}
        >
          Add Group
        </button>
        <button
          className="rule-builder-button submit-button"
          onClick={() => handleSubmit(groups)}
        >
          Submit Rules
        </button>
      </div>
    </>
  );
};

export default GroupList;
