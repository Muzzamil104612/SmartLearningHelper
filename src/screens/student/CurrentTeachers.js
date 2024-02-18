import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { themeColors } from '../../theme';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CurrentTeachers = ({ navigation }) => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [matchingTeachers, setMatchingTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const data = useSelector(state => state.value.stdData);
    const currentUserEmail = data.email;

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
                setLoading(false); // Set loading to false after fetching data
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
                setMatchingTeachers(teachersData);
            } catch (error) {
                console.error('Error fetching matching teachers: ', error);
            }
        };

        if (pendingRequests.length > 0) {
            fetchMatchingTeachers();
        }
    }, [pendingRequests]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={themeColors.bg2} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text
            style={{

                fontSize: 21,
                fontWeight: '800',
                color:themeColors.bg2,
                padding:12

            }}>
                My Teachers
            </Text>
            {matchingTeachers.length > 0 ? (
                <View>
                    {matchingTeachers.map((teacher, index) => (
                        <TouchableOpacity key={index} style={styles.teacherCard} 
                        onPress={() => 
                        
                            navigation.navigate('TeacherInfo', {
                                teacher: teacher ,
                                source:'CurrentTeachers',
                                stdemail:currentUserEmail,
                              })
                            }
                        
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.circle}>
                                    <Image source={{ uri: teacher.ImageURL }} style={styles.selectedImage} />
                                </View>

                                <View style={{ flexDirection: 'row', width: wp(49) }}>
                                    <Text style={styles.text2}>{teacher.name}</Text>
                                    <Text style={styles.text3}>{teacher.majorSubject}</Text>
                                </View>
                                
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <Text
                style={{
                    color: themeColors.bg3,
                    padding: 10,
                    fontSize:25,
                    margin:15
                }}
                >𝓝𝓸 𝓬𝓾𝓻𝓻𝓮𝓷𝓽 𝓽𝓮𝓪𝓬𝓱𝓮𝓻𝓼 𝓯𝓸𝓾𝓷𝓭</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        backgroundColor: 'white',
        padding:20
    },
    circle: {
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
    selectedImage: {
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
    teacherCard: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    text2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: wp(3.7),
        marginTop: hp(3),
        color:themeColors.bg3
    },
    text3: {
        fontSize: 13,
        fontWeight: '400',
        marginLeft:wp(-18),
        marginTop: hp(6.8),
        color:themeColors.bg2
    },
});

export default CurrentTeachers;
