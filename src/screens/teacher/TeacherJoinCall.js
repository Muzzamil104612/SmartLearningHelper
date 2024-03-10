import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet,AccessibilityActionEvent,Alert, ScrollView } from 'react-native';
import { themeColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import TextInputComponent from '../components/TextInputComponent';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
const TeacherJoinCall = ({ navigation, route }) => {
  const { UserName, userID } = route.params;
  const [pendingRequests, setPendingRequests] = useState([]);
  const [matchingTeachers, setMatchingTeachers] = useState([]);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const data = useSelector(state => state.value.TeacherData);
  const currentUserEmail = data.email;

  const [selectedStudent, setSelectedStudent] = useState(null);
 

  const [myObject, setMyObject] = useState({
    Email: '',
    Password: '',
  });

  const [myObject1, setMyObject1] = useState({
    emailError: '',
  });
  const fetchPendingRequests = async () => {
    try {
        const querySnapshot = await firestore()
            .collection('requests')
            .where('teacherEmail', '==', currentUserEmail)
            .where('status', '==', 'Accepted')
            .get();

        const requestsData = querySnapshot.docs.map(doc => doc.data());
        setPendingRequests(requestsData);

    } catch (error) {
        console.error('Error fetching accepted requests: ', error);
    } finally {
        setTimeout(() => {
            setDelayedLoading(false);
          }, 2000);
        setLoading(false); // Set loading to false after fetching data
    }
};
useFocusEffect(
  React.useCallback(() => {
      // Fetch data when the screen gains focus
      fetchPendingRequests();
  }, [currentUserEmail])
);
useEffect(() => {
  const fetchMatchingTeachers = async () => {
      try {
          const teacherEmails = pendingRequests.map(request => request.studentEmail);
          const querySnapshot = await firestore()
              .collection('Students')
              .where('email', 'in', teacherEmails)
              .get();

          const teachersData = querySnapshot.docs.map(doc => doc.data());
          setMatchingTeachers(teachersData);
      } catch (error) {
          console.error('Error fetching matching teachers: ', error);
      }
  };

  if (pendingRequests.length > 0) {
      fetchMatchingTeachers();
  }
}, [pendingRequests]);
  useEffect(() => {
    setMyObject({
      ...myObject,
      Email: UserName,
    });
  }, [UserName]);

  const handleRegistration = () => {
   
    if (UserName.trim() === '' || myObject.Password.trim() === '' || selectedStudent === null) {
      setMyObject1({
        ...myObject1,
        emailError: UserName.trim() === '' ? 'Please Enter Your UserName' : '',
        passwordError: myObject.Password.trim() === '' ? 'Please Enter PassCode' : '',
      });
      if (selectedStudent === null)
      {
        Alert.alert(Error,'Please Select A student')
      }
    } else {
      setMyObject1({
        ...myObject1,
        emailError: '',
        passwordError: '',
      });
      setMyObject({
        ...myObject,
        Password: '',
      });

      // Add your navigation logic here with the selectedStudent value
      navigation.navigate('TeacherMeeting', { UserName: UserName, Id: userID, passcode: myObject.Password, selectedStudent: selectedStudent });
    }
  };

  const fetchMatchingTeachers = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Students')
        .get();

      const teachersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMatchingTeachers(teachersData);
    } catch (error) {
      console.error('Error fetching matching teachers: ', error);
    }
  };

  useEffect(() => {
    fetchMatchingTeachers();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <Animatable.View animation="bounceInLeft" duration={3000}>
        <SafeAreaView style={styles.container1}>
          <View style={styles.upperPart}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.arrow}>
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Animatable.View animation="fadeInUpBig" duration={3000} style={styles.imgview}>
            <Text style={{ color: themeColors.bg3, alignSelf: "center", fontSize: 32, textAlign: 'center', fontWeight: "500", marginBottom: hp(1.5) }}> 𝓖𝓮𝓽 𝓡𝓮𝓪𝓭𝔂 𝓕𝓸𝓻 𝓪 𝓟𝓻𝓸𝓭𝓾𝓬𝓽𝓲𝓿𝓮 𝓢𝓮𝓼𝓼𝓶𝓮𝓷.</Text>
            <Image source={require('../../assets/images/call.png')} style={styles.img} />
          </Animatable.View>
        </SafeAreaView>

        <View style={styles.container2}>
          <View style={styles.formview}>
            <TextInputComponent
              onChangeText={Text => setMyObject({ ...myObject, Email: Text })}
              label="UserName"
              placeholder={"John Elen"}
              value={UserName}
              secureTextEntry={false}
              editable={false}
            />
            {myObject1.emailError !== '' && <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2), }}>{myObject1.emailError}</Text>}
            <View style={{ marginBottom: hp(1) }}>
  <Text style={styles.Titlebox1}>Select Student:</Text>
  <Picker
    selectedValue={selectedStudent}
    onValueChange={(itemValue) => setSelectedStudent(itemValue)}
   
    style={styles.Inputbox1}>
    <Picker.Item label="Select a student" value={null} color='gray'/>
    {matchingTeachers.map((teacher,index) => (
      <Picker.Item key={index} label={teacher.name} value={teacher} />
    ))}
  </Picker>
</View>

            <TextInputComponent
              onChangeText={Text => setMyObject({ ...myObject, Password: Text })}
              label="PassCode"
              value={myObject.Password}
              placeholder="123456"
            />
            {myObject1.passwordError !== '' && <Text style={{ height: hp(3), color: 'red', marginLeft: wp(2), }}>{myObject1.passwordError}</Text>}
           

         

            <View style={{ alignItems: 'center', marginTop: hp(0.9) }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={handleRegistration}>
                <Text style={styles.btntxt}>Join Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Titlebox1: {
    marginTop: hp(1.9),
    color: "#191D88",
    
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
  Inputbox1: {
    elevation: 3, // Increased elevation for a more raised appearance
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 100,
    backgroundColor: "white",
    color: "black",
    borderRadius: 7,
    marginVertical: 2,

    paddingHorizontal: 10,
  height:hp(7),
  width:wp(85),
  marginTop:hp(0.8),
 
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

export default TeacherJoinCall;
