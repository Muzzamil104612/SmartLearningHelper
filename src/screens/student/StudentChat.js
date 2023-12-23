import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const StudentChat = () => {
  const [sentToUsernames, setSentToUsernames] = useState([]);



  useEffect(() => {
    const unsubscribe = firestore().collection('Chats').onSnapshot(querySnapshot => {
      const usernames = [];
      console.log(" sentTousername");
      querySnapshot.forEach(doc => {
        const messages = doc.data().messages || [];
       //// console.log("messages");
        const lastMessage = messages[0] || {};
        const sentTousername = lastMessage.sentTousername || '';
        usernames.push(sentTousername);
      });

      setSentToUsernames(usernames);
      console.log(sentToUsernames+" emp sentTousername");
    });

    return () => unsubscribe();
  }, []);


  const renderUsernameItem = ({ item }) => (
    <View style={styles.usernameItem}>
      <Text style={styles.username}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sentToUsernames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUsernameItem}
      />
    </View>
  );
};

export default StudentChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  usernameItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
