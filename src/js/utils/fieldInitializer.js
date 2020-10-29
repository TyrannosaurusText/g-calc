var init = (data, fieldName, initialValues) => {
  if (undefined == data[fieldName]) {
    data[fieldName] = {};
  }
  const field = data[fieldName];
  Object.keys(initialValues).map((key) => {
    if (undefined == field[key]) {
      data[fieldName][key] = initialValues[key];
    }
  });
};

export { init };
