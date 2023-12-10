
import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet,Alert,Linking,ScrollView } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const TeacherDetails = ({ route, navigation }) => {
  const { teacher } = route.params;
  const [status, setStatus] = useState(teacher.status);

  const approveRequest = async () => {
    try {
      await firebase.firestore().collection('Teachers').doc(teacher.id).update({
        Status: 'approved',
      });
      setStatus('approved');
navigation.navigate('AdminHomePage');
    } catch (error) {
        console.log(error)  ;  
    }
  };

  const rejectRequest = async () => {
    try {
      await firebase.firestore().collection('Teachers').doc(teacher.id).update({
        Status: 'rejected',
      });
      setStatus('rejected');
      navigation.navigate('AdminHomePage');

    } catch (error) {
console.log(error)  ;  }
  };

  const openDocumentInBrowser = async () => {
    try {
      await InAppBrowser.open(teacher.documentURL, {
        
      });
    } catch (error) {
      console.error(error);
 
    }
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.toppart}>
        <Text  style={[styles.txt,styles.title]}>{teacher.name} Details</Text>

      <Text  style={[styles.txt,styles.subheading]}>Name:  <Text  style={[styles.txt,styles.subtxt]}>{teacher.name}</Text></Text>
      <Text style={[styles.txt,styles.subheading]}>Email: <Text  style={[styles.txt,styles.subtxt]}>{teacher.email}</Text></Text>
      <Text style={[styles.txt,styles.subheading]}>Major Subject: <Text  style={[styles.txt,styles.subtxt]}>{teacher.majorSubject}</Text></Text>
    <Text style={[styles.txt,styles.subheading]}>Qualification: <Text  style={[styles.txt,styles.subtxt]}>{teacher.qualification}</Text></Text>
    <Text style={[styles.txt,styles.subheading]}>Experience: <Text  style={[styles.txt,styles.subtxt]}>{teacher.experience} years</Text></Text>
      <Text style={[styles.txt,styles.subheading]}>Status: <Text  style={[styles.txt,styles.subtxt]}>{teacher.Status}</Text></Text>
     

 
      <TouchableOpacity onPress={() => openDocumentInBrowser()}>

<View style={[styles.btn]}>
  <Text style={{ color: 'white' }}>Open CV</Text>
</View>
</TouchableOpacity>
          <TouchableOpacity onPress={() => approveRequest()}>
            <View style={[styles.btn]}>
              <Text style={{ color: 'white' }}>Approve</Text>
            </View>
          </TouchableOpacity>

          
          <TouchableOpacity onPress={() => rejectRequest()}>
            <View style={[styles.btn]}>
              <Text style={{ color: 'white' }}>Reject</Text>
            </View>
          </TouchableOpacity>

         

         
        </View>
      
    </ScrollView>
  );
};

export default TeacherDetails;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "white",
      
    }
  
    , txt: {
      color: 'black'
    }, request: {
      marginTop: hp(30),
    },
    reqpart: {
      backgroundColor: "white",
      borderRadius:9,
      padding: 8,
      marginHorizontal: wp(3),
      marginVertical:hp(1),
      shadowColor: 'gray',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 20,
    },
   btn:{
    margin:5,
    color:'white',
    backgroundColor:themeColors.bg3,
    borderRadius:4,
    padding:6,
    alignItems:'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 20,
   },
   toppart:{
    margin:19,
    marginTop:hp(25),
    
   },
   title:{
    alignSelf:'center',
    fontWeight:'500',
    fontSize:20,
    
    
   },
   subheading:{
    fontWeight:'600',
    color:themeColors.bg3,
   },subtxt:{
    fontWeight:'400'
   }
  });
  