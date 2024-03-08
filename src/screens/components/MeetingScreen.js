import React, { useEffect, useState } from 'react';
import { View, LogBox } from 'react-native';
import { ZegoUIKitPrebuiltCall, GROUP_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { captureRef } from 'react-native-view-shot';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const MeetingScreen = ({ navigation, route }) => {
    const [userName, setUserName] = useState(route.params.UserName);
    const [callID, setCallID] = useState(route.params.passcode);
    const [userId, setUserId] = useState(route.params.Id);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        setUserName(route.params.UserName);
        setCallID(route.params.passcode);
        setUserId(route.params.Id);
    }, [route.params]);

    useEffect(() => {
        const interval = setInterval(() => {
            takeScreenshotAndUpload();
        }, 60000); // 1 minute interval

        return () => clearInterval(interval);
    }, []);

    const takeScreenshotAndUpload = async () => {
        try {
            const uri = await captureRef(/* ref of the component you want to capture */);

            // Upload screenshot to Firebase Storage
            const response = await fetch(uri);
            const blob = await response.blob();

            // Use the auth().currentUser.uid to get the current user's UID
            const storageRef = storage().ref().child(`screenshots/${auth().currentUser.uid}/${Date.now()}.png`);
            await storageRef.put(blob);

            // Get downloadable URL
            const downloadURL = await storageRef.getDownloadURL();

            // Store the URL in Firestore
            await firestore().collection('ScreenShots').add({
                userId: userId,
                userName: userName,
                downloadURL: downloadURL,
                timestamp: firestore.FieldValue.serverTimestamp()
            });

            console.log('Screenshot uploaded successfully!');
        } catch (error) {
            console.error('Error uploading screenshot:', error);
        }
    };

    const callEnded = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    LogBox.ignoreLogs([
        'requestMultiple {}',
        'roleDescription',
        'Props',
    ]);

    return (
        <View key={refreshKey} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ZegoUIKitPrebuiltCall
                appID={1559841106}
                appSign={'317602ea0798e87fa555d188e9e666050b91fcfd6e712d16a313a7d0cec6b1c1'}
                userID={userId}
                userName={userName}
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
        </View>
    );
};

export default MeetingScreen;
