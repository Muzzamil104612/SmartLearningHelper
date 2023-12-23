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
import TeacherDetails from '../screens/admin/TeacherDetails';
import store from '../redux/store';
import Slider from '../screens/components/Slider';
import StatusPage from '../screens/teacher/StatusPage';
import TeacherSearchDetails from '../screens/admin/TeacherSearchDetail';
import StudentSearchDetails from '../screens/admin/StudentSearchDetail';
import TeacherSearchs from '../screens/parent/TeacherSearch';
import TeacherSearches from '../screens/student/TeacherSearches';
import StudentSearchd from '../screens/teacher/StudentSearch';
import SubjectSearchd from '../screens/teacher/SubjectSearch';
import ChatMessages from '../screens/student/ChatMessages';
import StudentChat from '../screens/student/StudentChat';
import TeacherChatMessages from '../screens/teacher/TeacherChatMessages';
import ChatsData from '../screens/teacher/ChatsData';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Provider store={store}>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="StudentSearchd" options={{headerShown: false}} component={StudentSearchd} />
      <Stack.Screen name="SubjectSearchd" options={{headerShown: false}} component={SubjectSearchd} />
      <Stack.Screen name="TeacherSearches" options={{headerShown: false}} component={TeacherSearches} />
      <Stack.Screen name="TeacherSearchs" options={{headerShown: false}} component={TeacherSearchs} />
      <Stack.Screen name="SplashScreen" options={{headerShown: false}} component={SplashScreen} />
      <Stack.Screen name="StudentSearchDetails" options={{headerShown: false}} component={StudentSearchDetails} />
      <Stack.Screen name="TeacherSearchDetails" options={{headerShown: false}} component={TeacherSearchDetails} />
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
        <Stack.Screen name="TeacherDetails" options={{headerShown: false}} component={TeacherDetails} />
        <Stack.Screen name="StatusPage" options={{headerShown: false}} component={StatusPage} />
        <Stack.Screen name="ChatMessages" options={{headerShown: false}} component={ChatMessages} />
        <Stack.Screen name="StudentChat" options={{headerShown: false}} component={StudentChat} />
        <Stack.Screen name="TeacherChatMessages" options={{headerShown: false}} component={TeacherChatMessages} />
        <Stack.Screen name="ChatsData" options={{headerShown: false}} component={ChatsData} />


      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}