import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {COLORS} from '../../contrants';
import LottieView from 'lottie-react-native';

const HomeRobot = ({onLayout, animatedStyle}) => {
  return (
    <View style={styles.robotContainer}>
      <Animated.View
        style={[styles.CenterContainer, animatedStyle]}
        onLayout={onLayout}>
        <LottieView
          style={styles.robotAnimation}
          source={require('../../../assets/images/robot.json')}
          autoPlay
          loop
        />
      </Animated.View>
    </View>
  );
};

export default HomeRobot;

const styles = StyleSheet.create({
  robotContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CenterContainer: {
    height: 250,
    width: '100%',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    alignSelf: 'center',
  },
  robotAnimation: {
    height: 200,
    width: 200,
  },
});
