export const required = (message?: string) => (value: string) => ({
  isValid: Boolean(value),
  message: message ?? 'Обязательное поле',
});

export const minLength = (min: number, message?: string) => (value: string) => ({
  isValid: value.length >= min,
  message: message ?? `Минимальная длина ${min}`,
});

export const maxLength = (max: number, message?: string) => (value: string) => ({
  isValid: value.length <= max,
  message: message ?? `Максимальная длина ${max}`,
});

export const withoutSpaces = (message?: string) => (value: string) => ({
  isValid: !value.includes(' '),
  message: message ?? 'Без пробелов',
});

export const withoutSpecCharacters = (
  allowedCharacters?: string[],
  message?: string,
) => (value: string) => ({
  isValid: !(new RegExp(`[^a-zA-Zа-яА-Я0-9${allowedCharacters?.join('')}]`)).test(value),
  message: message ?? 'Без спецсимволов',
});

export const withoutNumbers = (message?: string) => (value: string) => ({
  isValid: !/\d/.test(value),
  message: message ?? 'Без цифр',
});

export const withLetters = (message?: string) => (value: string) => ({
  isValid: /[a-zA-Zа-яА-Я]/.test(value),
  message: message ?? 'Должна быть минимум одна буква',
});

export const latinOnly = (message?: string) => (value: string) => ({
  isValid: /[a-zA-Z]/.test(value),
  message: message ?? 'Только английские буквы',
});

export const email = (message?: string) => (value: string) => ({
  isValid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
  message: message ?? 'Введите корректный email',
});

export const phone = (message?: string) => (value: string) => ({
  isValid: /^\+?\d+$/.test(value),
  message: message ?? 'Введите корректный номер телефона',
});

export const pattern = (regexp: RegExp, message: string) => (value: string) => ({
  isValid: regexp.test(value),
  message,
});

export const callback = (
  clb: (value: string) => boolean,
  message: string,
) => (value: string) => ({
  isValid: clb(value),
  message,
});
