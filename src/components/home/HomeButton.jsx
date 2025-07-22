import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../contrants';
import {FONT} from '../../../assets/constants';

const HomeButton = ({
  onPress,
  animatedStyles,
  title,
  firstBall,
  secondBall,
}) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        style={styles.boxContainer}
        colors={[COLORS.backgoundDark, COLORS.backgroundLight]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <LinearGradient
          style={[styles.ballConatiner, animatedStyles]}
          colors={
            firstBall
              ? ['cyan', COLORS.backgroundLight]
              : [COLORS.backgoundDark, COLORS.backgroundLight]
          }
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textlabel}>{title}</Text>
        </View>
        <LinearGradient
          style={styles.ballConatiner}
          colors={
            secondBall
              ? ['cyan', COLORS.backgroundLight]
              : [COLORS.backgoundDark, COLORS.backgroundLight]
          }
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        />
      </LinearGradient>
    </Pressable>
  );
};

export default HomeButton;

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
