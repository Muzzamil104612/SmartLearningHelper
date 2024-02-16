import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView,ScrollView, KeyboardAvoidingView ,TextInput, Modal, FlatList, Alert } from 'react-native';
import React, { useState, useEffect ,useRef} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NoticeListCom from '../components/StNoticeListCom';
import { themeColors } from '../../theme';
import storage from '@react-native-firebase/storage';
import * as Animatable from 'react-native-animatable';
const GroupDetails = ({ route, navigation }) => {
    const { groupId } = route.params;
    const [noticeList, setNoticeList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]); 
   
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
      
 
      
     
    
      
      const renderItem = ({ item }) => {
  
        return (
            <NoticeListCom
                name={item.title}   
                Rollnumber={item.message}
                
               documentName={item.documentName} // Pass the document name here
               documentUrl={item.documentURL}
                onEdit={() => navigation.navigate('EdtNotice', { data: item })}
                onDelete={() => deleteNotice(item.id,item.documentName)}
                
            />
        );
    };

   
    return (
       
        <SafeAreaView style={{ flex: 1 }}>
  <Animatable.View animation="zoomIn" duration={2000}  style={styles.container}>
  <Text style={styles.header}>𝘾𝙡𝙖𝙨𝙨 𝘿𝙞𝙨𝙘𝙪𝙨𝙨𝙞𝙤𝙣</Text>
                <FlatList
                   data={filteredData.length > 0 ? filteredData : noticeList} // Use the filtered data for rendering if available
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                   removeClippedSubviews={false}


                />
          

               
       
              

                <View style={styles.add}>

                    <TouchableOpacity style={styles.fixedPlusButton} onPress={()=>{
                    
                       
    navigation.navigate('NoticeList', { groupId });
                    }} >
                        <Text style={styles.plusButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

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
        textAlign:'center',
           fontSize: 25,
           fontWeight: 'bold',
         marginTop:hp(3),
         marginBottom: hp(2),
         color:themeColors.bg3
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
  
    
   
   
   
    
});

export default GroupDetails;