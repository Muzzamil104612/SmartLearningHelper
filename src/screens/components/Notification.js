import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert, Linking, Platform } from 'react-native';
import notifee from '@notifee/react-native';
import { themeColors } from '../../theme';

const Notification = () => {
    const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(false);

    const requestNotificationPermission = async () => {
        try {
            await notifee.requestPermission();
           
            console.log("Notification permission ...");
        } catch (error) {
            setNotificationPermissionGranted(false);
            console.log("Error requesting notification permission:", error);
        }
    };

    const handleNotificationSend = async () => {
        if (!notificationPermissionGranted) {
            Alert.alert(
                "Notification Permission Required",
                "Please allow the app to send notifications in order to proceed.",
                [
                    {
                        text: "OK",
                        
                        onPress: () =>{ console.log("OK pressed")
                        setNotificationPermissionGranted(false)},
                    },
                    {
                        text: "Open Settings",
                        onPress: () =>{ openAppSettings()
                            setNotificationPermissionGranted(true)},
                    }
                ],
                { cancelable: false }
            );
        } else {
            await onDisplayNotification();
        }

        // Check if notification permission is granted after attempting to request it
        if (!notificationPermissionGranted) {
            requestNotificationPermission();
        }
    };

    const onDisplayNotification = async () => {
        console.log("Displaying notification...");
        try {
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            await notifee.displayNotification({
                title: 'Smart Learning Helper ',
                body: 'Hey Parent, pay your fee...',
                android: {
                    channelId,
                    // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                    // pressAction is needed if you want the notification to open the app when pressed
                    pressAction: {
                        id: 'default',
                    },
                },
            });

            console.log("Notification displayed successfully.");
        } catch (error) {
            console.log("Error displaying notification:", error);
        }
    };

    const openAppSettings = () => {
        if (Platform.OS === 'android') {
            Linking.openSettings();
        } else if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            Alert.alert(
                "Unsupported Platform",
                "App settings are not supported on this platform.",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK pressed"),
                    }
                ],
                { cancelable: false }
            );
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    handleNotificationSend();
                   
                }}
                style={styles.btn}
            >
                <Text style={styles.btntxt}>Send Notification</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        padding: 15,
        backgroundColor: themeColors.bg2,
        borderRadius: 10,
    },
    btntxt: {
        color: 'white'
    }
});
