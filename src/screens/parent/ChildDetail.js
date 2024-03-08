
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { themeColors } from '../../theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import * as Animatable from 'react-native-animatable';

const ChildDetail = ({ route, navigation }) => {
  const { student } = route.params;
  const data = useSelector(state => state.value.parentData);
  const [myObject, setMyObject] = useState({
    userID: '', name: '', email: '', phone: '',
    password: '', confirmpassword: '', ImageURL: '',
  });
  useEffect(() => {

    setMyObject(data);
   
    });

  console.log('student is', student);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInDownBig" duration={1000}  >


        <View style={{ justifyContent: 'center', alignItems: "center" }}>
          <Text
            style={styles.title}>
            𝘾𝙝𝙞𝙡𝙙 𝘽𝙤𝙭 𝙈𝙖𝙣𝙖𝙜𝙚𝙢𝙚𝙣𝙩!
          </Text>

          <View style={styles.midPart}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PTutorOptions')}
              style={styles.btn}>
              <Text style={styles.btntxt}>Tutors</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Studygroups')}
              style={styles.btn}>
              <Text style={styles.btntxt}>Groups</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('PaymentList')}
              style={styles.btn}>
              <Text style={styles.btntxt}>Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { navigation.navigate('JoinCall'
              ,{UserName:data.name,userID:data.userID}); }}
              style={styles.btn}>
              <Text style={styles.btntxt}>Join Class</Text>
            </TouchableOpacity>



          </View>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#F4BC1C',
    fontSize: 28,
    alignSelf: "center",
    // fontWeight: 'bold',
  },
  btn: {
    backgroundColor: themeColors.bg2,
    borderRadius: 7,
    marginTop: hp(3.3),
    width: wp(50),
    height: hp(6.3),
    alignContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 50,
  },
  btntxt: {
    color: "#191D88",
    alignSelf: "center",
    padding: 12,
    fontSize: 17,
    fontWeight: '500'
  },
  midPart: {
    marginTop: 23,
  },
  arrow: {
    position: "absolute",
    marginTop: hp(-25),
    marginLeft: wp(-12),
    backgroundColor: themeColors.bg2,
    padding: 8,
    borderTopEndRadius: 12,
    borderBottomStartRadius: 12,
  },
});

export default ChildDetail;
