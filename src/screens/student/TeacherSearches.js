
import  { useEffect, useState } from 'react';

import { firebase } from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert,ScrollView ,ActivityIndicator} from 'react-native'
import React from 'react'




import { SafeAreaView } from 'react-native-safe-area-context'

import { ArrowLeftIcon } from 'react-native-heroicons/solid';

import TextInputComponent from '../components/TextInputComponent';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Animatable from 'react-native-animatable';
import { useSelector} from 'react-redux';

import InAppBrowser from 'react-native-inappbrowser-reborn';



const TeacherSearches = ({ route, navigation }) => {
  const { teacher } = route.params;
  const [loading, setLoading] = useState(false);
const data= useSelector(state =>state.value. stdData);
const [myObject1, setMyObject] = useState({
  name: '', email: '', phone: '', parentEmail:'',password: '', confirmpassword: '',ImageURL: '',
});

const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    setMyObject(data);

    // Check if request has already been sent
    // (You need to implement the logic to check this based on your application structure)
    const checkRequestStatus = async () => {
      try {
        const requestsRef = firebase.firestore().collection('requests');

        const existingRequest = await requestsRef
          .where('studentEmail', '==', myObject1.email)
          .where('parentEmail', '==', myObject1.parentEmail)
          .where('teacherEmail', '==', teacher.email)
          .where('majorSubject', '==', teacher.majorSubject)
          .get();

        setIsRequestSent(!existingRequest.empty);
      } catch (error) {
        console.error('Error checking request:', error);
      }
    };

    checkRequestStatus();
  }, [myObject1.email, myObject1.parentEmail, teacher.email, teacher.majorSubject]);
  const sendRequest = async () => {
    try {
      // If request has already been sent, do nothing
      if (isRequestSent || loading) {
        return;
      }

      // Set loading to true when sending request
      setLoading(true);

      // Get the Firestore reference to your requests collection
      const requestsRef = firebase.firestore().collection('requests');

      // Add a new document with the relevant information
      await requestsRef.add({
        studentEmail: myObject1.email,
        parentEmail: myObject1.parentEmail,
        teacherEmail: teacher.email,
        majorSubject: teacher.majorSubject,
        status: 'pending',
      });

      // Set the state to indicate that the request has been sent
      setIsRequestSent(true);

      // Alert the user that the request has been sent successfully
      Alert.alert('Request Sent', 'Your request has been sent successfully.');
    } catch (error) {
      console.error('Error sending request:', error);
      Alert.alert('Error', 'There was an error sending the request. Please try again.');
    }
    finally {
      // Set loading to false, regardless of success or error
      setLoading(false);
    }
  };

  
 

 
  
  return (
 
        <ScrollView style={{ backgroundColor: 'white', flex: 1.5 }}>
      
      < View >
<SafeAreaView style={styles.container1}>

  <View style={styles.upperPart}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}

      style={styles.arrow}
    >
      <ArrowLeftIcon size="20" color="black" />
    </TouchableOpacity>

  </View>
  <Animatable.View animation="fadeInUpBig" duration={1000} style={styles.imgview}>
    <Text style={{ color: '#F4BC1C', alignSelf: "center", fontSize: 28, fontWeight: "500", marginBottom: hp(1.5) }}>𝙋𝙧𝙞𝙫𝙖𝙩𝙚 𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣!</Text>
    <View style={styles.circle}>
    <TouchableOpacity >
                        {teacher.ImageURL ? (
                            <Image source={{ uri: teacher.ImageURL }} style={styles.selectedImage} />
                        ) : (
                          <Icon name="person-add" size={86} color="#F4BC1C" style={styles.person} />
                        )}
      </TouchableOpacity>

    </View>

  </Animatable.View>

</SafeAreaView>





<View
  style={styles.container2}
>
  <View style={styles.formview}>


    <TextInputComponent
      onChangeText={Text => setMyObject({ ...myObject, name: (Text) })}
      label="Complete Name"
      placeholder="John Smith"
      value={teacher.name}
      secureTextEntry={false}
      keyboardType="default"
      editable={false}
    />

    <TextInputComponent
      onChangeText={Text => setMyObject({ ...myObject, email: (Text) })}
      label="Email Address"
      value={teacher.email}
      placeholder="john23@gmail.com"
      secureTextEntry={false}
      keyboardType="default"
      editable={false}
    />
     <TextInputComponent
    onChangeText={Text => setMyObject({ ...myObject, experience: (Text) })}
      label="Years of Experience"
      placeholder="4"
      value={teacher.experience}
      secureTextEntry={false}
      keyboardType="numeric"
      editable={false}
    />
     <TextInputComponent
    onChangeText={Text => setMyObject({ ...myObject, majorSubject: (Text) })}
      label="Major Subject"
      placeholder="Databases"
      value={teacher.majorSubject}
      secureTextEntry={false}
      keyboardType="default"
      editable={false}
    />
     <TextInputComponent
      onChangeText={Text => setMyObject({ ...myObject, qualification: (Text) })}
      label="Qualification"
      placeholder="Bachelors of Computer Sciences(or BSCS)"
      secureTextEntry={false}
      editable={false}
      value={teacher.qualification}
      keyboardType="default"
    />
      <View style={{ alignItems: 'center', marginTop: hp(0.9) }}>
      <TouchableOpacity
              style={styles.btn1}
              onPress={sendRequest}
              disabled={isRequestSent || loading} // Disable button if request sent or already loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#191D88" style={{alignSelf:'center',marginTop:(13)}}  />
              ) : (
                <Text style={styles.btntxt1}>
                  {isRequestSent ? 'Requested' : 'Send Request'}
                </Text>
              )}
            </TouchableOpacity>
            </View>

   



  
  </View>

 
</View>
</View>

      
       

 
      

          </ScrollView>

         
      
      
  
  );
};

export default TeacherSearches;

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
   loadingContainer: {
    
    height:hp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Add this line to cover the background
  
},
forgetpass: {
  color: themeColors.bg2,
  marginLeft: 5,
  marginTop: hp(0.8),
  fontSize: 14,
  fontWeight: '600',
},
iconView: {
  flexDirection: "row",
  justifyContent: "center",


},
icon: {
  height: hp(5),
  width: wp(10)
},
txt: {


  fontWeight: "bold",
  alignSelf: "center",
  marginBottom: 10,
  marginTop: -10,
},
formview: {
  margin: hp(3.7),
  marginTop: hp(5),
}
,
container1: {
  flex: 0.5,

  alignItems: 'center',
  backgroundColor: 'white'
},
selectedImage: {
  backgroundColor: 'white',
  height: hp(16),
  width: wp(33),
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

img: {
  height: hp(14),
  width: wp(29),
  marginBottom: 5,
  marginTop: hp(1),

},

upperPart: {
  flexDirection: "row",
  justifyContent: "flex-start"
},

imgview: {
  marginTop: hp(12),
  alignItems: 'center',
  alignContent: 'center'


},
circle:
{
  backgroundColor: 'white',
  height: hp(16),
  width: wp(33),
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
person:
{
  alignSelf: 'center',

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
container2: {
  height:hp(103),
  marginTop: hp(2),
  marginBottom:hp(1),
  borderTopLeftRadius: 50,
  borderTopRightRadius: 50,
  backgroundColor: 'white',
  ...Platform.select({

    android: {
      elevation: 30, // Increased elevation for a more raised appearance
      shadowColor: 'black',
      shadowOpacity: 1,
      shadowRadius: 100,
    },
  }),
},
Titlebox: {
  marginTop: 5,
  color: "gray",
},
Inputbox: {

  backgroundColor: "#D8D8D8",
  color: "gray",
  borderRadius: 7,
  marginVertical: 2,
  paddingHorizontal: 12,
},

btn2: {
  backgroundColor: themeColors.bg2,
  borderRadius: 7,
  marginTop: hp(3.3),
  width: wp(60),
  height: hp(6.3),
  alignContent: 'center',
  alignItems: 'center',
  elevation: 2.5, // Increased elevation for a more raised appearance
  shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 50,


},
btntxt: {
  color: "#191D88",
  alignSelf: "center",
  paddingVertical: 12,
  fontSize: 16,
  paddingHorizontal: 45,
  fontWeight: "500",


},
bottonPart: {
  height: hp(2),

  marginBottom: hp(1),
  justifyContent: 'flex-end'

},
linkbtn: {
  color: themeColors.bg3,
  position: "absolute",
  marginTop: hp(-2.8),
  marginLeft: wp(67),
  fontWeight: 'bold',
  fontSize: 15,
},
bottomtxt: {
  alignSelf: "center",
  fontSize: 15,
  marginTop: hp(-2.5),
  color: 'black',
  width: wp(60),

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
   },
   btn1: {
    backgroundColor: themeColors.bg2,
    borderRadius: 7,
    marginTop: hp(5),
    width: wp(60),
    height: hp(6.3),
    alignContent: 'center',
    alignItems: 'center',
    elevation: 2.5, // Increased elevation for a more raised appearance
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 50,


  },
  btntxt1: {
    color: "#191D88",
    alignSelf: "center",
    paddingVertical: 12,
    fontSize: 18,
    paddingHorizontal: 45,
    fontWeight: "700",


  },
  });
  