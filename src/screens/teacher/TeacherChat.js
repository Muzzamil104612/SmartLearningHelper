import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet, TextInput, Modal, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RetreiveCount from '../components/retreiveCount';

const TeacherChat = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultFound, setSearchResultFound] = useState(true); // State to track search result status
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);


  
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      
      console.log('Screen focused');
      setSearchQuery(''); 
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      if (searchQuery === '') {
        firestore()
          .collection('StudentsChat')
          .orderBy('createdAt','desc')
          .get()
          .then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
              data.push({ id: doc.id, ...doc.data() });
            });
            console.log('Fetched data:', data); // Log the fetched data
            setFilteredData(data);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });
      }
      
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);




  useEffect(() => {
    if (searchQuery === '') {
      firestore()
        .collection('StudentsChat')
        .orderBy('createdAt','desc')
        .get()
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          console.log('Fetched data:', data); // Log the fetched data
          setFilteredData(data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [searchQuery]);
  
  const handleSearch = async (query) => {
    try {
      let querySnapshot;
    if (selectedFilter == 'Name' || query ==='Name') {
        querySnapshot = await firestore()
          .collection('StudentsChat')
          .where('studentName', '>=', searchQuery)
          .where('studentName', '<=', searchQuery + '\uf8ff')
         
          .get();
      }
      else
      {
        querySnapshot = await firestore()
        .collection('StudentsChat')
        .orderBy('createdAt','desc')
        .get();

      }
      const data = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
    
      data.push({ id: doc.id, ...docData });
    });


      setFilteredData(data);
      setSearchResultFound(data.length > 0); 

    } catch (error) {
      console.error('Error searching data: ', error);
    }
  };



  
  const handleSendMessage = async (studentId,studentUsername,studentImageURL) => {

    navigation.navigate('TeacherChatMessages', {
      studentId, 
      studentUsername
      ,studentImageURL
    
    });

    try {
      const TeacherChatSnapshot = await firestore().collection('StudentsChat').where('studentId', '==',studentId).get();
    
        const docId = TeacherChatSnapshot.docs[0].id;
    
        await firestore().collection('StudentsChat').doc(docId).update({
          unread: false,
         
        });
    
        console.log("Data updated in StudentsChat");
      
    } catch (error) {
      console.error("Error fetching StudentsChat", error);
    }



      
    };
  

  const renderFilteredData =  () => {
    return (
      <View>
        {filteredData.map( (item, index) => (
  <View key={item.studentId} style={[styles.reqpart]}>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.circle}>
        <Image source={{ uri: item.ImageURL }} style={styles.selectedImage} />
      </View>

      <View>
        <View style={{ flexDirection: 'row', width: wp(49) }}>
          {console.log('item:', item)}
          {console.log('studentName:', item.studentName)}
          <Text style={styles.text2}>{item.studentName}</Text>
          {item.unread==true? (
                <Text style={{ color: 'red', fontWeight: '600' ,marginTop:hp(10) ,marginLeft:40}}>New Messages</Text>
              )
              :(  null
              )
              }
        </View>
      </View>

      <TouchableOpacity onPress={() =>handleSendMessage (item.studentId, item.studentName,item.ImageURL)}>
        <Ionicons name="chatbox-outline" size={30} style={{ marginTop: 35, marginLeft: 22 }} color={themeColors.bg2} />
      </TouchableOpacity>
    </View>
  </View>
))}

      </View>
    );
  };


  return (
    <ScrollView style={{marginBottom:hp(8)}} >
       <Text
     style={{
      color:'white',
      margin:15,
      alignSelf:'center',
      fontWeight:'700',
      fontSize:19,
      fontStyle:'italic',
      backgroundColor:themeColors.bg2,
      padding:10,
      borderRadius:5,
      borderStyle:'solid',
      borderColor:themeColors.bg3,
      borderWidth:1.2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 8,
     }}

     >Your Chats with Students</Text>
      <View style={styles.center}>
        <TextInput
          style={styles.searchbox}
          placeholderTextColor={'gray'}
        
          placeholder={`Search by ${selectedFilter ? selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1) : 'Name'}`}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity onPress={() => handleSearch('Name')}>
          <FontAwesome name="search" size={19} color="#191D88" style={{marginLeft:wp(5)}} />
        </TouchableOpacity>
      
      </View>
      <View style={{height:hp(4),}}></View>
      {filteredData.length > 0 ? (
      renderFilteredData()
    ) : (
      <Text style={styles.noRecordText}></Text>
    )}
    
     {!searchResultFound && (
        <Text style={styles.noRecordText}>𝙎𝙤𝙧𝙧𝙮, 𝙉𝙤 𝙍𝙚𝙘𝙤𝙧𝙙 𝙁𝙤𝙪𝙣𝙙</Text>
      )}

<TouchableOpacity
style={{
  marginTop:hp(10),
  marginLeft:wp(-2),
  backgroundColor:themeColors.bg2,
  alignSelf:'center',
  padding:9,
  borderRadius:9
      }}
onPress={() =>{
navigation.navigate('AllStudents');
}

}>
  <Text style={{color:'#191D88' ,marginRight:7 }}> All Students 
<Text>   </Text>
  <FontAwesome name="comment" size={20} color="#191D88" /></Text>
</TouchableOpacity>

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchbox: {
    height: hp(6),
    width: wp(65),
    marginLeft: wp(5),
    backgroundColor: 'white',
    color: 'black',
  },
  noRecordText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
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
  text2:
  {
    color:themeColors.bg3,
    fontSize:17,
    fontWeight:'600',
    marginLeft:wp(4),
    marginTop:hp(4),
  },
  center: {
    height: hp(7),
    width: wp(90),
    backgroundColor: 'white',
    marginTop: hp(2),
    marginLeft: wp(5),
    alignItems: 'center',
    marginBottom: hp(-0.5),
    flexDirection: 'row',
    borderRadius: wp(3),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  btn:{
    marginTop:hp(5.3),
    color:'black',
    backgroundColor:themeColors.bg2,
    borderRadius:4,
    padding:hp(0.7),
    width:wp(17),
  
   
   
   },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: wp(80),
  },
  filterOption: {
    fontSize: 28,
    paddingVertical: 10,
    textAlign:'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    color:'#191D88'
  },
  cancelText: {
    fontSize: 28,
    paddingVertical: 10,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default TeacherChat;
