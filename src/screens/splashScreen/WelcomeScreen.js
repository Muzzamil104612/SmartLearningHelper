import { View, Text, Image, TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
const WelcomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView  style={styles.container}>
        <Animatable.View animation="fadeInUp" duration={1000}  >
            <Text style={styles.title}>
                Let's Get Started!
            </Text>
            <View  style={{width:wp(100),justifyContent:'center',alignItems:'center'}}>
                <Image source={require("../../assets/images/welcome.png")}
                    style={styles.img} />
            </View>
            <View style={styles.midPart} >
                <View  style={{width:wp(100),justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('SelectRole')}
                  style={styles.btn}>
                        <Text 
                            style={styles.btntxt}
                        >
                           Register
                        </Text>
                </TouchableOpacity>
                </View>
                
          <View style={styles.bottonPart}>
                      <Text style={styles.bottomtxt}>Already have an account?</Text>
                      <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                          <Text style={styles.linkbtn}>Sign In</Text>
                      </TouchableOpacity>
                  </View>
            </View>
        </Animatable.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    title: {
      color: '#F4BC1C',
      fontSize: 29,
      alignSelf:"center",
      fontWeight: 'bold',
    
    },
    img:{
        width:wp(70)  ,
        height:hp(30),
        elevation: 20, // Increased elevation for a more raised appearance
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 50,
    },
    btn:{
        backgroundColor:themeColors.bg2,
        borderRadius:7,
        marginTop:hp(3.3),
        width:wp(60),
        height:hp(6.3),
        alignContent:'center',
        alignItems:'center',
        elevation: 5, // Increased elevation for a more raised appearance
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 50,
        
    },
    btntxt:{
        color:"#191D88",
        alignSelf:"center",
        padding:12,
        fontSize:17,
        fontWeight:"600"
        
    },
    midPart:{
        marginTop:23,
    }
    ,txt:{
      color:"white",
    },
    bottonPart:{
        height:hp(6),
        
          marginBottom:hp(1),
          justifyContent:'flex-end'
         
         },
         linkbtn:{
             color:themeColors.bg3,
             position:"absolute",
             marginTop:hp(-2.7),
           marginLeft:wp(65),
             fontWeight:'bold',
             fontSize:14.5,
         },
         bottomtxt:{
         alignSelf:"center",
         fontSize:14.5,
         marginTop:hp(-2.5),
         color:'black',
         width:wp(60),
         
         }
  });
  
  export default WelcomeScreen;
  