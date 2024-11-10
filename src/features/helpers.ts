import * as commonRules from '@features/rules';
import { InputField } from 'src/features/inputField';
import { Input } from '@components/input';
import { EditableField } from 'src/features/editableField';
import { IChat } from '@pages/chatListPage/chatListPage';

interface ValidationResult {
    isValid: boolean;
    message: string;
}

export const validate = (value: string, commonRulesArr: ((val: string) => ValidationResult)[]): string[] => {
  const errorMessages: string[] = [];

  commonRulesArr.forEach((validator) => {
    const result = validator(value || '');

    if (!result.isValid) {
      errorMessages.push(result.message);
    }
  });

  return errorMessages;
};

export const validateInputField = (
  field: InputField | EditableField,
  validators: ((value: string) => ValidationResult)[],
) => {
  const inputChild = field._children.input;
  if (!(inputChild instanceof Input)) {
    throw new Error('Input component is not found in children.');
  }

  const element = inputChild.getElement()?.children[0] as HTMLInputElement | null;
  if (!element) {
    throw new Error('Input is not found.');
  }

  const errors = validate(element.value || '', validators);

  field.setProps({
    help: errors?.[0],
    status: errors.length ? 'error' : undefined,
  });

  return errors.length === 0;
};

type Validator = () => boolean;
export const validateForm = (e: Event, fieldValidators: Record<string, Validator>) => {
  e.preventDefault();

  const validationResults = Object.entries(fieldValidators).map(([fieldName, validator]) => ({
    field: fieldName,
    isValid: validator(),
  }));

  const isValid = validationResults.every((result) => result.isValid);

  if (isValid) {
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    // eslint-disable-next-line no-console
    console.log('FORM VALUES >>>>>>', values);
  }
};
export const loginRules = [
  commonRules.required(),
  commonRules.withLetters(),
  commonRules.minLength(3),
  commonRules.maxLength(20),
  commonRules.latinOnly(),
  commonRules.withoutSpaces(),
  commonRules.withoutSpecCharacters(['-', '_']),
  commonRules.latinOnly(),
];

export const passwordRules = [
  commonRules.required(),
  commonRules.minLength(8),
  commonRules.maxLength(40),
  commonRules.pattern(/^(?=.*[A-ZА-Я])(?=.*\d)/, 'Обязательно хотя бы одна заглавная буква и цифра.'),
  commonRules.latinOnly(),
];

export const emailRules = [commonRules.email()];

export const nameRules = [
  commonRules.withoutSpecCharacters(['-']),
  commonRules.withoutSpaces(),
  commonRules.withoutNumbers(),
];

export const phoneRules = [
  commonRules.minLength(9),
  commonRules.maxLength(11),
  commonRules.phone(),
];

export const dateTransform = (inputDate: string) => {
  const currentDate = new Date();
  const parsedDate = new Date(inputDate);

  const timeDiff = Math.abs(currentDate.getTime() - parsedDate.getTime());
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const daysDiff = Math.floor(hoursDiff / 24);

  if (hoursDiff <= 24) {
    return parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (daysDiff <= 7) {
    const days = ['ВС', ' ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[parsedDate.getDay()];
  }
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  return `${parsedDate.getDate()} ${months[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
};

export const chatDateSort = (dataArray: IChat[]) => dataArray.sort((a: IChat, b: IChat) => {
  const dateA: Date = new Date(a.chatDate);
  const dateB: Date = new Date(b.chatDate);
  return dateB.getTime() - dateA.getTime();
});

export const getHours = (dateString: string) => {
  // Преобразуем строку в объект даты
  const date = new Date(dateString);

  // Получаем часы и минуты из объекта даты
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Возвращаем часы и минуты в виде строки
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};
