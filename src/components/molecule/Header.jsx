import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../contrants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NeumorphicButton from '../atom/NeumorphicButton';
import TextView from '../atom/TextView';
const {height, width} = Dimensions.get('screen');

const Header = ({title}) => {
  return (
    <View style={styles.containermain}>
      <NeumorphicButton>
        <Icon name="arrow-left" size={30} color="white" />
      </NeumorphicButton>
      <TextView title={title} />
      <NeumorphicButton>
        <Icon name={'menu'} size={30} color="#fff" />
      </NeumorphicButton>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containermain: {
    padding: 10,
    alignItems: 'center', // ✅ Center content
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
