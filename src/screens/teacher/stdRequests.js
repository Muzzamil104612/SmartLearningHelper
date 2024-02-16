import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const StdRequests = ({ navigation }) => {

  const data = useSelector((state) => state.value.TeacherData);
  const [myObject, setMyObject] = useState({
    userID: '',
    name: '',
    email: '',
    phone: '',
    experience: '',
    majorSubject: '',
    qualification: '',
    password: '',
    confirmpassword: '',
    ImageURL: '',
    documentURL: '',
  });

  useEffect(() => {
    setMyObject(data);
  }, [data, navigation]);
 
  const [requestedStudents, setRequestedStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [delayedLoading, setDelayedLoading] = useState(true); // Added delayed loading state
  const viewDetails = (student) => {
    console.log(student);
    navigation.navigate('StudentsDetail', { student });
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchRequestedStudents = async () => {
        try {
          const requestsRef = firebase.firestore().collection('requests');
          const snapshot = await requestsRef
            .where('teacherEmail', '==', myObject.email)
            .where('status', '==', 'pending')
            .get();
  
          const requestedStudentsData = [];
  
          for (const doc of snapshot.docs) {
            const requestData = doc.data();
  
            const studentRef = firebase.firestore().collection('Students');
            const studentDoc = await studentRef
              .where('email', '==', requestData.studentEmail)
              .get();
  
            // If the student exists, add their details to the array
            if (!studentDoc.empty) {
              const studentDetails = studentDoc.docs[0].data();
              requestedStudentsData.push({ ...requestData, studentDetails });
            }
          }
  
          setRequestedStudents(requestedStudentsData);
          console.log(requestedStudentsData);
          setIsLoading(false); // Set loading to false after data is fetched
  
          // Introduce a delay of 3 seconds before displaying "No Student Requests"
          setTimeout(() => {
            setDelayedLoading(false);
          }, 2000);
  
        } catch (error) {
          console.error('Error fetching requested students:', error);
          setIsLoading(false); // Set loading to false in case of error
          setDelayedLoading(false);
        }
      };
  
      fetchRequestedStudents();
    }, [myObject.email])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.request, styles.reqheading,]}>𝓢𝓽𝓾𝓭𝓮𝓷𝓽   𝓡𝓮𝓺𝓾𝓮𝓼𝓽𝓼</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color={themeColors.bg3} style={styles.loadingIndicator} />
      ) : delayedLoading ? (
        // Show a delayed loading indicator
        <ActivityIndicator size="large" color={themeColors.bg3} style={styles.loadingIndicator} />
      ) : requestedStudents.length === 0 ? (
        <Text style={{ alignSelf: 'center', marginTop: hp(27) , color:themeColors.bg2,fontSize:27,textAlign:'center'}}>𝓝𝓸 𝓢𝓽𝓾𝓭𝓮𝓷𝓽 𝓡𝓮𝓺𝓾𝓮𝓼𝓽𝓼 𝓪𝓻𝓮 𝓬𝓾𝓻𝓻𝓮𝓷𝓽𝓵𝔂 𝓟𝓻𝓮𝓼𝓮𝓷𝓽! !</Text>
      ) : (
    requestedStudents.map((request) => (
  <View key={request.studentDetails.id} style={[styles.reqpart]}>
    <View style={{flexDirection:'row'}}>
       <View style={styles.circle}>
       <Image source={{ uri: request.studentDetails.ImageURL }} style={styles.selectedImage} />
       </View>
   
    <View >
      <View style={{flexDirection:'row',width:wp(49)}}>
    <Text style={styles.text2}>{request.studentDetails.name}</Text>
    
    </View>
    <Text style={styles.text}>{request.studentDetails.qualification}</Text>
    </View>
    <TouchableOpacity onPress={() => viewDetails(request)}>
      <View style={[styles.btn]}>
        <Text style={{ color: 'black',textAlign:'center' }}>Details</Text>
      </View>
    </TouchableOpacity>
    </View>
  
  </View>
))
)}

  </ScrollView>
  );
};

const styles = StyleSheet.create({
    loadingIndicator: {
        marginTop: hp(3), // Adjust the marginTop as needed
      },
      
    selectedImage: {
      backgroundColor: 'white',
      height: hp(10),
      width: wp(20),
      borderRadius: 100,
      borderWidth:hp(0.3),
      borderStyle:'solid',
      borderColor:themeColors.bg3,
      alignContent: 'center',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
    },
    text:
    {
      color:themeColors.bg2,
      marginLeft:wp(4),
     // marginTop:hp(-1),
    },
    circles:
    {
        backgroundColor: '#191D88',
        height: hp(19.7),
        width: wp(41.1),
        borderRadius: 100,
        marginTop: 25,
        marginLeft: 129,
        alignContent: 'center',
        justifyContent: 'center',
       
    },
    header:
      {
          height: hp(30),
          width: wp(110),
          backgroundColor: '#FFCD4B',
          borderRadius: 200,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
           marginTop: -40,
           marginLeft: -18,
      },
    
    selectedImage1: {
      backgroundColor: 'white',
      height: hp(19),
      width: wp(39),
      marginLeft:wp(1),
      borderRadius: 100,
      alignContent: 'center',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
  },
    container1: {
      flex: 0.5,
  
      alignItems: 'center',
      backgroundColor: 'white'
    },
  
    person:
    {
      alignSelf: 'center',
  
    },
   set:
    {
      color: themeColors.bg3,
     
  alignSelf:'center',
  marginTop:hp(8),
  
  
  
    },
    heading: {
      color: themeColors.bg3,
      fontWeight: '500',
      fontSize: 39,
  alignSelf:'center',
  marginTop:hp(8),
  marginLeft:wp(-4),
  
    
  
    },
    person:
    {
      alignSelf: 'center',
  
    },
    text2:
    {
      color:themeColors.bg3,
      fontSize:17,
      fontWeight:'600',
      marginLeft:wp(4),
      marginTop:hp(4),
    },
    text3:
    {
      color:themeColors.bg3,
      fontSize:20,
      fontWeight:'600',
      marginLeft:wp(1),
      marginTop:hp(4),
    },
    circle:
    {
      backgroundColor: 'white',
      height: hp(10),
      width: wp(20),
      borderRadius: 100,
     
      marginTop: hp(2),
  
      alignContent: 'center',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 8,
    }, 
  
    container: {
      height:hp(200),
      backgroundColor: "white",
     
      padding:20,
    }
  
    , txt: {
      color: 'black'
    }, request: {
      marginTop: hp(7),
    },
    reqheading: {
      marginBottom:hp(3),
      shadowColor: 'black',
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  elevation: 1,
      fontSize: 38,
      marginLeft: wp(3),
      fontWeight: '500',
      color:themeColors.bg3,
      height:hp(9),
      width:wp(86),
      backgroundColor:themeColors.bg2,
      borderRadius:hp(1),
      padding:hp(1),
      marginRight:hp(20)
    },
    reqpart: {
      backgroundColor: "white",
      borderRadius:9,
     
      height:hp(14),
      paddingLeft:wp(2),
      
      marginHorizontal: wp(3),
      marginVertical:hp(1),
      shadowColor: 'gray',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 8,
    },
   btn:{
    marginTop:hp(5.3),
    color:'black',
    backgroundColor:themeColors.bg2,
    borderRadius:4,
    padding:hp(0.3),
    width:wp(17),
    marginLeft:wp(-9)
  
   
   
   }
  });

export default StdRequests;
