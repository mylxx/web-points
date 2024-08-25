export const toNestedObject = (
  target: Record<string, string>,
  separator: string = '.',
): Record<string, any> => {
  const result: Record<string, any> = {};
  if (!target) return {};
  Object.entries(target).forEach(([key, value]) => {
    const paths = key.split(separator);
    let tmpResult = result;
    const lastPath = paths.pop();

    paths.forEach((path) => {
      tmpResult[path] = tmpResult[path] || {};
      tmpResult = tmpResult[path];
    });

    lastPath !== undefined && (tmpResult[lastPath] = value);
  });
  return result;
};
