import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native'
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
import { useSelector } from 'react-redux';

import AdminSetting from './AdminSetting';


const EditProfile = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    const data = useSelector(state => state.value.AdminData);

    const [myObject, setMyObject] = useState({
        userID: '', name: '', email: '', phone: '', experience: '', majorSubject: '', qualification: '',
        password: '', confirmpassword: '', ImageURL: '', documentURL: '',
    });



    useEffect(() => {
        console.log(myObject.userID);

        setMyObject(data);
        fetchDataFromFirestore();
        const focusListener = navigation.addListener('focus', () => {
            fetchDataFromFirestore();
        });

        return () => {
            focusListener();
        };
    }, [data, navigation]);


    const fetchDataFromFirestore = async () => {
        try {
            const docRef = await firestore().collection('Admin').doc(myObject.userID).get();
            const docData = docRef.data();
            if (docData) {
                setMyObject(docData);
            }
            console.log('data getted is', myObject.userID, myObject.email, myObject.name);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };




    const updateProfile = async () => {
        try {
            setLoading(true); // Set loading to true when starting the update process
    
            const userSnapshot = await firestore().collection('Admin').where('userID', '==', myObject.userID).get();
    
            if (userSnapshot.empty) {
                console.log('No user found with the specified email address');
            } else {
                const userId = userSnapshot.docs[0].id;
    
                await firestore().collection('Admin').doc(userId).update({
                    name: myObject.name,
                    email: myObject.email,
                    phone: myObject.phone,
                    experience: myObject.experience,
                    majorSubject: myObject.majorSubject,
                    qualification: myObject.qualification,
                    ImageURL: myObject.ImageURL,
                    userID: userId,
                    password: myObject.password,
                });
    
                fetchDataFromFirestore();
                console.log('User document updated successfully');
                navigation.navigate('AdminSetting');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setLoading(false); // Set loading to false when the update process is completed (either success or failure)
        }
    };
    
    const selectImage = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            compressImageMaxWidth: 500,
            compressImageMaxHeight: 500,
            compressImageQuality: 0.7,
            cropping: true,
        })
            .then(response => {
                if (!response.didCancel) {
                    setMyObject({ ...myObject, ImageURL: response.path });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
              {loading ? ( // Check if loading is true, then show the ActivityIndicator
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={themeColors.bg2} />
            </View>
        ) : (
          
       
            <View>
                <SafeAreaView style={styles.container1}>


                    <Animatable.View animation="fadeInUpBig" duration={1000} style={styles.imgview}>
                        <Text style={{ color: '#F4BC1C', alignSelf: "center", fontSize: 28, fontWeight: "500", marginBottom: hp(1.5) }}>Edit Your Profile!</Text>
                        <View style={styles.circle}>
                            <TouchableOpacity onPress={selectImage}>
                                {myObject.ImageURL ? (
                                    <Image source={{ uri: myObject.ImageURL }} style={styles.selectedImage} />
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
                            value={myObject.name}
                            secureTextEntry={false}
                            keyboardType="default"
                            editable={true}
                        />

                        <TextInputComponent
                            onChangeText={Text => setMyObject({ ...myObject, email: (Text) })}
                            label="Email Address"
                            value={myObject.email}
                            placeholder="john23@gmail.com"
                            secureTextEntry={false}
                            keyboardType="default"
                            editable={false}
                        />
                        <TextInputComponent
                            onChangeText={Text => setMyObject({ ...myObject, experience: (Text) })}
                            label="Years of Experience"
                            placeholder="4"
                            value={myObject.experience}
                            secureTextEntry={false}
                            keyboardType="numeric"
                            editable={true}
                        />
                        <TextInputComponent
                            onChangeText={Text => setMyObject({ ...myObject, majorSubject: (Text) })}
                            label="Major Subject"
                            placeholder="Databases"
                            value={myObject.majorSubject}
                            secureTextEntry={false}
                            keyboardType="default"
                            editable={true}
                        />
                        <TextInputComponent
                            onChangeText={Text => setMyObject({ ...myObject, qualification: (Text) })}
                            label="Qualification"
                            placeholder="Bachelors of Computer Sciences(or BSCS)"
                            secureTextEntry={false}
                            editable={true}
                            value={myObject.qualification}
                            keyboardType="default"
                        />

                        <TextInputComponent
                            onChangeText={Text => setMyObject({ ...myObject, phone: (Text) })}
                            label="Contact No."
                            value={myObject.phone}
                            placeholder="+923456675634"
                            secureTextEntry={false}
                            keyboardType="numeric"
                            editable={true}
                        />

                        <TextInputComponent
                            onChangeText={Text => setMyObject({ ...myObject, password: (Text) })}
                            label="Password"
                            placeholder="123@john.smith"
                            value={myObject.password}
                            editable={true}
                            keyboardType="default"
                            autoCorrect={false}
                        />


                    </View>

                    <View style={styles.bottonPart}>
                        <TouchableOpacity style={styles.btn} onPress={() => { updateProfile() }}>
                            <Text style={styles.btntxt}>Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
             )}
        </ScrollView>
    );
};




const styles = StyleSheet.create({
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
        height: hp(105),
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
        width: wp(60),
        height: hp(6.3),

        elevation: 2.5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 50,
        marginLeft: 70,
        marginBottom: hp(-5)


    },
    btntxt: {
        color: themeColors.bg3,
        alignSelf: "center",
        paddingVertical: 12,
        fontSize: 16,
        paddingHorizontal: 45,
        fontWeight: "500",


    },
    bottonPart: {
        height: hp(2),


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
export default EditProfile;