import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../../theme';
import auth from '@react-native-firebase/auth';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp  } from 'react-native-responsive-screen';



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
     <View style={styles.upperPart}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}

              style={styles.arrow}
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>

          </View>
    {teacherInfo.Status=='pending'?  <Text style={styles.statusText}>𝓟𝓵𝓮𝓪𝓼𝓮 𝓦𝓪𝓲𝓽...{'\n'}
 <Text style={styles.statusText2}>{teacherInfo.name} 𝘠𝘰𝘶𝘳 𝘙𝘦𝘲𝘶𝘦𝘴𝘵 𝘪𝘴 {teacherInfo.Status}!</Text></Text>: <Text style={styles.statusText}>
𝓡𝓮𝓰𝓻𝓮𝓽𝓽𝓪𝓫𝓵𝔂.{'\n'}
 <Text style={styles.statusText2}>{teacherInfo.name} 𝘠𝘰𝘶𝘳 𝘙𝘦𝘲𝘶𝘦𝘴𝘵 𝘪𝘴 {teacherInfo.Status}!</Text></Text>}
     <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>handleDeleteRequest()} style={styles.button}>
        <Text style={{ color: themeColors.bg3 }}>Delete Request</Text>
      </TouchableOpacity>
     
      </View>
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
    fontSize: 49,
    marginBottom: 20,
    height:hp(15),
    color:'black',
    // fontWeight:'bold',
    textAlign:'center',
    color:themeColors.bg3,

  },
  statusText2: {
    fontSize: 15,
    marginBottom: 20,
    color:themeColors.bg2,

  },
  button: {
    backgroundColor: themeColors.bg2,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: wp(35),
    alignItems: 'center',
    marginLeft:wp(5),
  },
  upperPart: {
  
    marginTop:hp(-35),
    height:hp(40),
  },
  arrow: {
    position: "absolute",
    marginTop: hp(1),
    marginLeft: wp(-47),
    backgroundColor: themeColors.bg2,
    padding: 8,
    borderTopEndRadius: 12,
    borderBottomStartRadius: 12,
  },
});

export default StatusPage;
