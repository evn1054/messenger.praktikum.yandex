import { validateLogin, validatePassword } from '@features/LoginForm/helpers.ts';

interface ValidationResult {
    isValid: boolean;
    message: string;
}

export const validate = (value: string, validators: ((val: string) => ValidationResult)[]): string[] => {
  const errorMessages: string[] = [];

  validators.forEach((validator) => {
    const result = validator(value || '');

    if (!result.isValid) {
      errorMessages.push(result.message);
    }
  });

  return errorMessages;
};

// на текущий момент есть реализаци я валидации именно Input потмоу что там специфическая вложенность
export const validateField = (
  field: unknown,
  validators: ((value: string) => ValidationResult)[],
  type = 'input',
) => {
  const inputField = field as { _element: HTMLElement; setProps: (props: Record<string, any>) => void };

  if (!inputField._element) {
    console.error('Input is not found.');
    throw new Error('Input is not found.');
  }

  const targetField = inputField._element.children[0]?.children[0]?.children[0] as HTMLInputElement;
  let errors: string[] = [];

  if (type === 'input') {
    errors = validate(targetField?.value || '', validators);
  }

  const props = {
    help: errors[0] || '',
    status: errors.length ? 'error' : undefined,
  };

  inputField.setProps(props);

  return errors.length === 0;
};

export const validateForm = (e: Event) => {
  e.preventDefault();

  const loginValid = validateLogin();
  const passwordValid = validatePassword();

  const isValid = loginValid && passwordValid;

  if (isValid) {
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    console.log('FORM VALUES >>>>>>', values);
  }
};
