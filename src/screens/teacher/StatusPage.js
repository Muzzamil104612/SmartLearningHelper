import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../../theme';
import auth from '@react-native-firebase/auth';



const StatusPage = ({ route }) => {
  const { teacherInfo } = route.params;
  const navigation = useNavigation();


  const handleDeleteRequest = async () => {
    try {


const userEmail = teacherInfo.email;
    const userPassword = teacherInfo.password;
    
    
  
     console.log(teacherInfo);


      await auth().signInWithEmailAndPassword(userEmail, userPassword);

    const currentUser = auth().currentUser;

    await currentUser.delete();


    await firebase.firestore().collection('Teachers').doc(teacherInfo.id).delete();
    console.log('deleting user');
      navigation.navigate('Login');

    } catch (error) {
        console.error('Error deleting request:', error);
        Alert.alert('Error', 'Failed to delete request. Please try again.');
    }
  };

  

  const handleGoBack = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}> 
    {teacherInfo.Status=='pending'?  <Text style={styles.statusText}>Please Wait, {teacherInfo.name} your Request is {teacherInfo.Status}!</Text>: <Text style={styles.statusText}>Oops, {teacherInfo.name}your Request is {teacherInfo.Status}!</Text>}
     
      <TouchableOpacity onPress={()=>handleDeleteRequest()} style={styles.button}>
        <Text style={{ color: themeColors.bg3 }}>Delete Request</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleGoBack()} style={styles.button}>
        <Text style={{ color: themeColors.bg3 }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'white'
  },
  statusText: {
    fontSize: 20,
    marginBottom: 20,
    color:'black',
  },
  button: {
    backgroundColor: themeColors.bg2,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 150,
    alignItems: 'center',
  },
});

export default StatusPage;
