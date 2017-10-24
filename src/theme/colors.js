/**
 * App Theme - Colors
 *
 * WaziApp
 * https://github.com/Waziup/waziup-mobile
 */

const app = {
  background: '#FFFFFF',
  cardBackground: 'transparent',
  listItemBackground: '#FFFFFF',
};

const brand = {
  brand: {
    primary: '#0f73c7',
    secondary: '#f47321',
  },
};

const text = {
  textPrimary: '#0f73c7',
  textSecondary: '#FFFFFF',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
};

const borders = {
  border: '#0f73c7',
};

const tabbar = {
  tabbar: {
    background: '#ffffff',
    iconDefault: '#BABDC2',
    iconSelected: brand.brand.primary,
  },
};

export default {
  ...app,
  ...brand,
  ...text,
  ...borders,
  ...tabbar,
};
