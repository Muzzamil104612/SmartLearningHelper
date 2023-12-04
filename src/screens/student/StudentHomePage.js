import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import { BookOpenIcon } from 'react-native-heroicons/solid';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import Slider from '../components/Slider';


const StudentHomePage = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        // getting data from firestore...
        firestore()
          .collection('Students')
          .doc(authenticatedUser.uid)
          .get()
          .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
              setUser({
                uid: authenticatedUser.uid,
                email: authenticatedUser.email,
                username: documentSnapshot.data().name,
                imageURL: documentSnapshot.data().ImageURL,
              });
              
            }
          })
          .catch((error) => {
            console.log('Error fetching user data: ', error);
          });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  const courses = [
    { key: 1, title: 'Computer' },
    { key: 2, title: 'Pak-Studies' },
    { key: 3, title: 'Mathematics' },
    { key: 4, title: 'Islamiyat' },

  ];

 
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchTeachersData = async () => {
      try {
        // Firestore Query
        const teachersSnapshot = await firestore().collection('Teachers').get();
        const teachersData = [];

        // Iterate through the documents
        for (const doc of teachersSnapshot.docs) {
          const { name, majorSubject } = doc.data();
          //const url = await storage().refFromURL('gs://smartlearninghelper.appspot.com').getDownloadURL();
          console.log(name,majorSubject);

           teachersData.push({
            name,
            majorSubject,
            //imageURL:url,
          });
        }
   
        setTeachers(teachersData);
        console.log(teachersData);

      } catch (error) {
        console.log('Error fetching teachers data:', error);
      }
    };

    fetchTeachersData();
  }, []);







  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}

        style={styles.arrow}
      >
        <ArrowLeftIcon size="20" color="black" />

      </TouchableOpacity>

      {console.log("this is" + user)}
      {user ? (
        <>
          {user.imageURL ? (
            <Image source={{ uri: user.imageURL }} style={[styles.img]} />
          ) : (
            <Text style={styles.txt}>No Image</Text>
          )}

          <Text style={[styles.txt, styles.txtView]}>Hello, {user.username} !</Text>
          <Text style={[styles.subtxt, styles.subtxtView]}> Welcome to Your Home Page </Text>

        </>
      ) : (
        <Text style={[styles.txt, { marginTop: hp(10) }]}>Loading...</Text>
      )}
      <Text style={styles.headtxt}>All Categories</Text>
      <View>

        <FlatList
          data={courses}
          
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) => (
         
            <View style={styles.categoriesView}>
            

              <View style={styles.iconbtn}>
                <TouchableOpacity
                  style={{ alignSelf: 'center' }}
                  onPress={() => {
                    
                  }}
                >
                  <BookOpenIcon style={styles.icon} color={themeColors.bg2} size={40} />
                </TouchableOpacity>
                <Text style={styles.subtxt}>{item.title}</Text>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

      </View>
      <Text style={styles.headtxt1}>Popular Teachers</Text>

      <View>
      <FlatList
        data={teachers}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.categoriesView1}>
            <TouchableOpacity style={styles.iconbtn1}>
            <Image style={styles.icon} source={require('../../assets/images/student.png')} />

            <Text style={[styles.Teachtxt, {color:themeColors.bg3}]}>Name:</Text>
            <Text style={styles.Teachtxt}>{item.name}</Text>
            <Text style={[styles.Teachtxt, {color:themeColors.bg3}]}>Major Subject </Text>
            <Text style={[styles.Teachtxt]}>{item.majorSubject}</Text>
            </TouchableOpacity>
           
             </View>
             
  )}
  horizontal
  showsHorizontalScrollIndicator={false}
      />
    </View>






      <View style={{  justifyContent: 'center', alignItems: 'center' ,marginTop:hp(-5) }}>
    <Slider/>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  categoriesView1:{
   
   
    marginTop:hp(1),
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
    position: "absolute",
    marginLeft: wp(4),
    fontWeight: "600",
    fontSize: 16,
    marginTop: hp(43)

  }
,
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
  }
});

export default StudentHomePage;
