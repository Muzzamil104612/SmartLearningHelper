// ChatList.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Chats')
      .onSnapshot((querySnapshot) => {
        const newChats = [];
        querySnapshot.forEach((doc) => {
          newChats.push({ id: doc.id, ...doc.data() });
        });
        setChats(newChats);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ChatList;
