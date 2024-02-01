import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView,Image,SafeAreaView } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
const AdminHomepage = ({navigation}) => {
  const [teacherRequests, setTeacherRequests] = useState([]);
  const data = useSelector(state => state.value.AdminData);
  const [myObject, setMyObject] = useState({
    userID: '', name: '', email: '', phone: '', experience: '', majorSubject: '', qualification: '',
    password: '', confirmpassword: '', ImageURL: '', documentURL: '',
  });


  useEffect(() => {

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
      console.log('data getted is', myObject.name);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
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
         <Animatable.View animation="zoomIn" duration={2000}  style={styles.header}>
       
       <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        
       <Text style={styles.heading}> {'  '}𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓑𝓪𝓬𝓴</Text>
       </View>
        <View style={styles.circles}> 
     {myObject.ImageURL ? (
       <Image source={{ uri: myObject.ImageURL }} style={styles.selectedImage} />
     ) : (
       <Icon name="person-add" size={86} color="#F4BC1C" style={styles.person} />
     )}
     {/* <Text style={styles.txt}>{myObject.name}</Text>
     <Text style={styles.txtemail}>{myObject.email}</Text> */}
     </View>
     </Animatable.View>


      <Text style={[styles.request, styles.reqheading,]}>Teacher Requests</Text>




      {teacherRequests.length === 0 ? (
  <Text style={{ alignSelf: 'center', marginTop: 38 , color:themeColors.bg3,fontSize:16,textAlign:'center'}}>𝙉𝙤 𝙏𝙚𝙖𝙘𝙝𝙚𝙧 𝙍𝙚𝙦𝙪𝙚𝙨𝙩𝙨 𝙖𝙧𝙚 𝘾𝙪𝙧𝙧𝙚𝙣𝙩𝙡𝙮 𝙋𝙧𝙚𝙨𝙚𝙣𝙩 !</Text>
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
  
  selectedImage: {
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
    marginBottom:hp(9),
  }

  , txt: {
    color: 'black'
  }, request: {
    marginTop: hp(12),
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
    fontSize: 22,
    marginLeft: wp(3),
    fontWeight: '500',
    color:themeColors.bg2,
    width:wp(55),
    backgroundColor:'white',
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
