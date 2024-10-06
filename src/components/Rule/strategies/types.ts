import { InputRule } from './InputRenderStrategy/InputRenderStrategy.tsx';
import { ExtendedInputRule } from './ExtendedInputRenderStrategy/ExtendedInputRenderStrategy.tsx';
import { SelectRule } from './SelectRenderStrategy/SelectRenderStrategy.tsx';
import { CheckboxRule } from './CheckboxRenderStrategy/CheckboxRenderStrategy.tsx';

export type RuleComponentType =
  | InputRule
  | ExtendedInputRule
  | SelectRule
  | CheckboxRule;

export type RuleType = 'input' | 'extendedInput' | 'select' | 'checkbox';
