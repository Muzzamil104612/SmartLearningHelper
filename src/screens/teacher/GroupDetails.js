import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { themeColors } from '../../theme';
import firestore from '@react-native-firebase/firestore';
import NoticeListCom from '../components/StNoticeListCom';

const GroupDetails = ({ route, navigation }) => {
    const { groupId } = route.params;
    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('groups')
            .doc(groupId)
            .collection('SubjectMaterial')
            .onSnapshot((querySnapshot) => {
                const noticeData = querySnapshot.docs.map((documentSnapshot) => ({
                    id: documentSnapshot.id,
                    ...documentSnapshot.data(),
                }));
                setNoticeList(noticeData);
            });

        return () => unsubscribe();
    }, []);

    const handleLinkPress = (url) => {
        Linking.openURL(url);
    };

    const renderDescriptionWithLinks = (description) => {
        if (!description) return null;
    
        const urlRegex = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/g;
        const segments = description.split(urlRegex);
        
        return segments.map((segment, index) => {
            if (segment && segment.match && segment.match(urlRegex)) {
                const url = segment;
                return (
                    <TouchableOpacity key={index} onPress={() => handleLinkPress(url)}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{segment}</Text>
                </TouchableOpacity>
                
                );
            } else {
                return <Text key={index}>{' '}{segment}</Text>;
            }
        });
    };
    
    
    

    const renderItem = ({ item }) => (
        console.log(item.message,"item description"),
        <NoticeListCom
            name={item.title}
            Rollnumber={item.message}
            description={renderDescriptionWithLinks(item.description)}
            documentName={item.documentName}
            documentUrl={item.documentURL}
            onEdit={() => navigation.navigate('EdtNotice', { data: item })}
            onDelete={() => deleteNotice(item.id, item.documentName)}
        />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animatable.View animation="zoomIn" duration={2000} style={styles.container}>
                <Text style={styles.header}>𝘾𝙡𝙖𝙨𝙨 𝘿𝙞𝙨𝙘𝙪𝙨𝙨𝙞𝙤𝙣</Text>
                <FlatList
                    data={noticeList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={false}
                />
                <View style={styles.add}>
                    <TouchableOpacity
                        style={styles.fixedPlusButton}
                        onPress={() => {
                            navigation.navigate('NoticeList', { groupId });
                        }}
                    >
                        <Text style={styles.plusButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: hp(3),
        marginBottom: hp(2),
        color: themeColors.bg3,
    },
    add: {
        height: hp(99),
        width: wp(96),
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    fixedPlusButton: {
        position: 'absolute',
        height: hp(10),
        width: wp(20),
        backgroundColor: 'white',
        borderRadius: 50,
        bottom: hp(2.3),
        right: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 4,
        shadowRadius: 5,
        elevation: 10,
    },
    plusButtonText: {
        color: 'gray',
        fontSize: 34,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default GroupDetails;
