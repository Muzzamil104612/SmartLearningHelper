
import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreCount = async (id, count) => {
    try {
      await AsyncStorage.setItem(`count_${id}`, count.toString());
    } catch (error) {
      console.error('Error storing count:', error);
    }
  };


  export default StoreCount;