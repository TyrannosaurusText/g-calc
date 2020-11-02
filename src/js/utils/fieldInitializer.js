var init = (data, fieldName, initialValues) => {
  if (undefined === data[fieldName]) {
    data[fieldName] = {};
  }
  const field = data[fieldName];
  Object.keys(initialValues).forEach((key) => {
    if (
      undefined === field[key] || //empty
      typeof field[key] !== typeof initialValues[key] //unexpected type (will not detect {} vs [])
    ) {
      data[fieldName][key] = initialValues[key];
    }
  });
};

export { init };
