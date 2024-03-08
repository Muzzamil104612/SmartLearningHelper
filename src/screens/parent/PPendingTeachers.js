import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { themeColors } from '../../theme';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TeacherStarRating from '../components/TeacherStarRating';

const PPendingTeachers = ({ navigation }) => {
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
    }

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const querySnapshot = await firestore()
                    .collection('requests')
                    .where('studentEmail', '==', currentUserEmail)
                    .where('status', '==', 'pending')
                    .get();

                const requestsData = querySnapshot.docs.map(doc => doc.data());
                setPendingRequests(requestsData);
            } catch (error) {
                console.error('Error fetching pending requests: ', error);
                setLoading(false);
              
                setDelayedLoading(false);
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
             <View style={{justifyContent:'center',
        alignContent:'center',
        alignItems:"center",
        height:hp(10),
        marginBottom:hp(2),
        }}>
            <Text
            style={{
                
                fontSize: 21,
                fontWeight: '800',
                color:themeColors.bg2,
                padding:8,
                backgroundColor:'white',
                width:wp(50),
                borderRadius:hp(1),
                shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation:2,
        textAlign:'center',
        

            }}>
                𝙍𝙚𝙦𝙪𝙚𝙨𝙩𝙚𝙙 𝙏𝙪𝙩𝙤𝙧𝙨
            </Text>
            </View>
            {delayedLoading ? (
        // Show a delayed loading indicator
        <ActivityIndicator size="large" color={themeColors.bg2} style={styles.loadingIndicator} />
      ) :
            matchingTeachers.length > 0 ? (
                <View>
                 
                             <View style={{marginBottom:hp(15),backgroundColor:'white'}}>
                    {matchingTeachers.map((child, index) => (
                      <View key={index} style={[styles.reqpart]}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.circle2}>
                                <Image source={{ uri: child.ImageURL }} style={styles.selectedImage2} />
                            </View>

                            <View style={{marginTop:hp(-1.4)}}>
                                <View style={{ flexDirection: 'row', width: wp(49) }}>
                                    <Text style={styles.text2}>{child.name}</Text>

                                </View>
                                <Text style={styles.text}>{child.qualification}</Text>
                            </View>
                            
                            <TouchableOpacity 
                               onPress={() => 
                        
                            navigation.navigate('PTeacherInfo', {
                                teacher: child ,
                                source:'PendingTeachers',
                                stdemail:currentUserEmail,
                              })
                            }>
                                <View style={[styles.btn]}>
                                    <Text style={{ color: 'black', textAlign: 'center' }}>Details</Text>
                                </View>
                                <View style={styles.ratingContainer}>
                                    <TeacherStarRating teacherEmail={child.email} /> 
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
                    fontSize:29,
                    marginTop:hp(20),
                    height:hp(100),
                   textAlign:'center'
                }}>𝑵𝒐 𝑹𝒆𝒒𝒖𝒆𝒔𝒕𝒆𝒅 𝑻𝒖𝒕𝒐𝒓𝒔 𝑭𝒐𝒖𝒏𝒅</Text>
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
    text:
{
  color:themeColors.bg2,
  marginLeft:wp(4),
 // marginTop:hp(-1),
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
        color: themeColors.bg3
    },
    text3: {
        fontSize: 13,
        fontWeight: '400',
        marginLeft: wp(-18),
        marginTop: hp(6.8),
        color: themeColors.bg2
    },
    container: {
        flex: 1,

        backgroundColor: 'white',
        padding: 20
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
        color: themeColors.bg3
    },
    text3: {
        fontSize: 13,
        fontWeight: '400',
        marginLeft: wp(-18),
        marginTop: hp(6.8),
        color: themeColors.bg2
    },
    loadingIndicator: {
        marginTop: hp(30), // Adjust the marginTop as needed
      },
      
    selectedImage: {
      backgroundColor: 'white',
      height: hp(10),
      width: wp(20),
      borderRadius: 100,
      borderWidth:hp(0.3),
      borderStyle:'solid',
      borderColor:themeColors.bg3,
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
    text:
    {
      color:themeColors.bg2,
      marginLeft:wp(4),
     // marginTop:hp(-1),
    },
    circles:
    {
        backgroundColor: '#191D88',
        height: hp(19.7),
        width: wp(41.1),
        borderRadius: 100,
        marginTop: 25,
        marginLeft: 129,
        alignContent: 'center',
        justifyContent: 'center',
       
    },
    header:
      {
          height: hp(30),
          width: wp(110),
          backgroundColor: '#FFCD4B',
          borderRadius: 200,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
           marginTop: -40,
           marginLeft: -18,
      },
    
    selectedImage1: {
      backgroundColor: 'white',
      height: hp(19),
      width: wp(39),
      marginLeft:wp(1),
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
    container1: {
      flex: 0.5,
  
      alignItems: 'center',
      backgroundColor: 'white'
    },
  
    person:
    {
      alignSelf: 'center',
  
    },
   set:
    {
      color: themeColors.bg3,
     
  alignSelf:'center',
  marginTop:hp(8),
  
  
  
    },
    heading: {
      color: themeColors.bg3,
      fontWeight: '500',
      fontSize: 39,
  alignSelf:'center',
  marginTop:hp(8),
  marginLeft:wp(-4),
  
    
  
    },
    person:
    {
      alignSelf: 'center',
  
    },
    text2:
    {
      color:themeColors.bg3,
      fontSize:17,
      fontWeight:'600',
      marginLeft:wp(4),
      marginTop:hp(4),
    },
    text3:
    {
      color:themeColors.bg3,
      fontSize:20,
      fontWeight:'600',
      marginLeft:wp(1),
      marginTop:hp(4),
    },
    circle:
    {
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
  
    container: {
      height:hp(200),
      backgroundColor: "white",
     
      padding:20,
    }
  
    , txt: {
      color: 'black'
    }, request: {
      marginTop: hp(7),
    },
    reqheading: {
      marginBottom:hp(3),
      shadowColor: 'black',
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  elevation: 1,
      fontSize: 38,
      marginLeft: wp(3),
      fontWeight: '500',
      color:themeColors.bg3,
      height:hp(9),
      width:wp(86),
      backgroundColor:themeColors.bg2,
      borderRadius:hp(1),
      padding:hp(1),
      marginRight:hp(20)
    },
    reqpart: {
      backgroundColor: "white",
      borderRadius:9,
     
      height:hp(14),
      paddingLeft:wp(2),
      
      marginHorizontal: wp(3),
      marginVertical:hp(1),
      shadowColor: 'gray',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 8,
    },
   btn:{
    marginTop:hp(5.3),
    color:'black',
    backgroundColor:themeColors.bg2,
    borderRadius:4,
    padding:hp(0.3),
    width:wp(17),
    marginLeft:wp(-9)
  
   
   
   },
   ratingContainer: {
    flexDirection: 'row',
    marginLeft: wp(-46),
    marginTop: hp(0.3)
}
});

export default PPendingTeachers;
