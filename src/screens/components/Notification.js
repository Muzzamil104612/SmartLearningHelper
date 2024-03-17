import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import notifee from '@notifee/react-native';
import { themeColors } from '../../theme';

const Notification = () => {

    async function onDisplayNotification() {
        console.log("Displaying notification...");
        try {
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            await notifee.displayNotification({
                title: 'Smart Learning Helper ',
                body: 'Hye Parent pay your fee...',
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
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => { onDisplayNotification() }}
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
})
