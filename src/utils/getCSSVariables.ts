import themeVariables from '@/config/themeVariables';
import { SITE_THEME } from '@/enums/site';

const genStyle = (selector: string, variables: Record<string, string>) => {
  const variableString = Object.entries(variables).reduce((total, current) => {
    const [key, value] = current;
    total += `${key}:${value};`;
    return total;
  }, '');
  return `${selector}{${variableString}}`;
};

const getCSSVariables = () => {
  return `${genStyle('body', themeVariables.global)} ${genStyle(`body.${[SITE_THEME.LIGHT]}`, themeVariables[SITE_THEME.LIGHT])} ${genStyle(`body.${[SITE_THEME.DARK]}`, themeVariables[SITE_THEME.DARK])}`;
};

export default getCSSVariables;
