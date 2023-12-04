import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert,ScrollView ,ActivityIndicator} from 'react-native'
import React from 'react'
import { themeColors } from '../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInputComponent from '../components/TextInputComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import * as Animatable from 'react-native-animatable';
import { useState, useEffect } from 'react';
const ParentSignUp = ({ navigation }) => {

  const [myObject, setMyObject] = useState({
    userID: '', name: '', email: '', phone: '', password: '', confirmpassword: '',ImageURL: '',
  });
  const [myObject1, setMyObject1] = useState({
    emailError: '', nameError: '', PhoneError: '', imageError: '',passwordError: '', cpasswordError: ''
  });
  const [myObject2, setMyObject2] = useState({
    emailError2: '', PhoneError2: ''
});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasErrors, setHasErrors] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false);
  const selectImage = () => {
    ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageMaxWidth: 500,
        compressImageMaxHeight: 500,
        compressImageQuality: 0.7,
        cropping: true,
    })
        .then((response) => {
            if (!response.didCancel) {
                setMyObject({ ...myObject, ImageURL: response.path });
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
useEffect(() => {
  let unsubscribeAll;

  const fetchDataAndCheckDuplicates = async () => {
      
      const emailQuery = firestore()
          .collection('Parents')
          .where('email', '==', myObject.email);

      const phoneQuery = firestore()
          .collection('Parents')
          .where('phone', '==', myObject.phone);

      const queries = [ emailQuery.get(), phoneQuery.get()];

      try {
          const results = await Promise.all(queries);

     
          const hasDuplicateEmail = !results[0].empty;
          const hasDuplicatePhone = !results[1].empty;

          setMyObject2({
              ...myObject2,
              
              emailError2: hasDuplicateEmail ? "Email Already Exists..." : "",
              PhoneError2: hasDuplicatePhone ? "Phone Number Already Exists..." : "",
          });

          setHasErrors( hasDuplicateEmail || hasDuplicatePhone);
          if (hasDuplicatePhone) {
              setMyObject1({ ...myObject1, PhoneError: '' });
          }
          if (hasDuplicateEmail) {
              setMyObject1({ ...myObject1, emailError: '' });
          }
         
      } catch (error) {
          console.error("Error fetching and checking duplicates:", error);
      }
  };

  fetchDataAndCheckDuplicates();

  return () => {
      if (unsubscribeAll) {
          unsubscribeAll();
      }
  };
}, [myObject.phone, myObject.email]);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  useEffect(() => {
    getData();
}, [myObject.userID]);
const getData = async () => {
  if (myObject.userID) {
      const storageRef = storage().ref();
      const imageName = myObject.userID + '.jpg'; // Choose a name for the image file
      const imageRef = storageRef.child(imageName);

      await imageRef.putFile(myObject.ImageURL)
          .then(() => {
              return imageRef.getDownloadURL();
          })
          .then((downloadURL) => {
              setMyObject({ ...myObject, userID: myObject.userID, ImageURL: downloadURL });
              console.log('image stored');
            })
          .catch((error) => {
              console.error('Image upload error:', error);
          });


   
      await firestore().collection('Parents').doc(myObject.userID).
          set(myObject)
          .then(() => {
              console.log('Registration data stored in Firebase.');
              setMyObject({ ...myObject, ImageURL: '', userID: '' });

              Alert.alert(Error, '𝙍𝙚𝙘𝙤𝙧𝙙 𝙞𝙨 𝘼𝙙𝙙𝙚𝙙 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙁𝙪𝙡𝙡𝙮');
              navigation.navigate('Login');

          })
          .catch((error) => {
             
              Alert.alert(Error, 'Error storing registration data:',error);
          });
  }
  setIsLoading(false);
}
  const handleRegistration = async () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+,-./:;<=>?@[\\])(.{8,})$/;
    if (myObject.name.trim().length < 3 || myObject.ImageURL.trim() === ''|| myObject.email.trim() === '' || (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(myObject.email)) || myObject.password.trim() === '' || myObject.name.trim() === ''
      || myObject.confirmpassword.trim() === '' || myObject.phone.trim() === '' || !/^[0-9]*$/.test(myObject.phone) || myObject.password !== myObject.confirmpassword || !passwordRegex.test(myObject.password)) {
      setMyObject1({
        ...myObject1,
        passwordError: myObject.password.trim() === '' ? "please Enter Your password"
          : !passwordRegex.test(myObject.password)
            ? "Password should contain at least 8 characters, One Uppercase Letter, One Special Symbol, and One Digit"
            : "",
        cpasswordError: myObject.confirmpassword.trim() === '' ? "Please Re-Enter Your Password"
          : myObject.password !== myObject.confirmpassword ? "Password don't Match"
            : "",
        emailError: myObject.email.trim() === ''
          ? "Please Enter Your Email Address"
          : !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(myObject.email)
            ? "Invalid Email Format"
            : "",
        PhoneError: myObject.phone.trim() === '' ? "Please Enter Phone Number"
          : !/^[0-9]+$/.test(myObject.phone)
            ? "Only Numbers are allowed for Phone Number"
            : "",
        nameError: myObject.name.trim() === '' ? "please Enter your Name"
          : myObject.name.trim().length < 3
            ? "Username must be atleast 3 characters"
            : "",
        imageError: myObject.ImageURL.trim() === '' ? "Please Select_Image"
            : "",
      });














    }

    else {


    setIsLoading(true);


            try {
                const userCredential = await auth().createUserWithEmailAndPassword(myObject.email, myObject.password);
                const { user } = userCredential;
                console.log('New user created with UID:', user.uid);
                const newUserID = user.uid;
                setMyObject({ ...myObject, userID: newUserID });

            } catch (error) {
                console.error('Error creating user:', error);
                return null;
            }
    }



  }
  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
       {isLoading ? ( // Check if isLoading is true, show loading indicator
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color="#F4BC1C" />
                </View>
            ) 
            :
            ( 
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
            <Text style={{ color: '#F4BC1C', alignSelf: "center", fontSize: 28, fontWeight: "500", marginBottom: hp(1.5) }}>𝘽𝙪𝙞𝙡𝙙 𝙔𝙤𝙪𝙧 𝙋𝙧𝙤𝙛𝙞𝙡𝙚 𝙉𝙤𝙬!</Text>
            <View style={styles.circle}>
            <TouchableOpacity onPress={selectImage}>
                                {myObject.ImageURL ? (
                                    <Image source={{ uri: myObject.ImageURL }} style={styles.selectedImage} />
                                ) : (
                                  <Icon name="person-add" size={86} color="#F4BC1C" style={styles.person} />
                                )}
              </TouchableOpacity>

            </View>
            {myObject1.imageError !== '' && <Text style={{ height: hp(2.3), width: wp(100), color: 'red', textAlign:"center",marginTop:hp(1) }}>{myObject1.imageError}</Text>}

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
              secureTextEntry={false}
              keyboardType="default"
            />
            {myObject1.nameError !== '' && <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2), }}>{myObject1.nameError}</Text>}

            <TextInputComponent
              onChangeText={Text => setMyObject({ ...myObject, email: (Text) })}
              label="Email Address"
              placeholder="john23@gmail.com"
              secureTextEntry={false}
              keyboardType="default"
            />
 {myObject1.emailError !== '' && !myObject2.emailError2 && !myObject.email &&(
                            <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2) }}>{myObject1.emailError}</Text>
                        )}
                        {myObject1.emailError === "Invalid Email Format" && !myObject2.emailError2 && (
                            <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2) }}>{myObject1.emailError}</Text>
                        )}
                        {myObject2.emailError2 !== '' && (
                            <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2) }}>{myObject2.emailError2}</Text>
                        )}
            <TextInputComponent
              onChangeText={Text => setMyObject({ ...myObject, phone: (Text) })}
              label="Contact No."
              placeholder="+923456675634"
              secureTextEntry={false}
              keyboardType="numeric"
            />
{myObject1.PhoneError !== '' && !myObject2.PhoneError2 && !myObject.phone && (
                            <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2) }}>{myObject1.PhoneError}</Text>
                        )}
                        {myObject1.PhoneError === "Only Numbers are allowed for Phone Number" && !myObject2.PhoneError2 &&(
                            <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2) }}>{myObject1.PhoneError}</Text>
                        )}
                        {myObject2.PhoneError2 !== '' && (
                            <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2) }}>{myObject2.PhoneError2}</Text>
                        )}
            <TextInputComponent
              onChangeText={Text => setMyObject({ ...myObject, password: (Text) })}
              label="Password"
              placeholder="123@john.smith"
              secureTextEntry={showPassword}
              iconname={showPassword ? 'eye-with-line' : 'eye'}
              iconLibrary={showPassword ? 'Entypo' : 'AntDesign'}
              onIconPress={handlePasswordVisibility}
              keyboardType="default"
              autoCorrect={false}
            />
            {myObject1.passwordError !== '' && <Text style={{ height: hp(6.7), color: 'red', marginLeft: wp(2), }}>{myObject1.passwordError}</Text>}

            <TextInputComponent
              onChangeText={Text => setMyObject({ ...myObject, confirmpassword: (Text) })}
              label="Confirm Password"
              placeholder="123@john.smith"
              secureTextEntry={showPassword1}
              iconname={showPassword1 ? 'eye-with-line' : 'eye'}
              iconLibrary={showPassword1 ? 'Entypo' : 'AntDesign'}
              onIconPress={handlePasswordVisibility1}
              keyboardType="default"
              autoCorrect={false}
            />
            {myObject1.cpasswordError !== '' && <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2), }}>{myObject1.cpasswordError}</Text>}

            <View style={{ alignItems: 'center', marginTop: hp(0.9) }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={handleRegistration}
                disabled={hasErrors}
              >
                <Text style={styles.btntxt}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottonPart}>
            <Text style={styles.bottomtxt}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkbtn}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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

  }
});
export default ParentSignUp;