export const camelCaseToNormalString = (text: string): string => {
  if (!text) {
    return text;
  }

  // eslint-disable-next-line prefer-named-capture-group -- Need to capture all the groups
  const result = text.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};
