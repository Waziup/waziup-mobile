/**
 * App Theme - Colors
 *
 * WaziApp
 * https://github.com/Waziup/waziup-mobile
 */

const app = {
  background: '#E9EBEE',
  cardBackground: 'transparent',
  listItemBackground: '#FFFFFF',
};

const brand = {
  brand: {
    primary: '#8ec742',
    secondary: '#17233D',
  },
};

const text = {
  textPrimary: '#8ec742',
  textSecondary: '#777777',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
};

const borders = {
  border: '#8ec742',
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
