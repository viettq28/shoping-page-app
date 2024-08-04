const formValidator = (formValue, validators, executors) => {
  const { numberTypeFields, booleanTypeFields, enumTypeFields } = validators;
  const err = Object.entries(formValue).reduce(
    (acc, [key, value]) => {
      if (numberTypeFields?.includes(key)) {
        value.match(/\D+/g) && acc.notNumber.push(key);
      }
      if (numberTypeFields?.includes(`[${key}]`)) {
        value.some((e) => e.match(/\D+/g)) && acc.notNumber.push(key);
      }

      if (booleanTypeFields?.includes(key)) {
        !('' + value).match(/true|false/) && acc.notBoolean.push(key);
      } else {
        !value.length && acc.notInput.push(key);
      }

      if (enumTypeFields.field === key) {
        if (!enumTypeFields.enum?.includes(value)) {
          acc.notEnum.push(key);
        }
      }

      return acc;
    },
    { notInput: [], notBoolean: [], notNumber: [], notInEnum: [] }
  );
  let finalError = '';
  if (err.notInput.length) {
    if (!executors?.notInput) {
      finalError += `Please input ${err.notInput.join(', ')}!!!\n`;
    } else {
      executors.notInput(err.notInput);
    }
  }
  if (err.notNumber.length) {
    if (!executors?.notNumber) {
      finalError += `Input ${err.notNumber.join(', ')} must be a number!!!\n`;
    } else {
      executors.notNumber(err.notNumber);
    }
  }
  if (err.notBoolean.length) {
    if (!executors.notBoolean) {
      finalError += `Input ${err.notBoolean.join(
        ', '
      )} should be ${enumTypeFields.enum.split(', ')}!!!\n`;
    } else {
      executors.notInEnum(err.notInEnum);
    }
  }
  if (err.notInEnum.length) {
    if (!executors.notInEnum) {
      finalError += `Input ${err.notBoolean.join(
        ', '
      )} is either Yes or No!!!\n`;
    } else {
      executors.notBoolean(err.notBoolean);
    }
  }
  return finalError.length > 0 ? finalError : null;
};
export default formValidator;
