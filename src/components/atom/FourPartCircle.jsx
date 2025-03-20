import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../contrants';

const FourPartCircle = () => {
  return (
    <View style={styles.circleContainer}>
      {/* First Diagonal Gradient */}
      <LinearGradient
        colors={[COLORS.white, COLORS.backgroundLight]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.halfCircle, {borderTopLeftRadius: 100}]}
      />

      {/* Second Diagonal Gradient */}
      <LinearGradient
        colors={['cyan', COLORS.secondary]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[styles.halfCircle, {borderBottomRightRadius: 100}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden', // Ensures proper shape
    position: 'relative',
    elevation: 30,
    shadowColor: 'pink',
  },
  halfCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default FourPartCircle;
