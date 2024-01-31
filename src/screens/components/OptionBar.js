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

    }
    else if(DisplayText=='Terms and Conditions') {

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
        <View style={{ padding: 3 }}>
            <TouchableOpacity
                onPress={()=>{
                   navigationHandler();
                }}
                style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    borderWidth: 1, 
                    borderStyle: 'solid',
                    borderColor: 'transparent', 
                    shadowColor: 'black',
                    shadowOffset: {
                        width: 0,
                        height: 0.2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 2,
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