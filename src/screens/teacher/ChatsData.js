import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatMessagesList = () => {
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    const fetchMessagesList = async () => {
      try {
        // Fetch Chats collection from Firestore
        const chatsSnapshot = await firestore().collection('Chats').get();

        // Extract data from messages collection in each document
        const allMessages = [];
        for (const chatDoc of chatsSnapshot.docs) {
          const messagesSnapshot = await chatDoc.ref.collection('messages').get();
          messagesSnapshot.forEach((messageDoc) => {
            allMessages.push({
              chatId: chatDoc.id,
              messageId: messageDoc.id,
              ...messageDoc.data(),
            });
          });
        }

        setMessagesList(allMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMessagesList();
  }, []);

  return (
    <View>
      <Text>All Data Fields from Messages Collection:</Text>
      {messagesList.map((message) => (
        <View key={message.messageId}>
          <Text>Chat ID: {message.chatId}</Text>
          <Text>Message ID: {message.messageId}</Text>
          {/* Render other data fields from the 'messages' collection */}
          <Text>{/* Add other fields as needed */}</Text>
        </View>
      ))}
    </View>
  );
};

export default ChatMessagesList;
