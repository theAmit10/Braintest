// import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
// import React, {useState} from 'react';
// import {COLORS} from '../../contrants';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
//   runOnJS,
// } from 'react-native-reanimated';

// const AnswerInput = () => {
//   const translateX = useSharedValue(0);
//   const [containerWidth, setContainerWidth] = useState(0);

//   // Get the parent width dynamically
//   const onLayout = event => {
//     setContainerWidth(event.nativeEvent.layout.width);
//   };

//   // Animated style for moving the ball
//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{translateX: translateX.value}],
//   }));

//   const handlePress = () => {
//     const targetX = -containerWidth; // Adjusting to the exact left edge
//     translateX.value = withTiming(targetX, {duration: 500}, () => {
//       runOnJS(showAlert)();
//     });
//   };

//   const showAlert = () => {
//     Alert.alert('Action', 'Button Moved & Alert Shown');
//   };

//   return (
//     <View style={styles.container} onLayout={onLayout}>
//       <View style={styles.textCon}>
//         <Text style={styles.text}>Answer</Text>
//       </View>
//       {/* Animated Ball */}
//       <Animated.View style={[styles.ballContainer, animatedStyle]}>
//         <TouchableOpacity style={styles.ball} onPress={handlePress}>
//           <FontAwesome name="send" size={25} color="white" />
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// export default AnswerInput;

// const styles = StyleSheet.create({
//   container: {
//     height: 60,
//     backgroundColor: COLORS.background,
//     margin: 10,
//     borderRadius: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderLeftColor: 'cyan',
//     borderTopColor: 'white',
//     borderRightColor: 'cyan',
//     borderBottomColor: 'white',
//     overflow: 'hidden', // Ensures smooth movement within bounds
//   },
//   text: {
//     color: COLORS.white,
//     fontSize: 20,
//     fontWeight: 'bold',
//     letterSpacing: 1,
//   },
//   textCon: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   ballContainer: {
//     position: 'absolute', // Allows free movement
//     right: 10, // Start from right
//   },
//   ball: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     backgroundColor: COLORS.gray,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 10,
//   },
// });

import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../contrants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import CustomAlert from './CustomAlert';

const AnswerInput = ({showAlert, answer, setAnswer}) => {
  const translateX = useSharedValue(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Get the parent width dynamically
  const onLayout = event => {
    const width = event.nativeEvent.layout.width;
    setContainerWidth(width);
    translateX.value = -width; // Start from left (off-screen)
  };

  // Move the ball to the right on mount
  useEffect(() => {
    if (containerWidth > 0) {
      translateX.value = withTiming(0, {duration: 1000}); // Move to initial position
    }
  }, [containerWidth]);

  // Animated style for moving the ball
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const handlePress = () => {
    translateX.value = withTiming(-containerWidth, {duration: 500}, () => {
      runOnJS(showAlert)();
    });
  };

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // const showAlert = () => {
  //   // Alert.alert('Action', 'Button Moved & Alert Shown');
  //   // <CustomAlert />;
  //   setIsAlertVisible(true); // Show the custom alert
  // };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.textCon}>
        <Text style={styles.text}>{answer}</Text>
      </View>
      {/* Animated Ball */}
      <Animated.View style={[styles.ballContainer, animatedStyle]}>
        <TouchableOpacity style={styles.ball} onPress={handlePress}>
          <FontAwesome name="send" size={25} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default AnswerInput;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: COLORS.background,
    margin: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderLeftColor: 'cyan',
    borderTopColor: 'white',
    borderRightColor: 'cyan',
    borderBottomColor: 'white',
    overflow: 'hidden', // Ensures smooth movement within bounds
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  textCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballContainer: {
    position: 'absolute', // Allows free movement
    right: 10, // Start from right
  },
  ball: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});
