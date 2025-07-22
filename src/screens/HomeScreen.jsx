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
import {Gesture} from 'react-native-gesture-handler';
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
import HomeTitle from '../components/home/HomeTitle';
import HomeRobot from '../components/home/HomeRobot';
import HomeButton from '../components/home/HomeButton';

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
          <HomeTitle />
          {/* Centered Robot Animation */}

          <HomeRobot onLayout={onLayout} animatedStyle={animatedStyle} />

          {/* Play Button */}
          <HomeButton
            title="Play"
            animatedStyles={animatedStyles}
            onPress={() => navigation.navigate('Play')}
            firstBall={true}
            secondBall={false}
          />
          {/* Levels Button */}

          <HomeButton
            title={'All Levels'}
            animatedStyles={animatedStyles}
            onPress={() => navigation.navigate('Levels')}
            firstBall={false}
            secondBall={true}
          />
        </View>
        {/** For add banner */}
        {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            networkExtras: {
              collapsible: 'bottom',
            },
          }}
        /> */}
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
