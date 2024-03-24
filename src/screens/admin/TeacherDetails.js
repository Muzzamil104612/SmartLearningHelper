
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import { firebase } from '@react-native-firebase/firestore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import { View, Text,Modal,Button, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import FeedbackList from '../components/FeedbackList';
import { SafeAreaView } from 'react-native-safe-area-context'

import { ArrowLeftIcon } from 'react-native-heroicons/solid';

import TextInputComponent from '../components/TextInputComponent';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import auth from '@react-native-firebase/auth';
import TeacherStarRating from '../components/TeacherStarRating';

const TeacherDetails = ({ route, navigation }) => {
  const { teacher } = route.params;
  const data = useSelector(state => state.value.AdminData);
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState('');

  const adminName = data.name;
  const adminEmail= data.email;
  const teacherEmail = teacher.email;
  const message ="Dear "+ teacher.name +", Only " + number + " Days are Remaining To Pay Your Dues";

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (number.trim() === '') {
      alert('Please the Number of Days Remaining in the Due Date To Receive Fee');
      return;
    }

    const currentTime = new Date();
    try {
      await firestore().collection('Notifications').add({
        
        time: currentTime,
        adminName,
        adminEmail,
        teacherEmail,
        message,
      });
      console.log('Notification saved successfully!');
      setNumber('');
    } catch (error) {
      console.error('Error saving notification: ', error);

    }
    setModalVisible(false);
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

    <ScrollView style={{ backgroundColor: 'white', flex: 1.5 }}>

      < View style={{ marginBottom: hp(-10) }}>
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
            <Text style={{ color: '#F4BC1C', alignSelf: "center", fontSize: 28, fontWeight: "500", marginBottom: hp(1.5) }}>Profile Details!</Text>
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


        <View style={{ padding: 20, alignItems: 'center' }}>
          <TeacherStarRating teacherEmail={teacher.email} />
        </View>



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


            <TouchableOpacity onPress={() => openDocumentInBrowser()}>
              <View style={{ height: hp(4) }}></View>
              <View style={[styles.btn]}>
                <Text style={{ color: 'white' }}>Open CV</Text>
              </View>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: hp(39) }}>
            <TouchableOpacity
              style={styles.ReminderBtn}
              onPress={handlePress}

            >
              <Text style={{ padding: 5, color: 'white', fontSize: 14, fontWeight: 'bold' }}>Send Reminder To Parent</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                  <Text style={{ color: 'black' }}>Enter the Days Remaining For the Due Date</Text>
                  <TextInput
                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, margin: 10, padding: 5, color: 'black' }}
                    keyboardType="numeric"
                    value={number}
                    onChangeText={setNumber}
                  />
                  <TouchableOpacity
                    style={{ margin: 10, backgroundColor: themeColors.bg3, alignItems: 'center', borderRadius: 5 }}
                    onPress={handleSubmit}>
                    <Text style={{ color: 'white', padding: 10 }}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

          </View>



          </View>
         
        </View>
      </View>

      <View >
        <FeedbackList
          teacherEmail={teacher.email}


        />

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
    borderRadius: 9,
    padding: 8,
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 20,
  },
  btn: {
    margin: 2,
    color: 'white',
    backgroundColor: themeColors.bg2,
    borderRadius: 4,
    padding: 6,
    height: hp(6),
    marginLeft: wp(7.5),
    width: wp(70),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 20,
  },
  toppart: {
    margin: 10,
    marginTop: hp(25),

  },
  loadingContainer: {

    height: hp(100),
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
    height: hp(103),
    marginTop: hp(2),
    marginBottom: hp(1),
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
  title: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 20,


  },
  subheading: {
    fontWeight: '600',
    color: themeColors.bg3,
  }, subtxt: {
    fontWeight: '400'
  },
  ReminderBtn: {
    backgroundColor: themeColors.bg3,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(8),
    width: wp(49),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp(1.5),
  },
});
