import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { useState, useEffect, React } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import EditProfile from '../admin/EditProfile';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme'
import Feather from 'react-native-vector-icons/Feather';

const OptionBar = (props) => {
    const { IconName, DisplayText } = props;
 const  navigationHandler=()=>{

    if(DisplayText=='Edit Profile'){
        props.navigation.navigate('EditProfile');
    }
    else if(DisplayText=='Teachers Directory') {
        props.navigation.navigate('TeachersList');
    }
    else if(DisplayText=='Students Directory') {
        props.navigation.navigate('StudentsList');
    }
   
    else if(DisplayText=='Parents Directory') {
        props.navigation.navigate('ParentsList');
    }
    else if(DisplayText=='Help and Support') {
        props.navigation.navigate('HelpAndSupport');
    }
    else if(DisplayText=='Edit Your Parent Profile') {
        props.navigation.navigate('EditParentProfile');
    }
    else if(DisplayText=='Terms and Conditions') {
       props.navigation.navigate('TermsAndConditions');
    }
    //Edit Your Teacher Profile
    else if(DisplayText=='Edit Your Teacher Profile') {
        props.navigation.navigate('EditTeacherProfile');
     }
    else if(DisplayText=='Edit Your Student Profile') {
        props.navigation.navigate('EditStudentProfile');
     }
    else if(DisplayText=='LogOut') {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        
                        props.navigation.navigate('Login');
                    },
                },
            ],
            { cancelable: true },
        );
    }

 }


    return (
        <View style={{ padding: 5}}>
            <TouchableOpacity
                onPress={()=>{
                   navigationHandler();
                }}
                style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    height:hp(6.8),
                    borderWidth: 1, 
                    borderStyle: 'solid',
                    borderColor: 'transparent', 
                    shadowColor: 'black',
                    shadowOffset: {
                        width: 0,
                        height: 0.2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 1.3
                }}>

                <Text style={{ color: 'black', padding: 13 }}>
                    <Feather name={IconName} size={20} style={{}} color={themeColors.bg2} />
                    {'   '} {DisplayText}
                </Text>

            </TouchableOpacity>


        </View>
    );
};



export default OptionBar;