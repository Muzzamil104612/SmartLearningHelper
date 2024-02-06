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




    </ScrollView>
  );
};

export default AdminHomepage;

const styles = StyleSheet.create({
  

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
         marginBottom:hp(10)
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
    
    backgroundColor: "white",
   
    flex:1,
  }

  
});
