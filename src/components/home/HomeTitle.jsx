import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../contrants';
import {FONT} from '../../../assets/constants';
import FourPartCircle from '../atom/FourPartCircle';

const HomeTitle = ({animatedStyles}) => {
  return (
    <LinearGradient
      style={styles.boxContainer}
      colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}>
      <FourPartCircle />
      <View style={styles.textContainer}>
        <Text style={styles.textlabel}>Math Riddles</Text>
      </View>
      <LinearGradient
        style={[styles.ballConatiner, animatedStyles]}
        colors={['cyan', COLORS.backgroundLight]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
    </LinearGradient>
  );
};

export default HomeTitle;

const styles = StyleSheet.create({
  boxContainer: {
    height: 80,
    borderRadius: 40,
    elevation: 20,
    shadowColor: 'cyan',
    shadowOffset: {width: -10, height: -10},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textlabel: {
    color: 'cyan',
    fontSize: 20,
    fontFamily: FONT.ZCOOL_Regular,
    letterSpacing: 2,
  },
  boxContainer: {
    height: 80,
    borderRadius: 40,
    elevation: 20,
    shadowColor: 'cyan',
    shadowOffset: {width: -10, height: -10},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ballConatiner: {
    height: 70,
    width: 70,
    borderRadius: 40,
    elevation: 20,
    shadowColor: 'cyan',
    shadowOffset: {width: -10, height: -10},
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
});
