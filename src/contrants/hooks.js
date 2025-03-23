import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFirstInstall = () => {
  const [isFirstInstall, setIsFirstInstall] = useState(null);

  useEffect(() => {
    const checkFirstInstall = async () => {
      const firstInstall = await AsyncStorage.getItem('firstinstall');
      setIsFirstInstall(firstInstall === null);
    };

    checkFirstInstall();
  }, []);

  return isFirstInstall;
};

export default useFirstInstall;
