import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { useState, useEffect, React } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme'
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import OptionBar from '../components/OptionBar';
import EditProfile from './EditProfile';
import firestore from '@react-native-firebase/firestore';

const AdminSetting = ({ navigation }) => {

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
    <View style={styles.container}>

     
      
        
        <Animatable.View animation="zoomIn" duration={2000}  style={styles.header}>
       
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          {/* <Icon name="settings" size={32} color="#191D88" style={styles.set} /> */}
        <Text style={styles.heading}> {'  '}𝓟𝓻𝓸𝓯𝓲𝓵𝓮 𝓢𝓮𝓽𝓽𝓲𝓷𝓰𝓼</Text>
        </View>
         <View style={styles.circle}> 
      {myObject.ImageURL ? (
        <Image source={{ uri: myObject.ImageURL }} style={styles.selectedImage} />
      ) : (
        <Icon name="person-add" size={86} color="#F4BC1C" style={styles.person} />
      )}
      {/* <Text style={styles.txt}>{myObject.name}</Text>
      <Text style={styles.txtemail}>{myObject.email}</Text> */}
      </View>
      </Animatable.View>
      <View style={{ marginVertical: 50 }}></View>
      <ScrollView style={{}}>
        <OptionBar navigation={navigation} DisplayText='Edit Profile' IconName='user-check'  ></OptionBar>
        <OptionBar navigation={navigation} DisplayText='Teachers Directory' IconName='users' ></OptionBar>

        <OptionBar navigation={navigation} DisplayText='Students Directory' IconName='users' ></OptionBar>
        <OptionBar navigation={navigation} DisplayText='Parents Directory' IconName='users' ></OptionBar>
        {/*<OptionBar navigation={navigation} DisplayText='Help and Support' IconName='check-circle' ></OptionBar>
  <OptionBar navigation={navigation} DisplayText='Terms and Conditions' IconName='file-text' ></OptionBar>
 */}

        <OptionBar navigation={navigation} DisplayText='LogOut' IconName='log-out' ></OptionBar>

      </ScrollView>





    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  circle:
  {
      backgroundColor: '#191D88',
      height: hp(19.7),
      width: wp(41.1),
      borderRadius: 100,
      marginTop: 35,
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
         marginLeft: -37,
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


  btn: {
    backgroundColor: themeColors.bg2,
    borderRadius: 7,
    marginTop: hp(3.3),
    width: wp(60),
    height: hp(6.3),
    alignContent: 'center',
    alignItems: 'center',
    elevation: 2.5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 50,


  },
  btntxt: {
    color: "#191D88",
    alignSelf: "center",
    paddingVertical: 12,
    fontSize: 16,
    paddingHorizontal: 45,
    fontWeight: "500",


  },
  txt: {
    color: themeColors.bg3,
    fontWeight: '500',
    fontSize: 19,
    marginLeft: 70,
    marginTop: -53
  },
  heading: {
    color: themeColors.bg3,
    fontWeight: '500',
    fontSize: 42,

alignSelf:'center',
marginTop:hp(8),
marginLeft:wp(-4),

  

  },
  txtemail: {
    color: themeColors.bg3,
    marginLeft: wp(19)
  }

});
export default AdminSetting