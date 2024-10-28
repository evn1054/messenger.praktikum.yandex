import { validateLogin, validatePassword } from '@features/LoginForm/helpers.ts';

export const validate = (value, validators): string[] => {
  const errorMessages = [];

  validators.forEach((validator) => {
    const result = validator(value || '');

    if (!result.isValid) {
      errorMessages.push(result.message);
    }
  });

  return errorMessages;
};

// на текущий момент есть реализаци я валидации именно Input потмоу что там специфическая вложенность
export const validateField = (field, validators, type = 'input') => {
  if (!field._element) {
    console.error('Input is not found.');
    throw new Error('Input is not found.');
  }
  const targetField = field._element.children[0].children[0].children[0];
  let errors: string[] = [];

  if (type === 'input') {
    errors = validate(targetField.value, validators);
  }
  const props = {
    help: errors?.[0],
    status: errors.length ? 'error' : undefined,
  };

  field.setProps(props);

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
