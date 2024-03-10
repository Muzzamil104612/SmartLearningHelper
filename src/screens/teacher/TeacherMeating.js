import React, { useEffect, useState, useRef } from 'react';
import { View, Text, LogBox } from 'react-native';
import { ZegoUIKitPrebuiltCall, GROUP_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { captureScreen } from 'react-native-view-shot';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
const TeacherMeeting = ({ navigation, route }) => {
  const [userName, setUserName] = useState(route.params.UserName);
  const [callID, setCallID] = useState(route.params.passcode);
  const [userId, setUserId] = useState(route.params.Id);
  const studentData = route.params.selectedStudent;
  const StudentEmail=studentData.email;
  const StudentParentGmail=studentData.parentEmail;
  console.log(StudentEmail,StudentParentGmail);
  const [forceRender, setForceRender] = useState(false);
  const [screenshotMessage, setScreenshotMessage] = useState('');
  const data = useSelector(state => state.value.TeacherData);
  const currentUserEmail = data.email;
  const isCallEnded = useRef(false);

  useEffect(() => {
    setUserName(route.params.UserName);
    setCallID(route.params.passcode);
    setUserId(route.params.Id);
   
    isCallEnded.current = false;
  }, [route.params]);

  useEffect(() => {
    const screenshotInterval = setInterval(() => {
      takeScreenshotAndUpload();
    }, 30000);

    return () => {
      clearInterval(screenshotInterval);
    };
  }, [forceRender]);

  const takeScreenshotAndUpload = async () => {
    try {
      if (!isCallEnded.current) {
        setScreenshotMessage('Taking screenshot...');

        // Fetch the groupId based on conditions
        const groupsQuery = await firebase.firestore().collection('groups')
          .where('teacherEmail', '==', currentUserEmail)
          .where('studentEmail', '==', StudentEmail)
          .where('parentEmail', '==', StudentParentGmail)
          .limit(1)
          .get();

        if (!groupsQuery.empty) {
          const groupId = groupsQuery.docs[0].id;

          const options = { format: 'png', quality: 0.8 };
          const uri = await captureScreen(options);

          const response = await fetch(uri);
          const blob = await response.blob();
          const storageRef = firebase.storage().ref().child(`screenshots/${Date.now()}.png`);
          await storageRef.put(blob);

          const downloadURL = await storageRef.getDownloadURL();

          if (userId && userName) {
            const description = `Date and Time: ${new Date().toLocaleString()}`;
            await firebase.firestore().collection('groups').doc(groupId)
              .collection('SubjectMaterial').add({
                
                title: 'Captured Screenshot',
                message: description,
                documentURL: downloadURL,
                
              });

            setScreenshotMessage('Screenshot taken successfully!');
          } else {
            console.error('userId or userName is undefined');
            setScreenshotMessage('Error: userId or userName is undefined');
          }
        } else {
          console.warn('No matching group found.');
          setScreenshotMessage('Error: No matching group found.');
        }
      } else {
        console.warn('Call is already ended');
        setScreenshotMessage('Error: Call has ended');
      }
    } catch (error) {
      console.error('Error capturing screenshot and uploading:', error);
      setScreenshotMessage('Error capturing screenshot and uploading');
    }
  };

  const callEnded = () => {
    setForceRender((prev) => !prev);
    isCallEnded.current = true;
  };

  LogBox.ignoreLogs([
    'requestMultiple {}',
    'roleDescription',
    'Props',
  ]);

  const randomUserId = String(Math.floor(Math.random() * 100000));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ZegoUIKitPrebuiltCall
        appID={1559841106}
        appSign={'317602ea0798e87fa555d188e9e666050b91fcfd6e712d16a313a7d0cec6b1c1'}
        userID={userId}
        userName={userName + randomUserId}
        callID={callID}
        config={{
          ...GROUP_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            callEnded();
            navigation.navigate('TeacherJoinCall', { UserName: userName, userID: userId});
          },
          onHangUp: () => {
            callEnded();
            navigation.navigate('TeacherJoinCall', { UserName: userName, userID: userId });
          },
          stop: isCallEnded.current,
        }}
      />
      <Text>{screenshotMessage}</Text>
    </View>
  );
};

export default TeacherMeeting;
