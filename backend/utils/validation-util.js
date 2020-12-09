export stringValidation = (item) => {
  if (item && typeof item === "string" && item.trim().length > 0) {
    return true;
  } else {
    return `Error in value. Received ${item}, where the value must be a non-whitespace, non-empty string.`;
  }
};
