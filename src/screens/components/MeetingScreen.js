import React, { useEffect, useState, useRef } from 'react';
import { View, Text, LogBox } from 'react-native';
import { ZegoUIKitPrebuiltCall, GROUP_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { captureRef } from 'react-native-view-shot';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const MeetingScreen = ({ navigation, route }) => {
    const [userName, setUserName] = useState(route.params.UserName);
    const [callID, setCallID] = useState(route.params.passcode);
    const [userId, setUserId] = useState(route.params.Id);
    const [refreshKey, setRefreshKey] = useState(0);
    const [screenshotMessage, setScreenshotMessage] = useState('');
    const captureRefView = useRef(null); // Create a ref for the view to capture
    const isCallEnded = useRef(false); // Create a ref to track if the call has ended

    useEffect(() => {
        setUserName(route.params.UserName);
        setCallID(route.params.passcode);
        setUserId(route.params.Id);
        isCallEnded.current = false; // Reset the call status on route change
    }, [route.params]);

    useEffect(() => {
        const screenshotInterval = setInterval(() => {
            takeScreenshotAndUpload();
        }, 30000); // 30 seconds interval

        return () => {
            clearInterval(screenshotInterval); // Clear the interval on component unmount
        };
    }, []);

    const takeScreenshotAndUpload = async () => {
        try {
            if (captureRefView.current && !isCallEnded.current) {
                setScreenshotMessage('Taking screenshot...');
                const uri = await captureRef(captureRefView, /* additional options if needed */);

                // Upload screenshot to Firebase Storage
                const response = await fetch(uri);
                const blob = await response.blob();
                const storageRef = firebase.storage().ref().child(`screenshots/${Date.now()}.png`);
                await storageRef.put(blob);

                // Get downloadable URL
                const downloadURL = await storageRef.getDownloadURL();

                // Store the URL in Firestore
                await firebase.firestore().collection('screenshots').add({
                    userId: userId,
                    userName: userName,
                    downloadURL: downloadURL,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });

                setScreenshotMessage('Screenshot taken successfully!');
            } else {
                console.warn('captureRefView is not available or call is already ended');
                setScreenshotMessage('Error: Call has ended or view not available');
            }
        } catch (error) {
            console.error('Error capturing screenshot and uploading:', error);
            setScreenshotMessage('Error capturing screenshot and uploading');
        }
    };

    const callEnded = () => {
        setRefreshKey((prevKey) => prevKey + 1);
        isCallEnded.current = true; 
    };

    LogBox.ignoreLogs([
        'requestMultiple {}',
        'roleDescription',
        'Props',
    ]);

    const randomUserId = String(Math.floor(Math.random() * 100000));
    console.log("username",userName," Random Number",randomUserId);
    return (
        <View key={refreshKey} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                        navigation.navigate('JoinCall', { UserName: userName, userId: userId });
                    },
                    onHangUp: () => {
                        callEnded();
                        navigation.navigate('JoinCall', { UserName: userName, userId: userId });
                    },
                }}
            />
            {/* Display the screenshot message */}
            <Text>{screenshotMessage}</Text>
            {/* Assign the ref to the view you want to capture */}
            <View ref={captureRefView} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }} />
        </View>
    );
};

export default MeetingScreen;
