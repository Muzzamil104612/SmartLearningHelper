import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { themeColors } from '../../theme';
import * as Animatable from 'react-native-animatable';
const OptionCom = ({name,iconname, iconLibrary,onPress}) => {
    const renderIcon = () => {
        switch (iconLibrary) {
            case 'Ionicons':
                return <Ionicons name={iconname} size={31} color='#191D88' />;
            case 'FontAwesome':
                return <FontAwesome name={iconname} size={31} color='#191D88'  />;
                case 'FontAwesome5':
                    return <FontAwesome5 name={iconname} size={31} color='#191D88'  />;
                case 'AntDesign':
                return <AntDesign name={iconname} size={31} color='#191D88' />;
                case 'MaterialIcons':
                    return <MaterialIcons name={iconname} size={34} color='#191D88'  />;
                case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons name={iconname} size={31} color='#191D88' />;
            default:
                return null;
        }
    };
    return (
      
              <Animatable.View animation="slideInDown" duration={2000}  style={styles.View}>
            <View style={styles.Touch} >
            <TouchableOpacity onPress={onPress}>
            <View style={styles.icon}>
            {renderIcon()}
            </View>
            </TouchableOpacity>
            </View>
            <View style={styles.name}>
            <Text style={styles.login} >{name}</Text>
            </View>
            
           
            </Animatable.View>
    )
}
const styles = StyleSheet.create({

    View:
    {
        weight:wp(100),
        height: hp(20),
        marginLeft:wp(2.5), 
     
           
    },
    login:
    {
        color: themeColors.bg3,
        fontSize: 12,
       textAlign:"center",
       marginTop:hp(0.7),
        fontWeight: 'bold',
    },
   Touch:
    {
        width: wp(22),
        height: hp(10),
      
         marginTop:hp(5),
        borderRadius: wp(5),
        backgroundColor: themeColors.bg2,
        justifyContent:"center",alignItems:"center",alignContent:"center", 
       
    },
    name:
    {height:hp(3),width:wp(20),},
    icon:
    {height:hp(6),width:wp(10),  justifyContent:"center",alignItems:"center",alignContent:"center", }
}
);
export default OptionCom