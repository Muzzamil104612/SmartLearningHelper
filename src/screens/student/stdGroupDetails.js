import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, Modal, FlatList, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NoticeListCom from '../components/StNoticeListCom';
import { themeColors } from '../../theme';
import storage from '@react-native-firebase/storage';
import * as Animatable from 'react-native-animatable';
const StdGroupDetails = ({ route, navigation }) => {
    const { groupId } = route.params;
    const [noticeList, setNoticeList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [subject, setSubject] = useState('');
    const [teacherEmail, setteacherEmail] = useState('');
    const [studentEmail, setstudentEmail] = useState('');
    const [parenttEmail, setparentEmail] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [studentName, setStudentName] = useState('');
    const [parentName, setParentName] = useState('');

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('groups')
            .doc(groupId)
            .collection('SubjectMaterial')
            .onSnapshot((querySnapshot) => {
                const noticeData = querySnapshot.docs.map((documentSnapshot) => {
                    return {
                        id: documentSnapshot.id,
                        ...documentSnapshot.data(),
                    };
                });
                setNoticeList(noticeData);
            });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('groups')
            .doc(groupId)
            .onSnapshot((doc) => {
                const subjectData = doc.data().Subject;
                const teacherEmail = doc.data().teacherEmail;
                const studentEmail = doc.data().studentEmail;
                const parentEmail = doc.data().parentEmail;
                console.log(parentEmail);

                setparentEmail(parentEmail);
                setSubject(subjectData);
                setteacherEmail(teacherEmail);
                setstudentEmail(studentEmail);
               


             {/*   firestore().collection('Parents').where('email', '==', parentEmail).get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        const parent = querySnapshot.docs[0].data();
                        setParentName(parent.name);
                    }
                })
                .catch(error => console.error('Error fetching parent data: ', error));
                */} 
                firestore().collection('Teachers').where('email', '==', teacherEmail).get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            const teacher = querySnapshot.docs[0].data();
                            setTeacherName(teacher.name);
                        }
                    })
                    .catch(error => console.error('Error fetching teacher data: ', error));

                
                firestore().collection('Students').where('email', '==', studentEmail).get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            const student = querySnapshot.docs[0].data();
                            setStudentName(student.name);
                        }
                    })
                    .catch(error => console.error('Error fetching student data: ', error));

                
                
            });

        return () => unsubscribe();
    }, []);


    const renderItem = ({ item }) => {

        return (
            <NoticeListCom
                name={item.title}
                Rollnumber={item.message}

                documentName={item.documentName}
                documentUrl={item.documentURL}
                onEdit={() => navigation.navigate('EdtNotice', { data: item })}
                onDelete={() => deleteNotice(item.id, item.documentName)}

            />
        );
    };


    return (

        <SafeAreaView style={{ flex: 1 }}>
            <Animatable.View animation="zoomIn" duration={2000} style={styles.container}>
                <Text style={styles.header}>𝘾𝙡𝙖𝙨𝙨 𝘿𝙞𝙨𝙘𝙪𝙨𝙨𝙞𝙤𝙣</Text>
                <Text style={styles.txt}>𝓣𝓮𝓪𝓬𝓱𝓮𝓻 : <Text style={{ color: themeColors.bg2,   fontSize:16 }}>{teacherName}</Text></Text>
                <Text style={styles.txt}>𝓢𝓽𝓾𝓭𝓮𝓷𝓽 : <Text style={{ color: themeColors.bg2,   fontSize:16  }}>{studentName}</Text></Text>
              {/*  <Text style={styles.txt}>Parent : <Text style={{ color: themeColors.bg2 }}>{parentName}</Text></Text>*/} 
                <Text style={styles.txt}>𝓢𝓾𝓫𝓳𝓮𝓬𝓽 : <Text style={{ color: themeColors.bg2 ,   fontSize:16 }}>{subject}</Text></Text>

                <FlatList
                    data={filteredData.length > 0 ? filteredData : noticeList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={false}


                />







            </Animatable.View>

        </SafeAreaView>

    );
};


const styles = StyleSheet.create({
    searchbox:
    {

        height: hp(6),
        width: wp(49),
        backgroundColor: 'white',
        color: "black",


    },
    header: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: hp(3),
        marginBottom: hp(2),
        color: themeColors.bg3
    },
    center:
    {
        height: hp(6),
        width: wp(69),
        backgroundColor: 'white',
        marginTop: hp(1.5),
        marginBottom: hp(-0.5),
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: wp(3),

    },

    add:
    {
        height: hp(99),
        width: wp(96),

        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    fixedPlusButton: {
        position: 'absolute',
        height: hp(10),
        width: wp(20),
        backgroundColor: 'white',
        borderRadius: 50,
        bottom: hp(2.3),
        right: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 10,
            height: 10,

        },
        shadowOpacity: 4,
        shadowRadius: 5,
        elevation: 10,
    },
    plusButtonText: {
        color: 'gray',
        fontSize: 34,
        fontWeight: 'bold',
    },



    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    txt: {

        alignSelf: 'center',
        color: themeColors.bg3,
       fontSize:22,
    }





});

export default StdGroupDetails;