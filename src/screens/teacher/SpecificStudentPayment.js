import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Linking,ActivityIndicator,Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';

import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import NoticeListCom from '../components/StNoticeListCom';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const SpecificStudentPayment = ({ route, navigation }) => {
    const { student } = route.params;
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const data = useSelector(state => state.value.TeacherData);
    const [showButtons, setShowButtons] = useState('pending');

  const handleAcceptPayment = async (paymentId) => {
    try {
      setLoading(true);
      await firestore().collection('Payments').doc(paymentId).update({
        Status: 'Accepted',
      });
      fetchPayments(); // Fetch payments again after updating the status
      setLoading(false);
      setShowButtons(false); // Hide buttons after accepting
      Alert.alert('Success', 'Payment is Accepted Successfully');
    } catch (error) {
      console.error('Accept payment error:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to accept payment. Please try again.');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      setLoading(true);
      await firestore().collection('Payments').doc(paymentId).update({
        Status: 'Rejected',
      });
      fetchPayments(); // Fetch payments again after deleting a payment
      setLoading(false);
      setShowButtons(false); // Hide buttons after deleting
      Alert.alert(Error, 'Payment is Deleted Successfully');
    } catch (error) {
      console.error('Delete payment error:', error);
      setLoading(false);
      Alert.alert(Error, 'Failed to delete payment. Please try again.');
    }
  };
  
      const fetchPayments = async () => {
        try {
            setLoading(true);
            const paymentsRef = firestore().collection('Payments');
            const querySnapshot = await paymentsRef
                
                .where('studentEmail', '==', student.email)
                .where('teacherEmail', '==', data.email)
                .get();

            const paymentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPayments(paymentsData);
        } catch (error) {
            console.error('Error fetching payments:', error);
            Alert.alert('Error', 'Failed to fetch payments. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const handleLinkPress = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        Linking.openURL(url);
    };
    
    const renderPaymentItem = ({ item }) => (
      
        <View key={item.index} style={[styles[item.Status === 'Pending' ? 'reqpart1' : 'reqpart']]}>
            
          <View style={{ flexDirection: 'row', marginTop: hp(3), marginLeft: wp(8) }}>
            <Text style={{ color: themeColors.bg3, fontSize: 20, fontWeight: '700' }}>Date: </Text>
            <Text style={{ color: themeColors.bg2, fontSize: 20, fontWeight: '700' }}>{`${item.date.toDate().toDateString()}`}</Text>
          </View>
         
          {item.Status=='Pending' && (
            <View>
             <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',}}>
             <TouchableOpacity
               style={styles.viewTransactionButton}
               onPress={
                 
                   () => handleLinkPress(item.ImageURL)}
             >
             
               <Text style={styles.viewTransactionButtonText}>View Transaction Slip</Text>
             </TouchableOpacity>
             </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: hp(1.5) }}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => handleAcceptPayment(item.id)}
          >
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeletePayment(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        </View>
      )}
      {(item.Status=='Accepted'||item.Status=='Rejected') && (
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',alignItems:'center'}}>
         <TouchableOpacity
           style={styles.viewTransactionButton}
           onPress={
             
               () => handleLinkPress(item.ImageURL)}
         >
           <Text style={styles.viewTransactionButtonText}>View Transaction Slip</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.viewTransactionButton1}
          
           
         >
           <Text style={styles.viewTransactionButtonText}>{item.Status}</Text>
         </TouchableOpacity>
         </View>
      )}
        </View>
      );
    useEffect(() => {
        fetchPayments();
    }, []);
    
  
      



   

    return (
        
        <SafeAreaView style={{ flex: 1 }}>
             {loading ? ( // Check if isLoading is true, show loading indicator
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color="#F4BC1C" />
                </View>
            ) 
            :
            ( 
            <Animatable.View animation="zoomIn" duration={2000} style={styles.container}>
                <View style={{justifyContent:'center',alignItems:"center",alignContent:"center",marginTop:hp(3)}}>
           <Text
            style={{
                
                fontSize: 24,
                fontWeight: '800',
                color:themeColors.bg3,
                padding:12,
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
        marginBottom:hp(2),
        

            }}>𝙋𝙖𝙮𝙢𝙚𝙣𝙩𝙨</Text></View>
                {payments.length === 0 ? ( // Check if there are no payments
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
               <Text style={{ alignSelf: 'center',marginTop:hp(-15), color: themeColors.bg2, fontSize: 30, textAlign: 'center' }}>𝑵𝒐 𝑷𝒂𝒚𝒎𝒆𝒏𝒕𝒔 𝑭𝒐𝒖𝒏𝒅</Text>
            </View>
          ) : (
            <FlatList
              data={payments}
              keyExtractor={(item) => item.id}
              renderItem={renderPaymentItem}
            />
          )}
               
            </Animatable.View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    paymentItemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      viewTransactionButton: {
        backgroundColor: '#F4BC1C',
        justifyContent:'center',
        alignItems:'center',
        height:hp(5),
        width:wp(45),
        justifyContent:'center',
        borderRadius: 8,
        marginTop:hp(1.5),
      },
      acceptButton: {
        backgroundColor: 'green',
        height: hp(6),
        width: wp(30),
        justifyContent: 'center',
        borderRadius: 8,
      },
      acceptButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
      },
      deleteButton: {
        backgroundColor: 'red',
        height: hp(6),
        marginLeft: wp(3),
        width: wp(30),
        justifyContent: 'center',
        borderRadius: 8,
      },
      deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
      },
      viewTransactionButton1: {
        backgroundColor: themeColors.bg3,
        height:hp(5),
        marginLeft:wp(3),
        width:wp(30),
      
       justifyContent:'center',
        borderRadius: 8,
        marginTop:hp(1.5),
      },
      viewTransactionButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign:'center',
        fontSize:14
      },
    header: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: hp(3),
        marginBottom: hp(2),
        color: themeColors.bg3,
    },
    loadingContainer: {
    
        height:hp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Add this line to cover the background
      
  },
    add: {
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
    reqpart: {
        backgroundColor: "white",
        borderRadius:9,
       
        height:hp(16),
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
    reqpart1: {
        backgroundColor: "white",
        borderRadius:9,
       
        height:hp(26),
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
    plusButtonText: {
        color: 'gray',
        fontSize: 34,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    
    txt: {

        alignSelf: 'center',
        color: themeColors.bg3,
        fontSize:22
    }
});

export default SpecificStudentPayment;
