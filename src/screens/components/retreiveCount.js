import AsyncStorage from '@react-native-async-storage/async-storage';

const RetreiveCount = async (id) => {
    try {
      const count = await AsyncStorage.getItem(`count_${id}`);
      return count ? parseInt(count) : 0; // Parse count as an integer, default to 0 if not found
    } catch (error) {
      console.error('Error retrieving count:', error);
      return 0; // Default to 0 in case of an error
    }
  };
  

  export default RetreiveCount;