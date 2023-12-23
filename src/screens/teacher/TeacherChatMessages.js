import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { Text } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

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
     <Text
     style={{
      color:'white',
      margin:20,
      alignSelf:'center',
      fontWeight:'700',
      fontSize:19,
      fontStyle:'italic',
      backgroundColor:themeColors.bg2,
      padding:10,
      borderRadius:5,
      borderStyle:'solid',
      borderColor:themeColors.bg3,
      borderWidth:1.2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 8,
     }}

     >Chatting with {studentUsername}</Text>
      <GiftedChat
        messages={messages}
        onSend={(text) => onSend(text)}
        user={{
          _id: teacher.userID,
        }}
        renderSend={props => {
          return (

            <View style={{ flexDirection: 'row' }}>
              <Send  {...props} >
              <Image
              source={require('../../assets/images/send.png')}
              style={{width:widthPercentageToDP(7),height:heightPercentageToDP(4),margin:12,
              color:themeColors.bg2
              
              }}
              
              /></Send>
            </View>
          )
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
