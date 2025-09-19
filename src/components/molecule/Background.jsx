import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../contrants';

const Background = ({children}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent" // ✅ Let gradient show behind status bar
      />

      <LinearGradient
        style={styles.gradient}
        colors={[COLORS.backgroundLight, COLORS.backgoundDark]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          {children}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});

// import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import {COLORS} from '../../contrants';

// const Background = ({children}) => {
//   return (
//     <SafeAreaView style={styles.mainbg}>
//       <StatusBar
//         barStyle="light-content" // ✅ Light text/icons
//         backgroundColor={COLORS.backgroundLight} // ✅ Transparent status bar
//         translucent={true} // ✅ Allows content to be drawn under it  />
//       />
//       <LinearGradient
//         style={styles.mainbgCon}
//         colors={[COLORS.backgroundLight, COLORS.backgoundDark]}
//         start={{x: 0, y: 0}} // ✅ Top
//         end={{x: 0, y: 1}} // ✅ Bottom
//       >
//         {children}
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// export default Background;

// const styles = StyleSheet.create({
//   mainbg: {
//     flex: 1,
//   },
//   mainbgCon: {
//     flex: 1,
//   },
// });
