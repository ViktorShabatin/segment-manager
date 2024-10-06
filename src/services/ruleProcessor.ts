import { RuleGroup } from '../types.ts';

export class RuleProcessor {
  processGroups(groups: RuleGroup[]): string {
    console.log('example: ', this.convertFullRulesToString({ groups }));
    return JSON.stringify(this.convertGroupsToJSON(groups), null, 2);
  }

  private convertRuleToString(
    rule: any,
    isBooleanValue: boolean = false
  ): string {
    const conditionSymbol = rule.condition ? ` ${rule.condition} ` : ' ';
    return `${rule.field}${conditionSymbol}${isBooleanValue ? '= ' : ''}${rule.value}`;
  }

  private convertGroupToString(group: RuleGroup): string {
    let result = '';

    group.rules.forEach((rule, index) => {
      if (!rule.field || rule.field.trim() === '') {
        throw new Error('Validation error!');
      }

      if (index > 0 && rule.operator) {
        result += ` ${rule.operator} `;
      }

      const isBooleanValue = ['true', 'false'].includes(
        String(rule.value).toLowerCase()
      );

      if (rule.subGroups && rule.subGroups.length > 0) {
        const subGroupString = rule.subGroups
          .map((subGroup) => this.convertGroupToString(subGroup))
          .join(` ${rule.operator || 'AND'} `);
        result += `(${this.convertRuleToString(rule)} AND (${subGroupString}))`;
      } else {
        result += this.convertRuleToString(rule, isBooleanValue);
      }
    });

    return result;
  }

  private convertFullRulesToString(rulesObject: {
    groups: RuleGroup[];
  }): string {
    let result = '';

    rulesObject.groups.forEach((group, index) => {
      if (index > 0 && group.operator) {
        result += ` ${group.operator} `;
      }
      result += `(${this.convertGroupToString(group)})`;
    });

    return result;
  }

  private convertGroupsToJSON(groups: RuleGroup[]): any {
    const result: any = {
      operator: 'AND',
      groups: [],
    };

    groups.forEach((group) => {
      const groupObject: any = {
        operator: group.operator || 'AND',
        rules: [],
      };

      group.rules.forEach((rule) => {
        if (rule.subGroups && rule.subGroups.length > 0) {
          const subGroupObject = {
            operator: rule.operator || 'AND',
            rules: this.convertGroupsToJSON(rule.subGroups).groups,
          };
          groupObject.rules.push(subGroupObject);
        } else {
          const ruleObject = {
            field: rule.field,
            condition: rule.condition || '=',
            value: rule.value,
          };
          if (rule.operator) {
            groupObject.rules.push({
              operator: rule.operator,
              rules: [ruleObject],
            });
          } else {
            groupObject.rules.push(ruleObject);
          }
        }
      });

      result.groups.push(groupObject);
    });

    return result;
  }
}
