import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../contrants';
import Background from '../components/molecule/Background';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FourPartCircle from '../components/atom/FourPartCircle';
import {FONT} from '../../assets/constants';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import {getQuestions} from '../database/databaseAction';
import useFirstInstall from '../contrants/hooks';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__
//   ? TestIds.ADAPTIVE_BANNER
//   : 'ca-app-pub-7633228298096492~7079873038';

// const adUnitId = 'ca-app-pub-7633228298096492~7079873038';

const adUnitId = 'ca-app-pub-7633228298096492/6684858039';

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

  const onLayout = event => {
    const width = event.nativeEvent.layout.width;
    setContainerWidth(width);
  };

  useEffect(() => {
    if (containerWidth > 0) {
      translateX.value = -containerWidth;
      translateX.value = withTiming(0, {duration: 1000});
    }
  }, [containerWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const [allQuestions, setAllQuestions] = useState([]);
  const isFirstInstall = useFirstInstall();

  useEffect(() => {
    if (isFirstInstall) {
      getQuestions(data => console.log('All Questions:', data));
      setAllQuestions(getQuestions());
    }
  }, [isFirstInstall]);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {/* Header with Math Riddles title */}
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

          {/* Centered Robot Animation */}
          <View style={styles.robotContainer}>
            <Animated.View
              style={[styles.CenterContainer, animatedStyle]}
              onLayout={onLayout}>
              <LottieView
                style={styles.robotAnimation}
                source={require('../../assets/images/robot.json')}
                autoPlay
                loop
              />
            </Animated.View>
          </View>

          {/* Play Button */}
          <Pressable onPress={() => navigation.navigate('Play')}>
            <LinearGradient
              style={styles.boxContainer}
              colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <LinearGradient
                style={[styles.ballConatiner, animatedStyles]}
                colors={['cyan', COLORS.backgroundLight]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
              />
              <View style={styles.textContainer}>
                <Text style={styles.textlabel}>Play</Text>
              </View>
              <LinearGradient
                style={styles.ballConatiner}
                colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
              />
            </LinearGradient>
          </Pressable>

          {/* Levels Button */}
          <Pressable onPress={() => navigation.navigate('Levels')}>
            <LinearGradient
              style={styles.boxContainer}
              colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <LinearGradient
                style={styles.ballConatiner}
                colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
              />
              <View style={styles.textContainer}>
                <Text style={styles.textlabel}>All Levels</Text>
              </View>
              <LinearGradient
                style={[styles.ballConatiner, animatedStyles]}
                colors={['cyan', COLORS.backgroundLight]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
              />
            </LinearGradient>
          </Pressable>
        </View>
        {/** For add banner */}
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            networkExtras: {
              collapsible: 'bottom',
            },
          }}
        />
      </View>
    </Background>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 20,
  },
  mainContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
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
