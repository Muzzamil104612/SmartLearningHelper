import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';

const TeacherChatMessages = ({ route }) => {
  const teacher = useSelector(state => state.value.TeacherData);
  const [messages, setMessages] = useState([]);
  const { studentId, studentUsername } = route.params;

  useEffect(() => {
    const teacherDocId = teacher.userID;
    const studentDocId = studentId;

    
    const truncatedTeacherId = teacherDocId.substring(0, 10);
    const truncatedUserId = studentDocId.substring(0, 10);
    const docid = truncatedTeacherId + truncatedUserId;

    const messageRef = firestore()
      .collection('Chats')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      if (querySnap) {
        const allmsg = querySnap.docs.map(docSnap => {
          const data = docSnap.data();

          if (data.createdAt) {
            return {
              ...docSnap.data(),
              createdAt: data.createdAt.toDate(),
            };
          } else {
            return {
              ...docSnap.data(),
              createdAt: new Date(),
            };
          }
        });

        setMessages(allmsg);
      } else {
        console.error('No documents found in the query.');
      }
    });

    return () => {
      unSubscribe();
    };
  }, [studentId, teacher.userID]);

  const onSend = async (messageArray) => {
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      sentByid: teacher.userID,
      sentByusername: teacher.name,
      sentToid: studentId,
      sentTousername:studentUsername,
      createdAt: new Date(),
      
      
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    const teacherDocId = teacher.userID;
    const studentDocId = studentId;

    
    const truncatedTeacherId = teacherDocId.substring(0, 10);
    const truncatedUserId = studentDocId.substring(0, 10);
    const docid = truncatedTeacherId + truncatedUserId;


    await firestore()
      .collection('Chats')
      .doc(docid)
      .collection('messages')
      .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <GiftedChat
        messages={messages}
        onSend={(text) => onSend(text)}
        user={{
          _id: teacher.userID,
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: themeColors.bg2,
                },
              }}
            />
          );
        }}
        renderInputToolbar={(props) => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{ borderTopWidth: 1.5, borderTopColor: themeColors.bg2 }}
              textInputStyle={{ color: themeColors.bg3 }}
            />
          );
        }}
      />
    </View>
  );
};

export default TeacherChatMessages;
