import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { themeColors } from '../../theme';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import TeacherStarRating from '../components/TeacherStarRating'; // Import the TeacherStarRating component
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CurrentTeachers = ({ navigation }) => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [matchingTeachers, setMatchingTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [delayedLoading, setDelayedLoading] = useState(true);
    const data = useSelector(state => state.value.stdData);
    const data1 = useSelector(state => state.value.selectedStudent);
    let currentUserEmail;

    if (data && data.email) {
        currentUserEmail = data.email;
    } else if (data1 && data1.email) {
        currentUserEmail = data1.email;
        console.log('data is :', data1);
    }

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const querySnapshot = await firestore()
                    .collection('requests')
                    .where('studentEmail', '==', currentUserEmail)
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
                setLoading(false);
            }
        };

        fetchPendingRequests();
    }, [currentUserEmail]);

    useEffect(() => {
        const fetchMatchingTeachers = async () => {
            try {
                const teacherEmails = pendingRequests.map(request => request.teacherEmail);
                const querySnapshot = await firestore()
                    .collection('Teachers')
                    .where('email', 'in', teacherEmails)
                    .get();
    
                const teachersData = querySnapshot.docs.map(doc => doc.data());
    
                teachersData.sort((a, b) => b.rating - a.rating);
    
                setMatchingTeachers(teachersData);
            } catch (error) {
                console.error('Error fetching matching teachers: ', error);
            }
        };
    
        if (pendingRequests.length > 0) {
            fetchMatchingTeachers();
        }
    }, [pendingRequests]);
    

    return (
        <View style={styles.container}>
            <View style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: "center",
                height: hp(10),
                marginBottom: hp(1),
            }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: '800',
                        color: themeColors.bg2,
                        padding: 8,
                        backgroundColor: 'white',
                        width: wp(50),
                        borderRadius: hp(1),
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.8,
                        shadowRadius: 4,
                        elevation: 2,
                        textAlign: 'center',
                    }}>
                    𝘾𝙪𝙧𝙧𝙚𝙣𝙩 𝙏𝙪𝙩𝙤𝙧𝙨
                </Text>
            </View>
            {delayedLoading ? (
                <ActivityIndicator size="large" color={themeColors.bg2} style={styles.loadingIndicator} />
            ) : matchingTeachers.length > 0 ? (
                <View>
                    <View style={{ marginBottom: hp(15), backgroundColor: 'white' }}>
                        {matchingTeachers.map((child, index) => (
                            <View key={index} style={[styles.reqpart]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.circle2}>
                                        <Image source={{ uri: child.ImageURL }} style={styles.selectedImage2} />
                                    </View>
                                    <View >
                                        <View style={{ flexDirection: 'row', width: wp(49) }}>
                                            <Text style={styles.text2}>{child.name}</Text>
                                        </View>
                                        <Text style={styles.text}>{child.qualification}</Text>
                                        <View style={styles.ratingContainer}>
                                            <TeacherStarRating teacherEmail={child.email} /> 
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('TeacherInfo', {
                                                teacher: child,
                                                source: 'currentTeachers',
                                                stdemail: currentUserEmail,
                                            })
                                        }>
                                        <View style={[styles.btn]}>
                                            <Text style={{ color: 'black', textAlign: 'center' }}>Details</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            ) : (
                <Text
                    style={{
                        color: themeColors.bg3,
                        padding: 10,
                        fontSize: 27,
                        marginTop: hp(20),
                        height: hp(100),
                        textAlign: 'center'
                    }}
                >𝙉𝙤 𝘾𝙪𝙧𝙧𝙚𝙣𝙩 𝙏𝙪𝙩𝙤𝙧𝙨 𝙁𝙤𝙪𝙣𝙙</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    circle2: {
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
    text: {
        color: themeColors.bg2,
        marginLeft: wp(4),
    },
    selectedImage2: {
        backgroundColor: 'white',
        height: hp(10),
        width: wp(20),
        borderRadius: 100,
        borderWidth: hp(0.3),
        borderStyle: 'solid',
        borderColor: themeColors.bg3,
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
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    btn: {
        marginTop: hp(5.3),
        color: 'black',
        backgroundColor: themeColors.bg2,
        borderRadius: 4,
        padding: hp(0.3),
        width: wp(17),
        marginLeft: wp(-9)
    },
    loadingIndicator: {
        marginTop: hp(30),
    },
    text2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: wp(3.7),
        marginTop: hp(3),
        color: themeColors.bg3
    },
    reqpart: {
        backgroundColor: "white",
        borderRadius: 9,
        height: hp(14),
        paddingLeft: wp(2),
        marginHorizontal: wp(3),
        marginVertical: hp(1),
        shadowColor: 'gray',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 8,
    },
    ratingContainer:{
        marginLeft:wp(3.4),
        padding:2

    }
});

export default CurrentTeachers;
