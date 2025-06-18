// import {StyleSheet, View} from 'react-native';
// import React, {useEffect} from 'react';
// import PlayInputButton from '../atom/PlayInputButton';
// import {COLORS} from '../../contrants';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withDelay,
// } from 'react-native-reanimated';

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// const InputController = ({answer, setAnswer}) => {
//   const animations = numbers.map(() => useSharedValue(0)); // Create shared values for each button

//   useEffect(() => {
//     animations.forEach((anim, index) => {
//       anim.value = withDelay(index * 100, withTiming(1, {duration: 500})); // Delay animation for each button
//     });
//   }, []);

//   const handlePress = number => {
//     // setAnswer(number.toString()); // 👈 Replace instead of append
//     setAnswer(prev => prev + number.toString());
//   };

//   return (
//     <Animated.View style={styles.container}>
//       {numbers.map((num, index) => {
//         const animatedStyle = useAnimatedStyle(() => ({
//           opacity: animations[index].value,
//           transform: [{translateY: (1 - animations[index].value) * 20}], // Move up effect
//         }));

//         return (
//           <Animated.View key={num} style={animatedStyle}>
//             <PlayInputButton number={num} onPress={() => handlePress(num)} />
//           </Animated.View>
//         );
//       })}
//     </Animated.View>
//   );
// };

// export default InputController;

// const styles = StyleSheet.create({
//   container: {
//     height: 200,
//     backgroundColor: COLORS.backgroundLight,
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

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

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const specialKeys = ['⌫']; // backspace button

const InputController = ({answer, setAnswer}) => {
  const animations = [...digits, ...specialKeys].map(() => useSharedValue(0)); // include all buttons

  useEffect(() => {
    animations.forEach((anim, index) => {
      anim.value = withDelay(index * 100, withTiming(1, {duration: 500}));
    });
  }, []);

  const handlePress = key => {
    if (key === '⌫') {
      setAnswer(prev => prev.slice(0, -1)); // remove last character
    } else {
      if (answer === 'Answer') {
        setAnswer(key.toString());
      } else {
        setAnswer(prev => prev + key.toString());
      }
      // setAnswer(key.toString()); // Replace
      // If you want to append instead, use:
    }
  };

  return (
    <Animated.View style={styles.container}>
      {[...digits, ...specialKeys].map((key, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          opacity: animations[index].value,
          transform: [{translateY: (1 - animations[index].value) * 20}],
        }));

        return (
          <Animated.View key={key} style={animatedStyle}>
            <PlayInputButton number={key} onPress={() => handlePress(key)} />
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

export default InputController;

const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: COLORS.backgroundLight,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
