
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { themeColors } from '../../theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import * as Animatable from 'react-native-animatable';

const PaymentIndex = ({ navigation }) => {
    
  
  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInDownBig" duration={1000}  >

       
<View style={{justifyContent:'center',alignItems:"center"}}>
        <Text
          style={styles.title}>
            𝑺𝒆𝒍𝒆𝒄𝒕 𝑶𝒏𝒆 𝑶𝒑𝒕𝒊𝒐𝒏!
        </Text>

        <View style={styles.midPart}>
        <TouchableOpacity
              onPress={() => navigation.navigate('AdminPaymentList')}
              style={styles.btn}>
              <Text style={styles.btntxt}>Send Payment</Text>
            </TouchableOpacity>
        
            <TouchableOpacity
              onPress={() => navigation.navigate('StudentsPayment')}
              style={styles.btn}>
              <Text style={styles.btntxt}>Recieve Payment</Text>
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
    fontWeight:'700'
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

export default PaymentIndex;
