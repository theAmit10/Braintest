import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Background from '../components/molecule/Background';
import Header from '../components/molecule/Header';
import {COLORS} from '../contrants';
import Animated, {FadeInDown} from 'react-native-reanimated';
import useFirstInstall from '../contrants/hooks';
import {getQuestions} from '../database/databaseAction';
import {getCurrentQuestion} from '../contrants/helper';
import {useNavigation} from '@react-navigation/native';
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

const Levels = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);
  const isFirstInstall = useFirstInstall();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('Fetching questions from DB...');
        const questions = await getQuestions(); // ✅ await the promise
        setAllQuestions(questions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setIsLoading(false);
      }
    };

    if (isFirstInstall !== null) {
      fetchQuestions();
    }
  }, [isFirstInstall]);

  const [question, setQuestion] = useState('');

  const fetchQuestion = async () => {
    const quest = await getCurrentQuestion();
    setQuestion(quest);
    console.log('Current Question TA :', quest);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const quest = await getCurrentQuestion();
      setQuestion(quest);
      console.log('Current Question TA :', quest);

      // Scroll to current question after slight delay (when FlatList is populated)
      setTimeout(() => {
        if (flatListRef.current && quest?.id) {
          const index = allQuestions.findIndex(q => q.id === quest.id);
          if (index !== -1) {
            flatListRef.current.scrollToIndex({index, animated: true});
          }
        }
      }, 300); // wait for FlatList to render
    };

    if (allQuestions.length > 0) {
      fetchQuestion();
    }
  }, [allQuestions]);

  return (
    <Background>
      <Header title={'All Levels'} fromscreen={'Levels'} />
      <View style={styles.maincontainer}>
        {isLoading ? (
          <Text style={styles.textStyle}>Loading...</Text>
        ) : allQuestions.length > 0 ? (
          <>
            <FlatList
              ref={flatListRef}
              data={allQuestions}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              getItemLayout={(data, index) => ({
                length: 80,
                offset: 80 * index,
                index,
              })}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (item.solved === 1) {
                      navigation.navigate('PreviousQuestion', {
                        question: item,
                      });
                    }
                  }}>
                  <Animated.View
                    entering={FadeInDown.delay(index * 100)}
                    style={{
                      ...styles.contentContainer,
                      backgroundColor:
                        item.solved === 1
                          ? COLORS.success
                          : COLORS.backgroundLight,
                    }}>
                    <Text style={styles.textStyle}>Level {item.id}</Text>
                  </Animated.View>
                </TouchableOpacity>
              )}
            />
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                networkExtras: {
                  collapsible: 'bottom',
                },
              }}
            />
          </>
        ) : (
          <Text style={styles.textStyle}>No data found</Text>
        )}
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
    paddingHorizontal: 10,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
  },
});

// import React, {useEffect, useState} from 'react';
// import {FlatList, StyleSheet, Text, View} from 'react-native';
// import Background from '../components/molecule/Background';
// import Header from '../components/molecule/Header';
// import {COLORS} from '../contrants';
// import Animated, {FadeInDown} from 'react-native-reanimated';
// import useFirstInstall from '../contrants/hooks';
// import {getQuestions} from '../database/databaseAction';

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

//   const [allQuestions, setAllQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const isFirstInstall = useFirstInstall();

//   useEffect(() => {
//     if (isFirstInstall) {
//       console.log('Getting all problems');
//       getQuestions(data => console.log('All Questions:', data));
//       setAllQuestions(getQuestions());
//     }
//   }, [isFirstInstall, allQuestions]);

//   console.log('All Questions:', allQuestions[0]);

//   return (
//     <Background>
//       <Header title={'All Level'} />
//       <View style={styles.maincontainer}>
//         <FlatList
//           data={allQuestions}
//           showsVerticalScrollIndicator={false}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({item, index}) => (
//             <Animated.View
//               entering={FadeInDown.delay(index * 100)} // ⏳ Staggered delay
//               style={styles.contentContainer}>
//               <Text style={styles.textStyle}>{item.id}</Text>
//             </Animated.View>
//           )}
//         />
//       </View>
//     </Background>
//   );
// };

// export default Levels;

// const styles = StyleSheet.create({
//   maincontainer: {
//     flex: 1,
//     padding: 10,
//   },
//   contentContainer: {
//     height: 80,
//     backgroundColor: COLORS.backgroundLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//     borderRadius: 20,
//   },
//   textStyle: {
//     fontSize: 20,
//     fontWeight: '300',
//     color: 'white',
//     letterSpacing: 2,
//   },
// });
