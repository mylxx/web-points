import { SITE_THEME } from '@/enums/site';

const themeVariables = {
  global: {
    '--btn-bg-y': '#977f2e',
    '--text-color-white': '#fff',
    '--divider-color': '#e9ecec',
    '--btn-bg-disabled': '#e1e5e5',
    '--font-bai-jamjuree-regular': "'DM Sans'",
    '--always-white': '#fff',
    '--primary-1': 'var(--B00)',
    '--qr-bg': '#304A57',
  },
  [SITE_THEME.LIGHT]: {
    '--title-text': '#395664',
    '--subtitle-text': '#74818C',
    '--description-text': '#9CABB2',
    '--hint-text': '#C5CDD1',
    '--line': '#E6EBEC',
    '--dark-ground': '#243640',
    '--front-ground': '#FFFFFF',
    '--back-ground': '#F5F6F7',
    '--block-primary': '#F8F9FA',
    '--button-ground': '#395664',
    '--button-highlight': '#0D0E0E',
    '--highlight-button-text': '#FFFFFF',
    '--dialog': '#FFFFFF',
    '--B00': '#395664',
    '--B01': 'rgba(57,86,100,0.15)',
    '--G00': '#32A274',
    '--G01': 'rgba(50,162,116,0.10)',
    '--R00': '#E34F4F',
    '--R01': 'rgba(227,79,79,0.10)',
    '--Y00': '#F2A231',
    '--Y01': 'rgba(242,162,49,0.10)',
    '--V00': '#A7955A',
    '--V01': 'rgba(167,149,90,0.12)',
    '--L00': '#4D95B8',
    '--L01': 'rgba(77,149,184,0.1)',
  },
  [SITE_THEME.DARK]: {
    '--title-text': '#FFFFFF',
    '--subtitle-text': '#75828A',
    '--description-text': '#5D5D61',
    '--hint-text': '#3D484D',
    '--line': '#8A8B8D',
    '--dark-ground': '#1C262C',
    '--front-ground': '#111111',
    '--back-ground': '#2F2F33',
    '--block-primary': '#1B2023',
    '--button-ground': '#292FE1',
    '--button-highlight': '#FFFFFF',
    '--highlight-button-text': '#0E0F0F',
    '--dialog': '#2F2F33',
    '--B00': '#292FE1',
    '--B01': 'rgba(69,113,130,0.15)',
    '--G00': '#32A274',
    '--G01': 'rgba(50,162,116,0.11)',
    '--R00': '#E34F4F',
    '--R01': 'rgba(227,79,79,0.10)',
    '--Y00': '#F2A231',
    '--Y01': 'rgba(242,162,49,0.10)',
    '--V00': '#A7955A',
    '--V01': 'rgba(167,149,90,0.12)',
    '--L00': '#3D9DBD',
    '--L01': 'rgba(61,157,189,0.12)',
  },
};

export default themeVariables;
