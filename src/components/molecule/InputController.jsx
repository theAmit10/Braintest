import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import PlayInputButton from '../atom/PlayInputButton';
import {COLORS} from '../../contrants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const InputController = () => {
  const animations = numbers.map(() => useSharedValue(0)); // Create shared values for each button

  useEffect(() => {
    animations.forEach((anim, index) => {
      anim.value = withDelay(index * 100, withTiming(1, {duration: 500})); // Delay animation for each button
    });
  }, []);

  return (
    <Animated.View style={styles.container}>
      {numbers.map((num, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          opacity: animations[index].value,
          transform: [{translateY: (1 - animations[index].value) * 20}], // Move up effect
        }));

        return (
          <Animated.View key={num} style={animatedStyle}>
            <PlayInputButton number={num} />
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

export default InputController;

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: COLORS.backgroundLight,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
