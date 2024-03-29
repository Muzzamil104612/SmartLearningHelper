import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  Image ,StyleSheet,Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/Feather';
import AntDesigns from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ParentHomePage from './ParentHomePage';
import ParentProfile from './ParentProfile';
import ParentSearch from './ParentSearch';
import ParentSetting from './ParentSetting';
import ParentChat from './ParentChat';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';



const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  image: {height: hp(3.5), width: hp(4.1),},
      images: {height: hp(3), width: hp(3),},
    label: {
      fontSize: 10,
      fontWeight: 'bold',
      marginTop: hp(-1.5), 
      marginBottom:hp(1.7),
    },
  });

const HomeScreenForParent=()=> {
const [readval,setReadVal]=useState(false);

useEffect(() => {
  const unsubscribe = firestore()
  .collection('TeachersChat')
  .onSnapshot((snapshot) => {
    let hasUnread = false;

    snapshot.forEach((doc) => {
      let newData = doc.data();
      let isUnread = newData.unread;

      if (isUnread) {
        hasUnread = true;
        return;
      }

    });

    setReadVal(hasUnread);
    console.log(hasUnread + " unread value");
  });

  return () => unsubscribe();
}, []); 



  return (
    <Tab.Navigator
    initialRouteName='ParentHomePage'
    screenOptions={{
      tabBarStyle: {
        position: 'absolute',
        height: hp(9),
        backgroundColor: '#f7f7f7',
        borderTopLeftRadius:hp(4),
        borderTopRightRadius:hp(4),
        shadowColor: '#000000',
        shadowOffset: {
            width: 10,
            height: 10,

        },
        shadowOpacity: 4,
        shadowRadius: 5,
        elevation: 10,
      
      },
      tabBarActiveTintColor: '#F4BC1C', // Active icon tint color
      tabBarInactiveTintColor: '#191D88', // Inactive icon tint color
    }}
  >
 
  <Tab.Screen
  name="ParentHomePage"
  component={ParentHomePage}
  
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={25}    style={styles.image} color={color}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.label, { color: focused ? '#F4BC1C' :'#191D88' }]}>
              HOME
            </Text>
          ),
        }}
      />
      
     
       <Tab.Screen      name="ParentSetting"
          component={ParentSetting}  options={{ headerShown: false,
        tabBarIcon: ({ color, size }) => (
        
          <Feather name="settings" size={25}    style={styles.image} color={color}
          />

        ),
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.label, {  color: focused ? '#F4BC1C' :'#191D88' }]}>
            SETTINGS
          </Text>
        ),
         }} />
      

      
      <Tab.Screen
         name="ParentSearch" component={ ParentSearch}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="screen-search-desktop"
              size={35} // Set the size you want
              style={{
                backgroundColor: '#FFCD4B', // Set the background color
                borderRadius: hp(10), // To make it a circular shape           
                marginTop:hp(-8) ,
                height:hp(10),
                width:wp(20),
                alignContent:'center',
                alignItems:'center',
                justifyContent:'center',// Set the icon color
                padding:wp(5.4),
                borderWidth:hp(0.7),
                borderColor:'#FFCD4B',
                borderStyle:'solid',
                shadowColor: 'black',
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 0.9,
                shadowRadius: 1,
                elevation: 20,
                
              }}
              color={'#191D88'}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      


      {
        readval==true?(
          <Tab.Screen
          name="ParentChat"
          component={ParentChat}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbox-outline" size={25}    style={styles.image} color={'red'}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={[styles.label, {  color: focused ? 'red' :'red'}]}>
                CHAT
              </Text>
            ),
          }}
        />
       
        ):(

          <Tab.Screen
          name="ParentChat"
          component={ParentChat}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbox-outline" size={25}    style={styles.image} color={color}
              />
    
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={[styles.label, {  color: focused ? '#F4BC1C' :'#191D88'}]}>
                CHAT
              </Text>
            ),
          }}
        />
        



        )
      }
        

    
      
         
       <Tab.Screen name="ParentProfile" component={ ParentProfile} options={{ headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={25}    style={styles.image} color={color}
          />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.label, {  color: focused ? '#F4BC1C' :'#191D88'  }]}>
            PROFILE
          </Text>
        ),
         }} />
       



      
    </Tab.Navigator>
  );
}
 export default HomeScreenForParent;