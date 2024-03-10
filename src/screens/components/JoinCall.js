import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert,StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import TextInputComponent from '../components/TextInputComponent';
import * as Animatable from 'react-native-animatable';
import { useState, useEffect } from 'react';



const JoinCall = ({ navigation, route }) => {
  const {UserName,userID}=route.params;
  console.log(UserName);
    const [myObject, setMyObject] = useState({
        Email: '', Password: '',
      });
      const [myObject1, setMyObject1] = useState({
        emailError: '', passwordError: '',
      });
      useEffect(() => {
        setMyObject({
          ...myObject,
  
          Email:{UserName},
  
         
        });
      }, []);
      

  
  const handleRegistration = () => {


    if (UserName.trim() === '' || myObject.Password.trim() === '') {
      setMyObject1({
        ...myObject1,

        emailError:UserName.trim() === ''
          ? 'Please Enter Your UserName'
          
            : "",

        passwordError: myObject.Password.trim() === '' ? 'Please Enter PassCode'
          : "",
      });

    }

    else {
      
      setMyObject1({
        ...myObject1,
        emailError: "",
        passwordError: "",
      });
      setMyObject({
        ...myObject,
        Password: ''
       
       
      });

     navigation.navigate(
     'MeetingScreen' ,{UserName:UserName,Id:userID,passcode:myObject.Password}

     )
    
     
    }


  }
  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      
          <Animatable.View animation="bounceInLeft" duration={3000}  >
            <SafeAreaView style={styles.container1}>
              <View style={styles.upperPart}>
                <TouchableOpacity
                  onPress={() =>  navigation.goBack()}

                  style={styles.arrow}
                >
                  <ArrowLeftIcon size="20" color="black" />
                </TouchableOpacity>

              </View>
              <Animatable.View animation="fadeInUpBig" duration={3000} style={styles.imgview}>
                <Text style={{ color: themeColors.bg3, alignSelf: "center", fontSize: 32,textAlign:'center', fontWeight: "500", marginBottom: hp(1.5) }}> 𝓖𝓮𝓽 𝓡𝓮𝓪𝓭𝔂 𝓕𝓸𝓻 𝓪 𝓟𝓻𝓸𝓭𝓾𝓬𝓽𝓲𝓿𝓮 𝓢𝓮𝓼𝓼𝓲𝓸𝓷.</Text>
                <Image source={require('../../assets/images/call.png')}
                  style={styles.img} />
              </Animatable.View>
            </SafeAreaView>





            <View
              style={styles.container2}
            >
              <View style={styles.formview}>

                <TextInputComponent
                 onChangeText={Text => setMyObject({ ...myObject, Email: (Text) })}
                  label="UserName"
                  placeholder={"John Elen"}
                    value={UserName}
                     secureTextEntry={false} 
                     editable={false}
                      />
                {myObject1.emailError !== '' && <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2), }}>{myObject1.emailError}</Text>}

                <TextInputComponent
                  onChangeText={Text => setMyObject({ ...myObject, Password: (Text) })}
                  label="PassCode"
                  value={myObject.Password}
                  placeholder="123456"
                
                   />
                  {myObject1.passwordError !== '' && <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2), }}>{myObject1.passwordError}</Text>}

              
                <View style={{ alignItems: 'center', marginTop: hp(0.9) }}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={handleRegistration}
                  >
                    <Text style={styles.btntxt}>
                      Join Call
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </Animatable.View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 0.4,
    marginTop: hp(2),
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

  btn: {
    backgroundColor: themeColors.bg2,
    borderRadius: 7,
    marginTop: hp(3.3),
    width: wp(60),
    height: hp(6.3),
    alignContent: 'center',
    alignItems: 'center',
    elevation: 10, // Increased elevation for a more raised appearance
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
    height: hp(5),

    marginBottom: hp(1),
    justifyContent: 'flex-end'

  },
  linkbtn: {
    color: themeColors.bg3,
    position: "absolute",
    marginTop: hp(-2.8),
    marginLeft: wp(63),
    fontWeight: 'bold',
    fontSize: 15,
  },
  bottomtxt: {
    alignSelf: "center",
    fontSize: 15,
    marginTop: hp(-2.5),
    color: 'black',
    width: wp(60),

  }
});
export default JoinCall;