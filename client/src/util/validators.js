const isEmail = (value) => {
  return /^[\w-.]+@[\w-]+\.[\w-]{2,4}$/.test(value);
};

const isSpecialChar = (value) => {
  return /[<\\>\\?!\\^@#\\*]+/g.test(value);
};

const isString = (value) => {
  return /^[^\d]+$/.test(value);
};

const maxLenght = (value, max) => {
  return value.length <= max;
};

const minLenght = (value, min) => {
  return value.length >= min;
};

const isEmpty = (value) => {
  return value.length === 0 || value === "";
};

export const validate = (field, value) => {
  const fieldValue = value.trim();
  switch (field) {
    case "nome":
    case "cognome":
      return (
        !isEmpty(fieldValue) &&
        !isSpecialChar(fieldValue) &&
        isString(fieldValue) &&
        minLenght(fieldValue, 3) &&
        maxLenght(fieldValue, 30)
      );
    case "citta":
      return (
        !isEmpty(fieldValue) &&
        !isSpecialChar(fieldValue) &&
        isString(fieldValue)
      );
    case "email":
      return !isEmpty(fieldValue) && isEmail(fieldValue);
    default:
      throw new Error("Invalid field");
  }
};
