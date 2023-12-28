import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert,StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const ForgotPassword = ({ navigation, route }) => {
  const role = route.params?.role;
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState(''); // Added state for the new password

  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);

    
      if (role) {
        console.log(role+'s');
        const collectionName = role+'s';
        const userRef = firestore().collection(collectionName).where('email', '==', email);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];

          // Update the password field in the Firestore document
          await userDoc.ref.update({
            password: newPassword, // Assuming your password field in Firestore is named 'password'
            passwordResetRequested: true,
          });

          Alert.alert(
            'Password Reset Email Sent',
            'Check your email for instructions to reset your password.'
          );

          navigation.goBack(); // Remove reference to login, assuming you want to go back to the previous screen
        } else {
          Alert.alert('Error', 'User not found in the database');
        }
      } else {
        Alert.alert('Error', 'Invalid email format or user not found');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Failed to send password reset email');
    }
  };

  return (
    <View style={{
         flex:1,
         padding:30,
       
        backgroundColor:'white'
         }}>
      <Text style={{ fontSize: 20, marginBottom: 10,color:themeColors.bg3
    ,alignSelf:'center',
    fontWeight:'600',
    marginTop:hp(20),
    
    }}>Reset Your Password !</Text>

      <TextInput
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.Inputbox}
      />

      <TextInput
        placeholder="Enter your new password"
        secureTextEntry
        autoCapitalize="none"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        style={styles.Inputbox}
      />

    <TouchableOpacity onPress={()=>{
        handleForgotPassword();
    }}
     style={styles.btn}>
<Text style={styles.btntxt}>Submit</Text>
   
    </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
 
  
    arrow: {
      position: "absolute",
      marginTop: hp(1),
      marginLeft: wp(-47),
      backgroundColor: themeColors.bg2,
      padding: 8,
      borderTopEndRadius: 12,
      borderBottomStartRadius: 12,
    },
    
   
    Inputbox: {
  
      backgroundColor: "#EDEDED",
      color: "gray",
      borderRadius: 7,
      marginVertical: hp(1),
      paddingHorizontal: 12,
    },
  
    btn: {
      backgroundColor: themeColors.bg2,
      borderRadius: 7,
      marginTop: hp(3.3),
      width: wp(60),
      height: hp(6.3),
      alignContent: 'center',
      alignItems: 'center',
      elevation: 10, // Increased elevation for a more raised appearance
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowRadius: 50,
      marginLeft:wp(13)
  
  
    },
    btntxt: {
      color: "#191D88",
      alignSelf: "center",
      paddingVertical: 12,
      fontSize: 16,
      paddingHorizontal: 45,
      fontWeight: "500",
  
  
    },
  
  });
export default ForgotPassword;
