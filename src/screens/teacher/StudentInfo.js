
import { useEffect, useState } from 'react';

import { firebase } from '@react-native-firebase/firestore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ScrollView,Modal , ActivityIndicator } from 'react-native'
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'

import { ArrowLeftIcon } from 'react-native-heroicons/solid';

import TextInputComponent from '../components/TextInputComponent';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Animatable from 'react-native-animatable';

import InAppBrowser from 'react-native-inappbrowser-reborn';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';

const StudentInfo = ({ route, navigation }) => {
    const { student } = route.params;
    console.log('detail',student);
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [groupName, setGroupName] = useState('');
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
  console.log('teacher data is:',data);
    useEffect(() => {
      setMyObject(data);
    }, [data, navigation]);
    
   
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
                        <Text style={{ color: '#F4BC1C', alignSelf: "center", fontSize: 28, fontWeight: "500", marginBottom: hp(1.5) }}>Profile Details!</Text>
                        <View style={styles.circle}>
                            <TouchableOpacity >
                                {student.ImageURL ? (
                                    <Image source={{ uri: student.ImageURL }} style={styles.selectedImage} />
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
                            value={student.name}
                            secureTextEntry={false}
                            keyboardType="default"
                            editable={false}
                        />

                        <TextInputComponent
                            onChangeText={Text => setMyObject({ ...myObject, email: (Text) })}
                            label="Email Address"
                            value={student.email}
                            placeholder="john23@gmail.com"
                            secureTextEntry={false}
                            keyboardType="default"
                            editable={false}
                        />
                          <TextInputComponent
                            onChangeText={Text => setMyObject({ ...myObject, email: (Text) })}
                            label="Parent's Email Address"
                            value={student.parentEmail}
                            placeholder="john23@gmail.com"
                            secureTextEntry={false}
                            keyboardType="default"
                            editable={false}
                        />
                          <TextInputComponent
                            onChangeText={Text => setMyObject({ ...myObject, email: (Text) })}
                            label="Phone"
                            value={student.phone}
                            placeholder="03067856456"
                            secureTextEntry={false}
                            keyboardType="default"
                            editable={false}
                        />
                      



                    </View>
          
                    <TouchableOpacity
    onPress={() => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this student Request?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove Student',
                    onPress: async () => {
                        try {
                          
                           console.log(student.parentEmail,student.email,myObject.majorSubject,myObject.email);
                           
                            await firebase.firestore().collection('requests')
                            .where('parentEmail', '==', student.parentEmail )
                            .where('studentEmail', '==', student.email)
                            .where('majorSubject', '==', myObject.majorSubject)
                            .where('teacherEmail', '==', myObject.email)
                            .get()
                         
                            .then(querySnapshot => {
                                console.log('Matching documents:', querySnapshot.docs.map(doc => doc.data()));
                                querySnapshot.forEach(async doc => {
                                    // Perform update logic for the matched request
                                    console.log('id is',doc.id);
                                    await firebase.firestore().collection('requests').doc(doc.id).delete();

                                });
                            })
                            navigation.goBack();
                        } catch (error) {
                            console.error('Error deleting student:', error);
                        }
                    },
                },
            ],
            { cancelable: true },
        );
    }}
    style={{
        margin: 2,
        marginTop: hp(3),
        color: 'white',
        backgroundColor: themeColors.bg3,
        borderRadius: 4,
        padding: 6,
        height: hp(6.3),
        alignSelf: 'center',
        width: wp(50),
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
    }}
>
    <Text style={{ color: 'white',fontSize:20 }}>Delete</Text>
</TouchableOpacity>



                </View>
            </View>







        </ScrollView>





    );
};

export default StudentInfo;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     
       
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 20,
        shadowColor: 'gray',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 20,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:themeColors.bg3
      },
      input: {
        height: hp(8),
        width:wp(60),
        borderColor: 'gray',
        borderWidth: 1,
        color:themeColors.bg3,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      acceptButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 5,
      },
      cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },

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
        backgroundColor: themeColors.bg3,
        borderRadius: 4,
        padding: 6,
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
    }
});
