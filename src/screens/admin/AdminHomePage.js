import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image, SafeAreaView } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import OptionCom from '../components/OptionCom';
const AdminHomepage = ({ navigation }) => {

  const data = useSelector(state => state.value.AdminData);
  const [myObject, setMyObject] = useState({
    userID: '', name: '', email: '', phone: '', experience: '', majorSubject: '', qualification: '',
    password: '', confirmpassword: '', ImageURL: '', documentURL: '',
  });
  const [teachers, setTeachers] = useState('');
  useEffect(() => {
    const fetchTeachersData = async () => {
      try {
        const teachersSnapshot = await firestore().collection('Teachers').get();
        const teachersData = [];

        for (const doc of teachersSnapshot.docs) {
          const {userID, name, majorSubject, ImageURL } = doc.data();

          teachersData.push({
            userID,
            ImageURL,
            name,
            majorSubject,

          });
        }
        teachersData.sort((a, b) => b.rating - a.rating);

        setTeachers(teachersData);
        console.log('Teachers data:', teachersData);
      } catch (error) {
        console.log('Error fetching teachers data:', error);
      }
    };


    fetchTeachersData();
  }, []);

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
      <Animatable.View animation="zoomIn" duration={2000} style={styles.header}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

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
      <View style={{ flexDirection: 'row', marginTop: hp(2) }}>
        <Text style={styles.headtxt1}>Popular Teachers</Text>
        <TouchableOpacity>
          <Text style={styles.headtxt2}>View All {'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: hp(25) }}>
        <FlatList
          data={teachers}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.categoriesView1}>
              <TouchableOpacity style={styles.iconbtn1}>
                <Image style={styles.selectedImageq1} source={{ uri: item.ImageURL }} />

                <Text style={[styles.Teachtxt, { color: themeColors.bg3 }]}>Name:</Text>
                <Text style={styles.Teachtxt}>{item.name}</Text>
                <Text style={[styles.Teachtxt, { color: themeColors.bg3 }]}>Major Subject: </Text>
                <Text style={[styles.Teachtxt]}>{item.majorSubject}</Text>
              </TouchableOpacity>

            </View>

          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={{ flexDirection: 'row', marginTop: hp(-0.7), }}>

        <OptionCom
          name={"Groups"}
          iconname={"group"}
          iconLibrary={"FontAwesome"}
          onPress={() => {
            navigation.navigate('Group')
          }}
        />
        <OptionCom
          name={"Payments"}
          iconname={"payments"}
          iconLibrary={"MaterialIcons"}
          onPress={() => {
            navigation.navigate('PaymentByTeacher');
          }}
        />
        <OptionCom
          name={"Feedback"}
          iconname={"preview"}
          iconLibrary={"MaterialIcons"}
          onPress={() => {
             navigation.navigate('AdminFeedback');
          }}
        />
        {/* <OptionCom
          name={"Progress"}
          iconname={"progress-check"}
          iconLibrary={"MaterialCommunityIcons"}
          onPress={() => {
            // navigation.navigate('SubjectDetails');
          }}
        /> */}

        <OptionCom
          name={"Join A Call"}
          iconname={"progress-check"}
          iconLibrary={"MaterialCommunityIcons"}
          onPress={() => {
            navigation.navigate('JoinCall'
            ,   {UserName:data.name,userID:data.userID}
            );
          }}
        />

      </View>

                   



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
    marginBottom: hp(10)
  },
  selectedImageq1: {
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

  selectedImage: {
    backgroundColor: 'white',
    height: hp(19),
    width: wp(39),
    marginLeft: wp(1),
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
  categoriesView1: {


    marginTop: hp(2),
    marginLeft: wp(5),

  }, iconbtn1: {
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 11,
    shadowColor: '#888888',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1.2,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: hp(9)
  },
  Teachtxt1: {
    color: themeColors.bg2,
    textAlign: 'center'

  },
  Teachtxt: {
    color: themeColors.bg2,


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
    marginBottom: hp(9)

  },
  subtxt: {
    color: themeColors.bg2,

  },
  subtxtView: {
    marginTop: hp(-7.6),
    fontSize: 12,
    marginLeft: wp(33),
  },
  teachdata: {
    justifyContent: 'center'
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

  headtxt1: {
    color: themeColors.bg3,
    width: wp(75),
    marginLeft: wp(4),
    fontWeight: "700",
    fontSize: 20,


  },
  headtxt2: {
    color: themeColors.bg3,

    fontWeight: "400",
    fontSize: 15,


  },
  txt: {

    color: themeColors.bg3,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: wp(10),
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

  categoriesView: {
    margin: 5,
  },


  heading: {
    color: themeColors.bg3,
    fontWeight: '500',
    fontSize: 39,
    alignSelf: 'center',
    marginTop: hp(8),
    marginLeft: wp(-4),



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

    flex: 1,
  }


});
