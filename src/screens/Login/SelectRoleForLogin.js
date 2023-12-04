
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { themeColors } from '../../theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import * as Animatable from 'react-native-animatable';

const SelectRoleForLogin = ({ navigation }) => {

  
  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInDownBig" duration={1000}  >

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrow}
        >
          <ArrowLeftIcon size={20} color="black" />
        </TouchableOpacity>
<View style={{justifyContent:'center',alignItems:"center"}}>
        <Text
          style={styles.title}>
            𝙎𝙚𝙡𝙚𝙘𝙩 𝙔𝙤𝙪𝙧 𝙍𝙤𝙡𝙚!
        </Text>

        <View style={styles.midPart}>
        <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen', { data: 'Admin' })}
              style={styles.btn}>
              <Text style={styles.btntxt}>Admin</Text>
            </TouchableOpacity>
        
            <TouchableOpacity
             onPress={() => navigation.navigate('LoginScreen', { data: 'Student' })}
              style={styles.btn}>
              <Text style={styles.btntxt}>Student</Text>
            </TouchableOpacity>
         
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen', { data: 'Teacher' })}
              style={styles.btn}>
              <Text style={styles.btntxt}>Teacher</Text>
            </TouchableOpacity>
        

         
            <TouchableOpacity
           onPress={() => navigation.navigate('LoginScreen', { data: 'Parent' })}
              style={styles.btn}>
              <Text style={styles.btntxt}>Parent</Text>
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
    fontSize: 33,
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
    fontWeight:'500'
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

export default SelectRoleForLogin;
