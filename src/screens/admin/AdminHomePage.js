import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
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


      <Text style={[styles.txt, styles.request, styles.reqheading]}>Teacher Requests:</Text>




      {teacherRequests.length === 0 ? (
  <Text style={{ alignSelf: 'center', marginTop: 20 , color:themeColors.bg3}}>No teacher requests are currently present !</Text>
) : (
  teacherRequests.map((request) => (
    <View key={request.id} style={[styles.reqpart]}>
      <Text style={styles.txt}>Name: {request.name}</Text>
      <Text style={styles.txt}>Email: {request.email}</Text>
      <Text style={styles.txt}>Major Subject: {request.majorSubject}</Text>
      <Text style={styles.txt}>Qualification: {request.qualification}</Text>
      <Text style={styles.txt}>Experience: {request.experience} years</Text>
      <TouchableOpacity onPress={() => viewDetails(request)}>
        <View style={[styles.btn]}>
          <Text style={{ color: 'white' }}>View Details</Text>
        </View>
      </TouchableOpacity>
    </View>
  ))
)}

    </ScrollView>
  );
};

export default AdminHomepage;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom:hp(11),
  }

  , txt: {
    color: 'black'
  }, request: {
    marginTop: hp(30),
  },
  reqheading: {
    fontSize: 16,
    marginLeft: wp(3),
    fontWeight: '500',
  },
  reqpart: {
    backgroundColor: "white",
    borderRadius:9,
    padding: 8,
    marginHorizontal: wp(3),
    marginVertical:hp(1),
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 20,
  },
 btn:{
  margin:5,
  color:'white',
  backgroundColor:themeColors.bg3,
  borderRadius:4,
  padding:6,
  alignItems:'center'
 }
});
