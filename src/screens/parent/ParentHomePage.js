import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,FlatList,ScrollView,Image,SafeAreaView,ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { saveStudentInfo,stdemail } from '../../redux/action';
import OptionCom from '../components/OptionCom';
const ParentHomepage = ({navigation}) => {

  const [pendingRequests, setPendingRequests] = useState([]);
  const [matchingChild, setMatchingChild] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState('');
  const dispatch = useDispatch();
  dispatch(saveStudentInfo(null));
  const viewDetails = (student) => {
    console.log(student);
    dispatch(stdemail(null));  
    dispatch(saveStudentInfo(student));
    navigation.navigate('ChildDetail', { student });
  };
  const data = useSelector(state => state.value.parentData);
  const [myObject, setMyObject] = useState({
    userID: '', name: '', email: '', phone: '',
    password: '', confirmpassword: '', ImageURL: '',
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
  const fetchChildren = async () => {
    try {
        const querySnapshot = await firestore()
            .collection('Students')
            .where('parentEmail', '==', myObject.email)
            .get();

        const childData = querySnapshot.docs.map(doc => doc.data());
        console.log('child is', childData);
        setMatchingChild(childData);
    } catch (error) {
        console.error('Error fetching matching Child: ', error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    if (myObject.email) {
        setLoading(true);
        fetchChildren();
    }
}, [myObject.email]);

 
 

  


  const fetchDataFromFirestore = async () => {
    try {
      const docRef = await firestore().collection('Teachers').doc(myObject.userID).get();
      const docData = docRef.data();
      if (docData) {
        setMyObject(docData);
      }
      console.log('data getted is', myObject.email);
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
   
     </View>
     </Animatable.View>
     
     <Text
                style={{

                    fontSize: 28,
                    fontWeight: '700',
                    color: themeColors.bg2,
                    padding: 12,
                    marginTop:hp(2),

                }}>
               𝙈𝙮 𝘾𝙝𝙞𝙡𝙙𝙧𝙚𝙣:
            </Text>
            {loading ? (
    <View style={{ marginTop: 20 }}>
    <ActivityIndicator size="large" color="#F4BC1C" />
  </View>
  ) : matchingChild.length > 0 ? (
       
          
                <View style={{marginBottom:hp(15),backgroundColor:'white'}}>
                    {matchingChild.map((child, index) => (
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
                            </View>
                            <TouchableOpacity 
                            onPress={() => viewDetails(child)}>
                                <View style={[styles.btn]}>
                                    <Text style={{ color: 'black', textAlign: 'center' }}>Details</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        </View>

                    ))}
                </View>
                 
            ) : (
                <Text
                    style={{
                        color: themeColors.bg3,
                        padding: 10,
                        fontSize: 25,
                        margin: 15,
                        backgroundColor:themeColors.bg2,
                        borderRadius:hp(3),
                        marginTop:hp(1),
                    }}
                >𝓝𝓸 𝓒𝓱𝓲𝓵𝓭 𝓲𝓼 𝓡𝓮𝓰𝓲𝓼𝓽𝓮𝓻𝓮𝓭.."𝓘𝓽 𝓵𝓸𝓸𝓴𝓼 𝓵𝓲𝓴𝓮 𝔂𝓸𝓾 𝓱𝓪𝓿𝓮𝓷'𝓽 𝓻𝓮𝓰𝓲𝓼𝓽𝓮𝓻𝓮𝓭 𝓪𝓷𝔂 𝓬𝓱𝓲𝓵𝓭𝓻𝓮𝓷 𝔂𝓮𝓽. 𝓛𝓮𝓽'𝓼 𝓰𝓮𝓽 𝓼𝓽𝓪𝓻𝓽𝓮𝓭! 𝓑𝔂 𝓻𝓮𝓰𝓲𝓼𝓽𝓮𝓻𝓲𝓷𝓰 𝔂𝓸𝓾𝓻 𝓬𝓱𝓲𝓵𝓭, 𝔂𝓸𝓾 𝓬𝓪𝓷 𝓮𝔁𝓹𝓵𝓸𝓻𝓮 𝓸𝓾𝓻 𝔀𝓲𝓭𝓮 𝓻𝓪𝓷𝓰𝓮 𝓸𝓯 𝓽𝓾𝓽𝓸𝓻𝓼, 𝓼𝓬𝓱𝓮𝓭𝓾𝓵𝓮 𝓵𝓮𝓼𝓼𝓸𝓷𝓼, 𝓪𝓷𝓭 𝓽𝓻𝓪𝓬𝓴 𝔂𝓸𝓾𝓻 𝓬𝓱𝓲𝓵𝓭'𝓼 𝓹𝓻𝓸𝓰𝓻𝓮𝓼𝓼.</Text>
            )}
  
                  


    </ScrollView>
  );
};

export default ParentHomepage;

const styles = StyleSheet.create({
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
    marginTop: hp(3), // Adjust the marginTop as needed
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
marginLeft:wp(2),
height:hp(4),
justifyContent:'center'



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
         marginBottom:hp(10)
    },
    selectedImageq1: {
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
categoriesView1:{
   
   
  marginTop:hp(2),
  marginLeft:wp(5),

},iconbtn1:{
  backgroundColor:"#fafafa",
  padding:10,
  borderRadius:11,
  shadowColor: '#888888',
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowOpacity: 1.2,
  shadowRadius: 10,
  elevation: 8,
  marginBottom:hp(9)
},
Teachtxt1:{
  color:themeColors.bg2,
  textAlign:'center'
  
},
Teachtxt:{
  color:themeColors.bg2,
 
  
},
iconbtn: {
  marginLeft: wp(5),
 marginTop: hp(12),
  backgroundColor: "#fafafa",
  padding: 10,
  borderRadius: 10,
  shadowColor: '#888888',
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowOpacity: 1.2,
  shadowRadius: 10,
  elevation: 8,
  marginBottom:hp(9)

},
subtxt: {
  color: themeColors.bg2,

},
subtxtView: {
  marginTop: hp(-7.6),
  fontSize: 12,
  marginLeft: wp(33),
},
teachdata:{
  justifyContent:'center'
},
iconView: {
  flexDirection: "row",
  justifyContent: "center",
},
icon: {
  height: hp(10),
  width: wp(20),

}, headtxt: {
  color: themeColors.bg3,
  position: "absolute",
  marginLeft: wp(4),
  fontWeight: "600",
  fontSize: 16,
  marginTop: hp(22)


},

headtxt1:{
color: themeColors.bg3,
width:wp(75),
marginLeft:wp(4),
fontWeight: "700",
fontSize: 20,


},
headtxt2:{
color: themeColors.bg3,

fontWeight: "400",
fontSize: 15,


},
txt: {

  color: themeColors.bg3,
  fontWeight: "bold",
  alignSelf: "center",
  marginLeft:wp(10),
  fontSize: 20,
},


container: {
  flex: 1,

  backgroundColor: 'white'
},


img: {
  height: hp(10),
  width: wp(20),
  margin: 20,
  marginTop: hp(9),
  borderRadius: 50,
  backgroundColor: '#CCCCCC',
  borderColor: themeColors.bg3,
  borderWidth: 2,
  shadowColor: '#888888',
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 1.2,
  shadowRadius: 10,
  elevation: 8,
 
},


arrow: {
  position: "absolute",
  marginTop: hp(1),
  marginLeft: wp(-47),
  backgroundColor: themeColors.bg2,
  padding: 8,
  borderTopEndRadius: 12,
  borderBottomStartRadius: 12,
},

txtView: {
  position: "absolute",
  marginTop: hp(10.6),
  marginLeft: wp(-11),
},
arrow: {
  position: "absolute",
  marginTop: hp(2),
  marginLeft: wp(4),
  backgroundColor: themeColors.bg2,
  padding: 8,
  borderTopEndRadius: 12,
  borderBottomStartRadius: 12,
},

categoriesView:{
  margin:5,
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
  },
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

  
});
