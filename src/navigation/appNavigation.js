import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SelectRole from '../screens/registrationPages/SelectRole';
import WelcomeScreen from '../screens/splashScreen/WelcomeScreen';
import TeacherSignUp from '../screens/registrationPages/TeacherSignUp';
import StudentSignUp from '../screens/registrationPages/StudentSignUp';
import ParentSignUp from '../screens/registrationPages/ParentSignUp';
import HomeScreenForAdmin from '../screens/admin/HomeScreenForAdmin';
import HomeScreenForParent from '../screens/parent/HomeScreenForParent';
import HomeScreenForStudent from '../screens/student/HomeScreenForStudent';
import HomeScreenForTeacher from '../screens/teacher/HomeScreenForTeacher';
import SelectRoleForLogin from '../screens/Login/SelectRoleForLogin';
import LoginScreen from '../screens/Login/LoginScreen';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import { Provider } from 'react-redux';

import store from '../redux/store';
import Slider from '../screens/components/Slider';
const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Provider store={store}>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="SplashScreen" options={{headerShown: false}} component={SplashScreen} />
 
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={SelectRoleForLogin} />
        <Stack.Screen name="SelectRole" options={{headerShown: false}} component={SelectRole} />
        <Stack.Screen name="TeacherSignUp" options={{headerShown: false}} component={TeacherSignUp} />
        <Stack.Screen name="ParentSignUp" options={{headerShown: false}} component={ParentSignUp} />
        <Stack.Screen name="StudentSignUp" options={{headerShown: false}} component={StudentSignUp} />
        <Stack.Screen name="HomeScreenForParent" options={{headerShown: false}} component={HomeScreenForParent} />
        <Stack.Screen name="HomeScreenForStudent" options={{headerShown: false}} component={HomeScreenForStudent} />
        <Stack.Screen name="HomeScreenForTeacher" options={{headerShown: false}} component={HomeScreenForTeacher} />
        <Stack.Screen name="HomeScreenForAdmin" options={{headerShown: false}} component={HomeScreenForAdmin} />
        <Stack.Screen name="Slider" options={{headerShown: false}} component={Slider} />

      
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}