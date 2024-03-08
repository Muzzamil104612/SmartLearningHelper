import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Entypo from 'react-native-vector-icons/Entypo';
const TextInputComponent = (props) => {
  const { onChangeText,label, value, editable,autoCorrect,iconname, iconLibrary, onIconPress,placeholder, secureTextEntry ,keyboardType} = props;
 
  const renderIcon = () => {
    switch (iconLibrary) {
        case 'Ionicons':
            return <Ionicons name={iconname} size={25} color="#191D88" style={styles.icon} />;
        case 'AntDesign':
            return <AntDesign name={iconname} size={25} color="#191D88" style={styles.icon} />;
        case 'Fontisto':
            return <Fontisto name={iconname} size={25} color="#191D88" style={styles.icon} />;
            case 'Entypo':
                return <Entypo name={iconname} size={25} color="#191D88" style={styles.icon} />; 
            
        default:
            return null;
    }
};
  return (
    <View>
      <Text style={styles.Titlebox}>{label}</Text>
      <View style={{flexDirection:'row',width:wp(90),alignItems:'center'}}>
      <TextInput
       onChangeText={onChangeText} 
        style={styles.Inputbox}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        autoCorrect={autoCorrect}
        value={value}
        editable={editable}
      />
    
       <TouchableOpacity onPress={onIconPress}>
             {renderIcon()}
             </TouchableOpacity>
             </View>
    </View>
  )
}


const styles = StyleSheet.create({
  icon:
  {
  
      marginLeft:wp(-10),
      marginTop:hp(1),
  },
  Titlebox: {
    marginTop: hp(1.7),
    color: "#191D88",
    
  },
  Inputbox: {
    elevation: 3, // Increased elevation for a more raised appearance
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 50,
    backgroundColor: "white",
    color: "black",
    borderRadius: 7,
    marginVertical: 2,

    paddingHorizontal: 12,
  height:hp(7),
  width:wp(85),
  marginTop:hp(0.8),
  },

});
export default TextInputComponent;
