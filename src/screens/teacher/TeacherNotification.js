import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TeacherNotification = ({ route }) => {
    const adminEmail = route.params.adminEmail;
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(adminEmail);
    const fetchNotifications = async (adminEmail) => {
        try {
            setLoading(true);
            const querySnapshot = await firestore()
                .collection('Notifications')
                .where('adminEmail', '==', adminEmail)
                .get();

            const notificationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            notificationsData.sort((a, b) => b.time._seconds - a.time._seconds);
            setNotifications(notificationsData);
            console.log(notificationsData);

        } catch (error) {
            console.error('Error fetching notifications: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications(adminEmail);
    }, [adminEmail]);


    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={themeColors.bg2} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text
                style={{
                    color: themeColors.bg2,
                    fontSize: 24,
                    padding: 25,
                    fontWeight: 'bold',
                    marginTop: hp(2),
                    alignSelf: 'center'
                }}
            >
                All Notifications
            </Text>
            {notifications.length > 0 ? (
                notifications.map((item, index) => (
                    <View key={index} style={styles.notificationItem}>
                        <TouchableOpacity style={{ padding: 7 }}>
                            <Text style={{ color: 'red', fontWeight: 'bold', padding: 5, marginBottom: hp(1) }}>
                                <Text style={{ color: themeColors.bg3, fontWeight: 'bold' }} >Message : </Text>
                                {item.message}
                            </Text>
                            <Text style={styles.time}>
                                <Text style={{ color: themeColors.bg3, fontWeight: 'bold' }} >Sent By : </Text>
                                {item.adminName}
                            </Text>
                            <Text style={{ color: themeColors.bg2, padding: 2 }}>
                                <Text style={{ color: themeColors.bg3, fontWeight: 'bold', paddingBottom: 5 }} >Received At : </Text>
                                {item.time ? new Date(item.time._seconds * 1000).toLocaleString() : ''}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text>No notifications found</Text>
            )}
            {loading && <ActivityIndicator size="large" color={themeColors.bg2} />}
        </ScrollView>
    );

}

export default TeacherNotification;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',


    },
    notificationItem: {
        backgroundColor: "white",
        borderRadius: 9,

        height: hp(16),
        paddingLeft: wp(2),

        marginHorizontal: wp(3),
        marginVertical: hp(1),
        shadowColor: 'gray',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 8,
    },
    notifi: {
        color: themeColors.bg3
    },
    time: {
        color: themeColors.bg2,
        padding: 2
    }
});
