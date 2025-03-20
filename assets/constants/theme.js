const FONT = {
  HELVETICA_BOLD: 'Helvetica-Bold',
  HELVETICA_REGULAR: 'Helvetica',
  SF_PRO_MEDIUM: 'SFPRO-MEDIUM',
  SF_PRO_REGULAR: 'SFPRO-REGULAR',
  Montserrat_Bold: 'Montserrat-Bold',
  Montserrat_Regular: 'Montserrat-Regular',
  Montserrat_SemiBold: 'Montserrat-SemiBold',
  ZCOOL_Regular: 'ZCOOL-Regular',
  ELEPHANT: 'Elephant',
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export {FONT, SIZES, SHADOWS};
