import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Background from '../components/molecule/Background';
import Header from '../components/molecule/Header';
import {COLORS} from '../contrants';
import Animated, {FadeInDown} from 'react-native-reanimated';

const Levels = () => {
  const alllevel = [
    {id: 1, name: 'Level 1'},
    {id: 2, name: 'Level 2'},
    {id: 3, name: 'Level 3'},
    {id: 4, name: 'Level 4'},
    {id: 5, name: 'Level 5'},
    {id: 6, name: 'Level 6'},
    {id: 7, name: 'Level 7'},
    {id: 8, name: 'Level 8'},
    {id: 9, name: 'Level 9'},
    {id: 10, name: 'Level 10'},
  ];

  return (
    <Background>
      <Header title={'All Level'} />
      <View style={styles.maincontainer}>
        <FlatList
          data={alllevel}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <Animated.View
              entering={FadeInDown.delay(index * 100)} // ⏳ Staggered delay
              style={styles.contentContainer}>
              <Text style={styles.textStyle}>{item.name}</Text>
            </Animated.View>
          )}
        />
      </View>
    </Background>
  );
};

export default Levels;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    height: 80,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '300',
    color: 'white',
    letterSpacing: 2,
  },
});

// import {FlatList, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import Background from '../components/molecule/Background';
// import Header from '../components/molecule/Header';
// import {COLORS} from '../contrants';

// const Levels = () => {
//   const alllevel = [
//     {id: 1, name: 'Level 1'},
//     {id: 2, name: 'Level 2'},
//     {id: 3, name: 'Level 3'},
//     {id: 4, name: 'Level 4'},
//     {id: 5, name: 'Level 5'},
//     {id: 6, name: 'Level 6'},
//     {id: 7, name: 'Level 7'},
//     {id: 8, name: 'Level 8'},
//     {id: 9, name: 'Level 9'},
//     {id: 10, name: 'Level 10'},
//   ];

//   // Function to generate random height, width, and background color
//   const getRandomStyle = () => {
//     const randomHeight = Math.floor(Math.random() * 100) + 80; // Random height between 80-180
//     const randomWidth = Math.floor(Math.random() * 50) + 120; // Random width between 120-170
//     const colors = [COLORS.backgoundDark, COLORS.backgroundLight];

//     const randomColor = colors[Math.floor(Math.random() * colors.length)];

//     return {
//       height: randomHeight,
//       width: randomWidth,
//       backgroundColor: randomColor,
//     };
//   };

//   return (
//     <Background>
//       <Header title={'All Level'} />
//       <View style={styles.maincontainer}>
//         <FlatList
//           data={alllevel}
//           numColumns={2} // ✅ Creates grid layout with 2 columns
//           showsVerticalScrollIndicator={false}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({item}) => {
//             const dynamicStyle = getRandomStyle(); // Generate random styles
//             return (
//               <View style={[styles.contentContainer, dynamicStyle]}>
//                 <Text style={styles.textStyle}>{item.name}</Text>
//               </View>
//             );
//           }}
//         />
//       </View>
//     </Background>
//   );
// };

// export default Levels;

// const styles = StyleSheet.create({
//   maincontainer: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: 10,
//     alignItems: 'center', // ✅ Ensures grid is centered
//     justifyContent: 'center',
//   },
//   contentContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 10,
//     borderRadius: 10,
//     elevation: 10,
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     borderWidth: 1,
//     shadowOpacity: 0.5,
//     shadowColor: 'cyan',
//   },
//   textStyle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });
