var updateSelection = (onChange, ...key) => (value) => {
  value = value.localeCompare("None") === 0 ? undefined : value;
  onChange(...key)(value);
};

export { updateSelection };
