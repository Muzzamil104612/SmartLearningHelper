
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { themeColors } from '../../theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import * as Animatable from 'react-native-animatable';

const PTutorOptions = ({ navigation }) => {

  
  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInDownBig" duration={1000}  >

       
<View style={{justifyContent:'center',alignItems:"center"}}>
        <Text
          style={styles.title}>
           𝐂𝐡𝐨𝐨𝐬𝐞 𝐓𝐮𝐭𝐨𝐫 𝐒𝐭𝐚𝐭𝐮𝐬!
        </Text>

        <View style={styles.midPart}>
        <TouchableOpacity
               onPress={() => navigation.navigate('PPendingTeachers')}
              style={styles.btn}>
              <Text style={styles.btntxt}>Pending Tutors</Text>
            </TouchableOpacity>
        
            <TouchableOpacity
             onPress={() => navigation.navigate('PCurrentTeachers')}
              style={styles.btn}>
              <Text style={styles.btntxt}>Current Tutors</Text>
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
    marginTop:hp(-19),
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
    marginTop: hp(6),
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

export default PTutorOptions;
