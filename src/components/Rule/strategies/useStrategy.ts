import {
  InputRenderStrategy,
  ExtendedInputRenderStrategy,
  CheckboxRenderStrategy,
  SelectRenderStrategy,
} from './index.ts';

export default () => {
  const getStrategy = (type: string) => {
    switch (type) {
      case 'input':
        return InputRenderStrategy;
      case 'extendedInput':
        return ExtendedInputRenderStrategy;
      case 'checkbox':
        return CheckboxRenderStrategy;
      case 'select':
        return SelectRenderStrategy;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  };

  return {
    getStrategy,
  };
};
