export const numberFormat = (
  value: number | undefined,
  locale = "ru-RU",
  options = {},
) => {
  if (value) {
    return new Intl.NumberFormat(locale, options).format(value);
  }
};
