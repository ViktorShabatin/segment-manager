import { RuleGroup } from '../types.ts';

export class RuleProcessor {
  processGroups(groups: RuleGroup[]) {
    return this.convertFullRulesToString({ groups });
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
        result += `(${rule.field} ${rule.value} ${rule.operator} (${rule.subGroups
          .map((subGroup) => this.convertGroupToString(subGroup))
          .join(` ${rule.operator} `)}))`;
      } else {
        result += `${rule.field} ${isBooleanValue ? '= ' : ''}${rule.value}`;
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
}
