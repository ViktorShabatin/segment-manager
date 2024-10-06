import { useCallback, useState } from 'react';
import { RuleGroup as RuleGroupType } from '../../types.ts';
import { v4 as uuidv4 } from 'uuid';

export default () => {
  const [groups, setGroups] = useState<RuleGroupType[]>([
    {
      _id: uuidv4(),
      operator: null,
      rules: [
        { _id: uuidv4(), field: '', value: '', operator: null, subGroups: [] },
      ],
      subGroups: [],
    },
  ]);

  const handleChangeGroup = useCallback((updatedGroup: RuleGroupType) => {
    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      const groupIndex = updatedGroups.findIndex(
        ({ _id }) => _id === updatedGroup._id
      );

      if (groupIndex >= 0) {
        updatedGroups[groupIndex] = updatedGroup;
      }

      return updatedGroups;
    });
  }, []);

  const handleOperatorChange = useCallback(
    (groupId: string, operator: string | null) => {
      setGroups((prevGroups) => {
        const updatedGroups = [...prevGroups];
        const groupIndex = updatedGroups.findIndex(
          ({ _id }) => _id === groupId
        );

        if (groupIndex >= 0) {
          updatedGroups[groupIndex] = {
            ...updatedGroups[groupIndex],
            operator,
          } as RuleGroupType;
        }

        return updatedGroups;
      });
    },
    []
  );

  const handleRemoveGroup = useCallback((groupId: string) => {
    setGroups((prevGroups) => prevGroups.filter(({ _id }) => _id !== groupId));
  }, []);

  const handleAddGroup = () => {
    const newGroup: RuleGroupType = {
      _id: uuidv4(),
      operator: 'AND',
      rules: [
        { _id: uuidv4(), field: '', value: '', operator: null, subGroups: [] },
      ],
    };
    setGroups((prevState) => [...prevState, newGroup]);
  };

  return {
    groups,
    handleAddGroup,
    handleRemoveGroup,
    handleChangeGroup,
    handleOperatorChange,
  };
};
