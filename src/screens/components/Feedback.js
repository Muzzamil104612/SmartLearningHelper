import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { useState, useEffect, React } from 'react';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';


const Feedback = (props) => {
  
    return (
        <View style={{ padding: 5 }}>
          <Text style={{color:themeColors.bg3}}>Feed back page</Text>
        </View>
    );
};



export default Feedback;