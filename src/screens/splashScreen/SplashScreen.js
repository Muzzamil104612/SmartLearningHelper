// WelcomeScreen.js
import React from 'react';
import { View, Text, Button ,StyleSheet,SafeAreaView,FlatList ,Image,TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import * as Animatable from 'react-native-animatable';

const Done=({...props})=>(
  
  
     <TouchableOpacity
        style={{
            marginRight:12
        }}
        {...props} >
        <Text style={{color:'#ff2156'}}> Done</Text>
     </TouchableOpacity>
)
const Dots = ({selected}) =>{
    let backgroundColor;
    backgroundColor = selected ? '#ff2156' : '#308080'
    return(
        <View style={{
            height:5,
            width: 5,
            marginHorizontal:3,
            backgroundColor

        }}/>
    )
}
        

const SplashScreen = ({ navigation }) => {
  return (
    <Onboarding
    onSkip={() => {
      console.log('Skip pressed');
      navigation.navigate('Welcome');
    }}
    onDone={() => {
      console.log('Done pressed');
      navigation.navigate('Welcome');
    }}
    
    DotComponent={Dots}
    DoneButtonComponent={Done}
    bottomBarColor='#fff'

    pages={[
      {
        backgroundColor: '#fff',
        height:100,
        flex:1,
        width:500,
        image: <Image style={{height:200,width:200}} source={require('../../assets/images/bestteachers.png')} />,
        title: '𝘉𝘦𝘴𝘵 𝘛𝘶𝘵𝘰𝘳𝘴 𝘐𝘯 𝘗𝘢𝘬𝘪𝘴𝘵𝘢𝘯',
        subtitle: '𝘛𝘩𝘦 𝘣𝘦𝘴𝘵 𝘛𝘶𝘵𝘰𝘳𝘴 𝘪𝘯 𝘗𝘢𝘬𝘪𝘴𝘵𝘢𝘯 𝘪𝘯𝘴𝘱𝘪𝘳𝘦 𝘸𝘪𝘵𝘩 𝘱𝘢𝘴𝘴𝘪𝘰𝘯, 𝘧𝘰𝘴𝘵𝘦𝘳 𝘦𝘹𝘤𝘦𝘭𝘭𝘦𝘯𝘤𝘦 𝘵𝘩𝘳𝘰𝘶𝘨𝘩 𝘪𝘯𝘯𝘰𝘷𝘢𝘵𝘪𝘷𝘦 𝘛𝘶𝘵𝘰𝘳𝘪𝘯𝘨',
        
      },
      {
        backgroundColor: '#fff',
        image: <Image style={{height:200,width:200}} source={require('../../assets/images/searchteacher.png')} />,
        title: '𝘚𝘦𝘢𝘳𝘤𝘩𝘪𝘯𝘨 𝘧𝘰𝘳 𝘘𝘶𝘢𝘭𝘪𝘧𝘪𝘦𝘥 𝘛𝘶𝘵𝘰𝘳𝘴',
        subtitle: '𝘠𝘰𝘶 𝘤𝘢𝘯 𝘴𝘦𝘢𝘳𝘤𝘩 𝘣𝘦𝘴𝘵 𝘛𝘶𝘵𝘰𝘳𝘴 𝘢𝘤𝘤𝘰𝘳𝘥𝘪𝘯𝘨 𝘵𝘰 𝘺𝘰𝘶𝘳 𝘪𝘯𝘵𝘦𝘳𝘦𝘴𝘵 𝘢𝘯𝘥 𝘴𝘶𝘣𝘫𝘦𝘤𝘵',
        
      },
      {
        backgroundColor: '#fff',
        image: <Image  style={{height:200,width:200}} source={require('../../assets/images/learnToRise.png')} />,
        title: '𝘓𝘦𝘢𝘳𝘯 𝘵𝘰 𝘙𝘪𝘴𝘦',
        subtitle: '𝘌𝘮𝘣𝘳𝘢𝘤𝘦 𝘤𝘩𝘢𝘭𝘭𝘦𝘯𝘨𝘦𝘴 𝘢𝘴 𝘰𝘱𝘱𝘰𝘳𝘵𝘶𝘯𝘪𝘵𝘪𝘦𝘴 𝘧𝘰𝘳 𝘭𝘦𝘢𝘳𝘯𝘪𝘯𝘨 𝘢𝘯𝘥 𝘱𝘦𝘳𝘴𝘰𝘯𝘢𝘭 𝘥𝘦𝘷𝘦𝘭𝘰𝘱𝘮𝘦𝘯𝘵',
        
      },

    ]}
    />
    
  );

};

export default SplashScreen;
