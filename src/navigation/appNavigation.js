import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentsDetail from '../screens/teacher/studentDetail';
import StdRequests from '../screens/teacher/stdRequests';
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
import StoreCount from '../screens/components/storeCount';
import RetreiveCount from '../screens/components/retreiveCount';
import ParentChatMessages from '../screens/parent/ParentChatMessages';
import ParentChat from '../screens/parent/ParentChat';
import AllTeachers from '../screens/parent/AllTeachers';
import ChatOptions from '../screens/teacher/ChatOptions';
import ParentsChat from '../screens/teacher/ParentsChat';
import TeacherChat from '../screens/teacher/TeacherChat';
import ParentsChatMessages from '../screens/teacher/ParentsChatMessages';
import AllStudents from '../screens/teacher/AllStudents';
import AllParents from '../screens/teacher/AllParents';
import AllSTeachers from '../screens/student/AllSTeachers';
import ForgotPassword from '../screens/Login/ForgotPassword';
import OptionBar from '../screens/components/OptionBar';
import EditProfile from '../screens/admin/EditProfile';
import TeachersList from '../screens/admin/TeachersList';
import GroupDetails from '../screens/teacher/GroupDetails';
import TeacherDetail from '../screens/admin/TeacherDetail';
import StudentsList from '../screens/admin/StudentsList';
import StudentDetail from '../screens/admin/StudentDetail';
import ParentsList from '../screens/admin/ParentsList';
import ParentDetail from '../screens/admin/ParentDetail';
import EditParentProfile from '../screens/parent/EditParentProfile';
import TermsAndConditions from '../screens/components/TermsAndConditions';
import HelpAndSupport from '../screens/components/HelpAndSupport';
import StudentSetting from '../screens/student/StudentSetting';
import EditStudentProfile from '../screens/student/EditStudentProfile';
import StudentHomePage from '../screens/student/StudentHomePage';
import TeacherSetting from '../screens/teacher/TeacherSetting';
import EditTeacherProfile from '../screens/teacher/EditTeacherProfile';
import TeacherRequests from '../screens/admin/TeacherRequests';
import Groups from '../screens/teacher/groups';
import Studygroups from '../screens/student/studygroups';
import NoticeList from '../screens/teacher/addmaterial';
import StdGroupDetails from '../screens/student/stdGroupDetails';
import TutorOptions from '../screens/student/TutorOptions';
import PendingTeachers from '../screens/student/PendingTeachers';
import CurrentTeachers from '../screens/student/CurrentTeachers';
import TeacherInfo from '../screens/student/TeacherInfo';
import TeacherJoinCall from '../screens/teacher/TeacherJoinCall';
import CurrentStudent from '../screens/teacher/CurrentStudent';
import StudentInfo from '../screens/teacher/StudentInfo';
import ChildDetail from '../screens/parent/ChildDetail';
import Group from '../screens/admin/Groups';
import PaymentList from '../screens/parent/PaymentList';
import SpecificPayments from '../screens/parent/SpecificPayments';
import SpecificStudentPayment from '../screens/teacher/SpecificStudentPayment';
import StudentsPayment from '../screens/teacher/StudentsPayment';
import PaymentIndex from '../screens/teacher/PaymentIndex';
import AddAdminPayment from '../screens/teacher/AddAdminPayment';
import AdminPaymentList from '../screens/teacher/AdminPaymentList';
import GroupDetail from '../screens/admin/GroupDetails';
import PaymentByTeacher from '../screens/admin/PaymentByTeacher';
import SpecificTeacherPayment from '../screens/admin/SpecificTeacherPayment';
import Feedback from '../screens/components/Feedback';
import FeedbackList from '../screens/components/FeedbackList';
import PTutorOptions from '../screens/parent/PTutorOptions';
import PPendingTeachers from '../screens/parent/PPendingTeachers';
import PCurrentTeachers from '../screens/parent/PCurrentTeachers';
import PTeacherInfo from '../screens/parent/PTeacherInfo';
import AllFeedbacks from '../screens/teacher/AllFeedbacks';
import JoinCall from '../screens/components/JoinCall';
import MeetingScreen from '../screens/components/MeetingScreen';
import TeacherMeeting from '../screens/teacher/TeacherMeating';


const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Provider store={store}>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="TeacherMeeting" options={{headerShown: false}} component={TeacherMeeting} />
      <Stack.Screen name="TeacherJoinCall" options={{headerShown: false}} component={TeacherJoinCall} />
      <Stack.Screen name="PaymentByTeacher" options={{headerShown: false}} component={PaymentByTeacher} />
      <Stack.Screen name="SpecificTeacherPayment" options={{headerShown: false}} component={SpecificTeacherPayment} />
      <Stack.Screen name="GroupDetail" options={{headerShown: false}} component={GroupDetail} />
      <Stack.Screen name="Group" options={{headerShown: false}} component={Group} />
      <Stack.Screen name="AddAdminPayment" options={{headerShown: false}} component={AddAdminPayment} />
      <Stack.Screen name="AdminPaymentList" options={{headerShown: false}} component={AdminPaymentList} />
      <Stack.Screen name="SpecificPayments" options={{headerShown: false}} component={SpecificPayments} />
      <Stack.Screen name="SpecificStudentPayment" options={{headerShown: false}} component={SpecificStudentPayment} />
      <Stack.Screen name="StudentsPayment" options={{headerShown: false}} component={StudentsPayment} />
      <Stack.Screen name="PaymentIndex" options={{headerShown: false}} component={PaymentIndex} />
     
      <Stack.Screen name="PaymentList" options={{headerShown: false}} component={PaymentList} />
      <Stack.Screen name="ChildDetail" options={{headerShown: false}} component={ChildDetail} />
      <Stack.Screen name="StudentInfo" options={{headerShown: false}} component={StudentInfo} />
      <Stack.Screen name="CurrentStudent" options={{headerShown: false}} component={CurrentStudent} />
      <Stack.Screen name="StdGroupDetails" options={{headerShown: false}} component={StdGroupDetails} />
      <Stack.Screen name="NoticeList" options={{headerShown: false}} component={NoticeList} />
      <Stack.Screen name="GroupDetails" options={{headerShown: false}} component={GroupDetails} />
      <Stack.Screen name="Studygroups" options={{headerShown: false}} component={Studygroups} />
      <Stack.Screen name="Groups" options={{headerShown: false}} component={Groups} />
      <Stack.Screen name="StudentsDetail" options={{headerShown: false}} component={StudentsDetail} />
      <Stack.Screen name="StdRequests" options={{headerShown: false}} component={StdRequests} />
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
        <Stack.Screen name="StoreCount" options={{headerShown: false}} component={StoreCount} />
        <Stack.Screen name="RetreiveCount" options={{headerShown: false}} component={RetreiveCount} />
        <Stack.Screen name="ParentChatMessages" options={{headerShown: false}} component={ParentChatMessages} />
        <Stack.Screen name="TeacherChat" options={{headerShown: false}} component={TeacherChat} />
        <Stack.Screen name="TeacherSetting" options={{headerShown: false}} component={TeacherSetting} />
        <Stack.Screen name="EditTeacherProfile" options={{headerShown: false}} component={EditTeacherProfile} />

        <Stack.Screen name="ParentChat" options={{headerShown: false}} component={ParentChat} />

        <Stack.Screen name="AllTeachers" options={{headerShown: false}} component={AllTeachers} />
        <Stack.Screen name="ChatOptions" options={{headerShown: false}} component={ChatOptions} />
        <Stack.Screen name="ParentsChat" options={{headerShown: false}} component={ParentsChat} />
        <Stack.Screen name="ParentsChatMessages" options={{headerShown: false}} component={ParentsChatMessages} />
        <Stack.Screen name="AllStudents" options={{headerShown: false}} component={AllStudents} />
        <Stack.Screen name="AllParents" options={{headerShown: false}} component={AllParents} />
        <Stack.Screen name="AllSTeachers" options={{headerShown: false}} component={AllSTeachers} />
        <Stack.Screen name="ForgotPassword" options={{headerShown: false}} component={ForgotPassword} />
        <Stack.Screen name="OptionBar" options={{headerShown: false}} component={OptionBar} />
        <Stack.Screen name="EditProfile" options={{headerShown: false}} component={EditProfile} />
        <Stack.Screen name="TeachersList" options={{headerShown: false}} component={TeachersList} />
        <Stack.Screen name="TeacherDetail" options={{headerShown: false}} component={TeacherDetail} />
        <Stack.Screen name="StudentsList" options={{headerShown: false}} component={StudentsList} />
        <Stack.Screen name="StudentDetail" options={{headerShown: false}} component={StudentDetail} />
        <Stack.Screen name="ParentsList" options={{headerShown: false}} component={ParentsList} />
        <Stack.Screen name="ParentDetail" options={{headerShown: false}} component={ParentDetail} />
        <Stack.Screen name="EditParentProfile" options={{headerShown: false}} component={EditParentProfile} />
        <Stack.Screen name="TermsAndConditions" options={{headerShown: false}} component={TermsAndConditions} />
        <Stack.Screen name="HelpAndSupport" options={{headerShown: false}} component={HelpAndSupport} />
        <Stack.Screen name="StudentSetting" options={{headerShown: false}} component={StudentSetting} />
        <Stack.Screen name="EditStudentProfile" options={{headerShown: false}} component={EditStudentProfile} />
        <Stack.Screen name="StudentHomePage" options={{headerShown: false}} component={StudentHomePage} />
        <Stack.Screen name="TeacherRequests" options={{headerShown: false}} component={TeacherRequests} />
        <Stack.Screen name="TutorOptions" options={{headerShown: false}} component={TutorOptions} />
        <Stack.Screen name="PendingTeachers" options={{headerShown: false}} component={PendingTeachers} />
        <Stack.Screen name="CurrentTeachers" options={{headerShown: false}} component={CurrentTeachers} />
        <Stack.Screen name="TeacherInfo" options={{headerShown: false}} component={TeacherInfo} />
        <Stack.Screen name="Feedback" options={{headerShown: false}} component={Feedback} />
        <Stack.Screen name="PTutorOptions" options={{headerShown: false}} component={PTutorOptions} />
        <Stack.Screen name="PPendingTeachers" options={{headerShown: false}} component={PPendingTeachers} />
        <Stack.Screen name="PCurrentTeachers" options={{headerShown: false}} component={PCurrentTeachers} />
        <Stack.Screen name="PTeacherInfo" options={{headerShown: false}} component={PTeacherInfo} />
        <Stack.Screen name="FeedbackList" options={{headerShown: false}} component={FeedbackList} />
        <Stack.Screen name="AllFeedbacks" options={{headerShown: false}} component={AllFeedbacks} />
        <Stack.Screen name="JoinCall" options={{headerShown: false}} component={JoinCall} />
        <Stack.Screen name="MeetingScreen" options={{headerShown: false}} component={MeetingScreen} />



      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}