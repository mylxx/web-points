/** @type {import('tailwindcss').Config} */

const allPxObj = Array.from({ length: 375 }).reduce((result, item, idx) => {
  result[idx] = `${idx}px`;
  return result;
}, Object.create(null));

module.exports = {
  mode: 'jit',
  darkMode: 'selector',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      screens: {
        // sm: '375px',
        // md: '728px',
        // lg: '768px',
        xl: '1440px',
      },
    },
    screens: {
      // 特殊情况就1个点
      pc: { min: '998px' },
      mobile: { max: '997px' },
      // pc: { min: '1280px' },
      // ltPc: { max: '1279px' },
      // atPad: { min: '768px', max: '1279px' },
      // pad: { min: '768px' },
      // atPhone: { max: '767px' },
      // imgLg: { min: '1920px' },
      // imgMd: { max: '1919px', min: '1280px' },
      // imgSm: { max: '1279px', min: '768px' },
    },
    extend: {
      colors: {
        titleText: 'var(--title-text)',
        subtitleText: 'var(--subtitle-text)',
        descriptionText: 'var(--description-text)',
        hintText: 'var(--hint-text)',
        line: 'var(--line)',
        darkGround: 'var(--dark-ground)',
        frontGround: 'var(--front-ground)',
        backGround: 'var(--back-ground)',
        buttonGround: 'var(--button-ground)',
        blockPrimary: 'var(--block-primary)',
        buttonHighlight: 'var(--button-highlight)',
        highlightButtonText: 'var(--highlight-button-text)',
        dialog: 'var(--dialog)',
        b00: 'var(--B00)',
        b01: 'var(--B01)',
        g00: 'var(--G00)',
        g01: 'var(--G01)',
        r00: 'var(--R00)',
        r01: 'var(--R01)',
        y00: 'var(--Y00)',
        y01: 'var(--Y01)',
        v00: 'var(--V00)',
        v01: 'var(--V01)',
        l00: 'var(--L00)',
        l01: 'var(--L01)',
        primary1: 'var(--primary-1)',
        alwaysWhite: 'var(--always-white)',
      },
      borderRadius: allPxObj,
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
      },
      fontFamily: {
        // 300
        'chakra-300': 'var(--font-chakra-petch-light)',
        // 400
        chakra: 'var(--font-chakra-petch-regular)',
        // 500
        'chakra-500': 'var(--font-chakra-petch-medium)',
        // 600
        'chakra-600': 'var(--font-chakra-petch-semibold)',
        // 700
        'chakra-700': 'var(--font-chakra-petch-bold)',

        // 300
        'bai-300': 'var(--font-bai-jamjuree-light)',
        // 400
        bai: 'var(--font-bai-jamjuree-regular)',
        // 500
        'bai-500': 'var(--font-bai-jamjuree-medium)',
        // 600
        'bai-600': 'var(--font-bai-jamjuree-semibold)',
        // 700
        'bai-700': 'var(--font-bai-jamjuree-bold)',
        // 800
        'bai-800': 'var(--font-bai-jamjuree-extralight)',
      },
      fontSize: {
        h1: ['56px', '72px'],
        h2: ['48px', '56px'],
        article: ['16px', '24px'],
        fs32: ['32px', '40px'],
        fs24: ['24px', '32px'],
        fs20: ['20px', '24px'],
        fs16: ['16px', '32px'],
        fs14: ['14px', '20px'],
      },
    },
    spacing: allPxObj,
  },
  plugins: [],
};
