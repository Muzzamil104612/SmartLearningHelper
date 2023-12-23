import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView,Image } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
const AdminHomepage = ({navigation}) => {
  const [teacherRequests, setTeacherRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Teachers')
      .where('Status', '==', 'pending')
      .onSnapshot((snapshot) => {
        const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTeacherRequests(requests);
        console.log("-----------"+teacherRequests+"----------");
      });

    return () => unsubscribe();
  }, []);

  const approveRequest = async (requestId) => {
    try {
      await firebase.firestore().collection('Teachers').doc(requestId).update({
        Status: 'approved',
      });
    } catch (error) {
      // Handle errors
    }
  };



  const viewDetails = (teacher) => {
    navigation.navigate('TeacherDetails', { teacher });
  };

  return (
    <ScrollView style={styles.container}>


      <Text style={[styles.request, styles.reqheading,]}>Teacher Requests:</Text>




      {teacherRequests.length === 0 ? (
  <Text style={{ alignSelf: 'center', marginTop: 20 , color:themeColors.bg3,fontSize:17}}>𝙉𝙤 𝙩𝙚𝙖𝙘𝙝𝙚𝙧 𝙧𝙚𝙦𝙪𝙚𝙨𝙩𝙨 𝙖𝙧𝙚 𝙘𝙪𝙧𝙧𝙚𝙣𝙩𝙡𝙮 
  𝙥𝙧𝙚𝙨𝙚𝙣𝙩 !</Text>
) : (
  teacherRequests.map((request) => (
    <View key={request.id} style={[styles.reqpart]}>
      <View style={{flexDirection:'row'}}>
         <View style={styles.circle}>
         <Image source={{ uri: request.ImageURL }} style={styles.selectedImage} />
         </View>
      {/* <Text style={styles.txt}>Name: {request.name}</Text>
      <Text style={styles.txt}>Email: {request.email}</Text>
      <Text style={styles.txt}>Major Subject: {request.majorSubject}</Text>
      <Text style={styles.txt}>Qualification: {request.qualification}</Text>
      <Text style={styles.txt}>Experience: {request.experience} years</Text> */}
      <View >
        <View style={{flexDirection:'row',width:wp(49)}}>
      <Text style={styles.text2}>{request.name}</Text>
      
      </View>
      <Text style={styles.text}>{request.qualification}</Text>
      </View>
      <TouchableOpacity onPress={() => viewDetails(request)}>
        <View style={[styles.btn]}>
          <Text style={{ color: 'black',textAlign:'center' }}>Details</Text>
        </View>
      </TouchableOpacity>
      </View>
    
    </View>
  ))
)}

    </ScrollView>
  );
};

export default AdminHomepage;

const styles = StyleSheet.create({
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
    marginBottom:hp(9),
  }

  , txt: {
    color: 'black'
  }, request: {
    marginTop: hp(8),
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
                elevation: 3,
    fontSize: 19,
    marginLeft: wp(4),
    fontWeight: '700',
    color:themeColors.bg3,
    width:wp(47),
    backgroundColor:'#FFCD4B',
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
  padding:hp(0.7),
  width:wp(17),

 
 
 }
});
