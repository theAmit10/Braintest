import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../contrants';
import Background from '../components/molecule/Background';
import Section from '../components/molecule/Section';
import Header from '../components/molecule/Header';
import NeuButton from '../components/atom/NeuButton';
import TextView from '../components/atom/TextView';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FourPartCircle from '../components/atom/FourPartCircle';
import {FONT} from '../../assets/constants';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import {createTable} from '../../App';
import {getQuestions} from '../database/databaseAction';
import {questiondata} from '../contrants/data';

const HomeScreen = () => {
  const navigation = useNavigation();

  const pressed = useSharedValue(false);

  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      offset.value = withSpring(0);
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offset.value},
      {scale: withTiming(pressed.value ? 1.2 : 1)},
    ],
    backgroundColor: pressed.value ? '#FFE04B' : '#b58df1',
  }));

  // Animation for robot
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

  console.log('Starting database work');

  const [allQuestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    createTable();
  }, []);

  useEffect(() => {
    getQuestions(data => console.log('All Questions:', data));
  }, []);

  console.log(questiondata.questions.length);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {/** ball container */}
          <LinearGradient
            style={styles.boxContainer}
            colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
            start={{x: 0, y: 0}} // ✅ Top
            end={{x: 0, y: 1}} // ✅ Bottom
          >
            <FourPartCircle />
            <View style={styles.textContainer}>
              <Text style={styles.textlabel}>Math Riddles</Text>
            </View>

            <LinearGradient
              style={[styles.ballConatiner, animatedStyles]}
              colors={['cyan', COLORS.backgroundLight]}
              start={{x: 0, y: 0}} // ✅ Top
              end={{x: 0, y: 1}} // ✅ Bottom
            ></LinearGradient>
          </LinearGradient>

          <Animated.View
            style={[styles.CenterContainer, animatedStyle]}
            onLayout={onLayout}>
            {/* <Animated.Text style={styles.centerText}>+</Animated.Text> */}

            <LottieView
              style={{
                height: 200,
                width: 200,
              }}
              source={require('../../assets/images/robot.json')}
              autoPlay
              loop
            />
          </Animated.View>
        </View>

        <Pressable onPress={() => navigation.navigate('Play')}>
          <LinearGradient
            style={styles.boxContainer}
            colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
            start={{x: 0, y: 0}} // ✅ Top
            end={{x: 0, y: 1}} // ✅ Bottom
          >
            <LinearGradient
              style={[styles.ballConatiner, animatedStyles]}
              colors={['cyan', COLORS.backgroundLight]}
              start={{x: 0, y: 0}} // ✅ Top
              end={{x: 0, y: 1}} // ✅ Bottom
            ></LinearGradient>
            <View style={styles.textContainer}>
              <Text style={styles.textlabel}>Play</Text>
            </View>
            <LinearGradient
              style={styles.ballConatiner}
              colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
              start={{x: 0, y: 0}} // ✅ Top
              end={{x: 0, y: 1}} // ✅ Bottom
            ></LinearGradient>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Levels')}>
          <LinearGradient
            style={styles.boxContainer}
            colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
            start={{x: 0, y: 0}} // ✅ Top
            end={{x: 0, y: 1}} // ✅ Bottom
          >
            <LinearGradient
              style={styles.ballConatiner}
              colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
              start={{x: 0, y: 0}} // ✅ Top
              end={{x: 0, y: 1}} // ✅ Bottom
            ></LinearGradient>
            <View style={styles.textContainer}>
              <Text style={styles.textlabel}>All Levels</Text>
            </View>
            <LinearGradient
              style={[styles.ballConatiner, animatedStyles]}
              colors={['cyan', COLORS.backgroundLight]}
              start={{x: 0, y: 0}} // ✅ Top
              end={{x: 0, y: 1}} // ✅ Bottom
            ></LinearGradient>
          </LinearGradient>
        </Pressable>
      </View>
    </Background>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  centerText: {
    color: COLORS.white,
    fontSize: 200,
  },
  CenterContainer: {
    height: 250,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
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
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 20,
    paddingBottom: 50,
  },
  text: {
    fontSize: 20,
    color: 'black', // ✅ Ensure it's visible
  },
  mainContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    gap: 10,
  },
});
