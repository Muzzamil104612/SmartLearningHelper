import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Notification = ({ route }) => {
    const parentEmail = route.params.parentEmail;
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(parentEmail);
    const fetchNotifications = async (parentEmail) => {
        try {
            setLoading(true);
            const querySnapshot = await firestore()
                .collection('Notifications')
                .where('parentEmail', '==', parentEmail)
                .get();

            const notificationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNotifications(notificationsData);
            console.log(notificationsData);

        } catch (error) {
            console.error('Error fetching notifications: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications(parentEmail);
    }, [parentEmail]);


    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <TouchableOpacity 
            style={{padding:5}}
            >
            <Text style={{color:'red', fontWeight:'bold' ,padding:5,marginTop:hp(1)}}>
            <Text style={{color:themeColors.bg3, fontWeight:'bold'}} >Message : </Text>
                {item.message}</Text>
            <Text  style={styles.time}>
                <Text style={{color:themeColors.bg3, fontWeight:'bold'}} >Received At : </Text>
                {item.time ? new Date(item.time._seconds * 1000).toLocaleString() : ''}
                </Text>
            </TouchableOpacity>
            
        </View>
    );


    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={themeColors.bg2} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text
            style={{
                color:themeColors.bg2,
                fontSize:24,
                padding:25,
                fontWeight:'bold',
                marginTop:hp(2)
            }}
            >All Notifications</Text>
            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={item => item.id} // Use document ID as the key
                ListEmptyComponent={<Text>No notifications found</Text>}
            />
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
    notificationItem: {
        backgroundColor: "white",
        borderRadius: 9,
    
        height: hp(14),
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
    notifi:{
        color:themeColors.bg3
    },
    time:{
        color:themeColors.bg2,
        padding:2
    }
});
