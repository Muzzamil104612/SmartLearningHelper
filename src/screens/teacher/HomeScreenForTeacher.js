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
import TeacherChat from './TeacherChat';
import TeacherProfile from './TeacherProfile';
import TeacherSetting from './TeacherSetting';
import TeacherHomePage from './TeacherHomePage';
import TeacherSearch from './TeacherSearch';
const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  image: {height: hp(3.5), width: hp(4.1),},
      images: {height: hp(3), width: hp(3),},
    label: {
      fontSize: 10,
      fontWeight: 'bold',
      marginTop: hp(-1.5), 
      marginBottom:hp(1.7),// Adjust this value as needed for the desired spacing
    },
  });

const HomeScreenForTeacher=()=> {


  return (
    <Tab.Navigator
    initialRouteName='TeacherHomePage'
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
  name="TeacherHomePage"
  component={TeacherHomePage}
  
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
      
     
       <Tab.Screen      name="TeacherSetting"
          component={TeacherSetting}  options={{ headerShown: false,
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
         name="TeacherSearch" component={ TeacherSearch}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="screen-search-desktop"
              size={35} // Set the size you want
              style={{
                backgroundColor: '#FFCD4B', // Set the background color
                borderRadius: hp(10), // To make it a circular shape
               // Some padding for better appearance
               
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
      
        
  <Tab.Screen
        name="TeacherChat"
        component={TeacherChat}
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
      
    
      
         
       <Tab.Screen name="TeacherProfile" component={ TeacherProfile} options={{ headerShown: false,
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
 export default HomeScreenForTeacher;