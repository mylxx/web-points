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

export const i18nKeyRewrite = (
  key: string,
  keyword: string = '.',
  transformTo: string = '%%',
) => {
  const _keyword = keyword.replace(/\./g, '\\.');
  return key.replace(new RegExp(_keyword, 'g'), transformTo);
};

export const transformRemoteI18N = (
  target: Record<string, string>,
  keyword: string = '.',
  transformTo: string = '%%',
) => {
  if (!target) return {};
  return Object.entries(target).reduce(
    (total, [key, value]) => {
      const newKey = i18nKeyRewrite(key, keyword, transformTo);
      total[newKey] = value.replace(/{{/g, '{').replace(/}}/g, '}');
      return total;
    },
    {} as Record<string, string>,
  );
};
