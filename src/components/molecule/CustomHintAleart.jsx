import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, screenHeight, screenWidth} from '../../contrants';
import {FONT} from '../../../assets/constants';

const CustomHintAleart = ({title, onConfirm, onCancel}) => {
  return (
    <View style={styles.container}>
      <View style={styles.maincontainer}>
        <View style={styles.topCon}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.bottomCon}>
          {/* <TouchableOpacity onPress={onCancel} style={styles.nobtn}>
            <Text style={styles.textYes}>Cancel</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={onConfirm} style={styles.yesbtn}>
            <Text style={styles.textYes}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomHintAleart;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maincontainer: {
    height: 300,
    width: 300,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  topCon: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bottomCon: {
    height: 50,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
  },
  yesbtn: {
    flex: 1,
    backgroundColor: COLORS.success,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  nobtn: {
    flex: 1,
    backgroundColor: COLORS.danger,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '200',
    fontFamily: FONT.Montserrat_Regular,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: '400',
    fontFamily: FONT.Montserrat_Bold,
  },
  textYes: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '200',
  },
});
