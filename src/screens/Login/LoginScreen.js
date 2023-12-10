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
import {  parentemail,admindetail ,teacheremail,stdemail} from '../../redux/action';

import { useDispatch } from 'react-redux';
const LoginScreen = ({ navigation, route }) => {
  // const [role, setRole] = useState(route.params.data);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [stdinfo, setStdInfo] = useState([]);
  const [teacherinfo, setTeacherInfo] = useState([]);
  const [admininfo, setAdminInfo] = useState([]);
  const [parentinfo, setParentInfo] = useState([]);
  const [role, setRole] = useState(route.params.data);
  const dispatch = useDispatch();
  const [myObject, setMyObject] = useState({
    Email: '', Password: '',
  });
  const [myObject1, setMyObject1] = useState({
    emailError: '', passwordError: '',
  });
  useEffect(() => {
    const firestoreRef = firestore().collection('Teachers');
    const unsubscribe = firestoreRef.onSnapshot((querySnapshot) => {
        const teachers = [];
        querySnapshot.forEach((doc) => {
            teachers.push({ id: doc.id, ...doc.data() });
        });

        setTeacherInfo(teachers);

        
    });

    return () => {
        unsubscribe();
    };
  }, []);

  useEffect(() => {
    const firestoreRef = firestore().collection('Students');
            const unsubscribe = firestoreRef.onSnapshot((querySnapshot) => {
                const Student = [];
                querySnapshot.forEach((doc) => {
                    Student.push({ id: doc.id, ...doc.data() });
                });
        
                setStdInfo(Student);
            });
            return () => {
                unsubscribe();
            };
        }
  , []);
  useEffect(() => {
    const firestoreRef = firestore().collection('Admin');
            const unsubscribe = firestoreRef.onSnapshot((querySnapshot) => {
                const Admin = [];
                querySnapshot.forEach((doc) => {
                    Admin.push({ id: doc.id, ...doc.data() });
                });
        
                setAdminInfo(Admin);
                console.log(Admin)
            });
            return () => {
                unsubscribe();
            };
        }
  , []);
  useEffect(() => {
    const firestoreRef = firestore().collection('Parents');
            const unsubscribe = firestoreRef.onSnapshot((querySnapshot) => {
                const Parents = [];
                querySnapshot.forEach((doc) => {
                  Parents.push({ id: doc.id, ...doc.data() });
                });
        
                setParentInfo(Parents);
                console.log(Parents)
            });
            return () => {
                unsubscribe();
            };
        }
  , []);








  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const handleRegistration = () => {


    if (myObject.Email.trim() === '' || myObject.Password.trim() === '' || (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(myObject.Email))) {
      setMyObject1({
        ...myObject1,

        emailError: myObject.Email.trim() === ''
          ? 'Please Enter Your Email Address..'
          : !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(myObject.Email)
            ? 'Invalid Email Format..'

            : "",

        passwordError: myObject.Password.trim() === '' ? 'Please Enter Password..'
          : "",
      });

    }

    else {
      // setIsLoading(true);

      setMyObject1({
        ...myObject1,
        emailError: "",
        passwordError: "",
      });

      if (role === 'Admin') 
          {


              const userFound = admininfo.some((item) => {
                  if (item.email === myObject.Email && item.password === myObject.Password) {
                    dispatch(admindetail(item));
                      return true;

                  }
                  return false; // Return false to continue the loop
              });

                  if (userFound) {
                    
  setMyObject({ ...myObject, Email: '' ,Password:''}); // Clear fields after navigation
setMyObject1({ ...myObject1, emailError: '', passwordError: '' }); 

                    navigation.navigate('HomeScreenForAdmin');
                      setIsLoading(false);
                     // Clear any error messages

                      Alert.alert(Error, '𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙁𝙪𝙡𝙡𝙮 𝙇𝙤𝙜𝙜𝙚𝙙 𝙄𝙣....');
                  } else {
                     setMyObject({ Email: '', Password: '' }); // Clear fields after navigation
setMyObject1({ emailError: '', passwordError: '' }); // Clear any error messages

                      setIsLoading(false);
                     

                      Alert.alert(Error, '𝙎𝙤𝙧𝙧𝙮...𝙐𝙨𝙚𝙧 𝙉𝙤𝙩 𝙁𝙤𝙪𝙣𝙙');
                      setMyObject1({ ...myObject1, passwordError: "", emailError: "" });
                  }




              return () => {
                  unsubscribe();
              };
          }
      if (role === 'Teacher') {


          const userFound = teacherinfo.some((item) => {
              if (item.email === myObject.Email && item.password === myObject.Password) {
                dispatch(teacheremail(item));
                  return true;

              }
              return false; // Return false to continue the loop
          });

          if(userFound){
            const teacher = teacherinfo.find((item) => item.email === myObject.Email);
            console.log(teacher);
            if (teacher.Status === 'approved') {
    
              navigation.navigate('HomeScreenForTeacher');
              setIsLoading(false);
              Alert.alert('Success', 'Successfully Logged In!');
            } else if(teacher.Status != 'approved') {
    
              navigation.navigate('StatusPage', { teacherInfo: teacher });

              setIsLoading(false);
            }
             
          }   
    else {
        setMyObject({ ...myObject, Email: '', Password: '' });
        setIsLoading(false);
        Alert.alert('Error', 'User not found. Check your credentials.');
      }


      return () => {
        unsubscribe();
    };

        
      }
      if (role === 'Student') {


              const userFound = stdinfo.some((item) => {
                  if (item.email === myObject.Email && item.password === myObject.Password) {
                    dispatch(stdemail(item));  
                    return true;
                  }
                  return false; 
              });

              if (userFound) {
                  setMyObject({ ...myObject, Email: '' ,Password:''});

                  navigation.navigate('HomeScreenForStudent');
                  setIsLoading(false);
                  Alert.alert(Error, '𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙁𝙪𝙡𝙡𝙮 𝙇𝙤𝙜𝙜𝙚𝙙 𝙄𝙣....');

              } else {
                  setMyObject({ ...myObject, Email: '' ,Password:''});
                  setIsLoading(false);
                  Alert.alert(Error, '𝙎𝙤𝙧𝙧𝙮...𝙐𝙨𝙚𝙧 𝙉𝙤𝙩 𝙁𝙤𝙪𝙣𝙙');
                  setMyObject1({ ...myObject1, passwordError: "", emailError: "" });
              }




          return () => {
              unsubscribe();
          };
      }
      if (role === 'Parent') {


        const userFound = parentinfo.some((item) => {
            if (item.email === myObject.Email && item.password === myObject.Password) {
              dispatch(parentemail(item));
                return true;
            }
            return false; 
        });

        if (userFound) {
            setMyObject({ ...myObject, Email: '' ,Password:''});

            navigation.navigate('HomeScreenForParent');
            setIsLoading(false);
            Alert.alert(Error, '𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙁𝙪𝙡𝙡𝙮 𝙇𝙤𝙜𝙜𝙚𝙙 𝙄𝙣....');

        } else {
            setMyObject({ ...myObject, Email: '' ,Password:''});
            setIsLoading(false);
            Alert.alert(Error, '𝙎𝙤𝙧𝙧𝙮...𝙐𝙨𝙚𝙧 𝙉𝙤𝙩 𝙁𝙤𝙪𝙣𝙙');
            setMyObject1({ ...myObject1, passwordError: "", emailError: "" });
        }

        return () => {
          unsubscribe();
      };
}


    }


  }
  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      {isLoading ? ( // Check if isLoading is true, show loading indicator
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#722BB3" />
        </View>
      )
        :
        (
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
                <Text style={{ color: '#F4BC1C', alignSelf: "center", fontSize: 25, fontWeight: "500", marginBottom: hp(1.5) }}>𝙂𝙤𝙤𝙙 𝙏𝙤 𝙎𝙚𝙚 𝙔𝙤𝙪 𝘼𝙜𝙖𝙞𝙣!</Text>
                <Image source={require('../../assets/images/student.png')}
                  style={styles.img} />
              </Animatable.View>
            </SafeAreaView>





            <View
              style={styles.container2}
            >
              <View style={styles.formview}>

                <TextInputComponent
                 onChangeText={Text => setMyObject({ ...myObject, Email: (Text) })}
                  label="Email Address"
                  placeholder={"john23@gmail.com"}
                    value={myObject.Email}
                     secureTextEntry={false} 
                      />
                {myObject1.emailError !== '' && <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2), }}>{myObject1.emailError}</Text>}

                <TextInputComponent
                  onChangeText={Text => setMyObject({ ...myObject, Password: (Text) })}
                  label="Password"
                  value={myObject.Password}
                  placeholder="123@john.smith"
                  secureTextEntry={showPassword}
                  iconname={showPassword ? 'eye-with-line' : 'eye'}
                  iconLibrary={showPassword ? 'Entypo' : 'AntDesign'}
                  onIconPress={handlePasswordVisibility}
                   />
                {myObject1.passwordError !== '' && <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2), }}>{myObject1.passwordError}</Text>}
                {myObject1.passwordError == '' && (
                  <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <Text style={styles.forgetpass}>Forget Password?</Text>
                  </TouchableOpacity>
                )}
                <View style={{ alignItems: 'center', marginTop: hp(0.9) }}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={handleRegistration}
                  >
                    <Text style={styles.btntxt}>
                      Log In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bottonPart}>
                <Text style={styles.bottomtxt}>Don't Have an Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SelectRole')}>
                  <Text style={styles.linkbtn}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>)}
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
export default LoginScreen;