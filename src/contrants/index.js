// src/theme.js

import {Dimensions} from 'react-native';

export const COLORS = {
  primary: '#4CAF50', // Green
  secondary: '#FF9800', // Orange
  white: '#FFFFFF',
  black: '#000000',
  gray: '#BDBDBD',
  danger: '#FF5252',
  success: '#4CAF50',
  backgroundLight: '#2A2D32',
  backgoundDark: '#131313',
  background: '#181818',
  cyan: '#00FFFF',
};

export const FONTS = {
  regular: 'Poppins-Regular',
  bold: 'Poppins-Bold',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  light: 'Poppins-Light',
};

export const SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
};

const screen = Dimensions.get('screen');
export const screenWidth = screen.width;
export const screenHeight = screen.height;
