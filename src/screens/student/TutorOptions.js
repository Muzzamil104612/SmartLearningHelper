import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { themeColors } from '../../theme';

const TutorOptions = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} 
      onPress={() => navigation.navigate('PendingTeachers')}>
        <Text style={styles.buttonText}>Pending Teachers</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button}
       onPress={() => navigation.navigate('CurrentTeachers')}>
        <Text style={styles.buttonText}>Current Teachers</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  button: {
    backgroundColor: themeColors.bg2,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.bg3,
  },
});

export default TutorOptions;
