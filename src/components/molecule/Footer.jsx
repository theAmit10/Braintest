import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../contrants';
import NeumorphicButton from '../atom/NeumorphicButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NeuButton, {width} from '../atom/NeuButton';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Footer = ({showInput, setShowInput}) => {
  const width = useSharedValue(150);
  // const [showInput, setShowInput] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(width.value, [0, 100], [0, 1], Extrapolation.CLAMP),
  }));

  const handlePress = () => {
    setShowInput(!showInput);
    if (showInput) {
      width.value = withTiming(150, {duration: 500});
    } else {
      width.value = withTiming(width.value - 80, {duration: 500});
    }
  };

  return (
    <View style={styles.container}>
      <NeumorphicButton>
        <FontAwesome name="lightbulb-o" size={30} color="white" />
      </NeumorphicButton>
      <Animated.View style={[styles.centerCon, {width: width}]}>
        <Text style={styles.text} onPress={handlePress}>
          {showInput ? ' X ' : ' Start '}
        </Text>
      </Animated.View>

      <NeumorphicButton>
        <AntDesign name="doubleright" size={30} color="white" />
      </NeumorphicButton>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: COLORS.backgroundLight,
    margin: 10,
    borderRadius: 45,
    elevation: 20,
    shadowColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    shadowOpacity: 0.5,
    shadowOffset: {width: -10, height: -10},
    shadowRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
    borderLeftColor: 'cyan',
    borderTopColor: 'white',
    borderRightColor: 'cyan',
    borderBottomColor: 'white',
  },
  centerCon: {
    height: 60,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 10,
    shadowColor: 'cyan',
    shadowOffset: {width: -10, height: -10},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    borderColor: 'cyan',
    borderWidth: 1,
  },
  text: {
    color: 'cyan',
    fontSize: 20,
    letterSpacing: 2,
  },
});
