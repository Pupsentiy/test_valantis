export const containsCyrillic = (text: string): boolean => /[а-яё]/i.test(text);
