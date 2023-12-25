import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { Text } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import StoreCount from '../components/storeCount';

const ParentsChatMessages = ({ route }) => {
  const teacher = useSelector(state => state.value.TeacherData);
  const [messages, setMessages] = useState([]);
  const { parentId, parentUsername,parentImageURL } = route.params;
  

  useEffect(() => {
    

    const docid = teacher.userID + parentId;

    const messageRef = firestore()
      .collection('PTChats')
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
  }, [parentId, teacher.userID]);

  const onSend = async (messageArray) => {
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      sentByid: teacher.userID,
      sentByusername: teacher.name,
      sentToid: parentId,
      sentTousername: parentUsername,
      createdAt: new Date(),


    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
   


    const docid = teacher.userID + parentId;


    await firestore()
      .collection('PTChats')
      .doc(docid)
      .collection('messages')
      .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() });


    const teacherChatSnapshot = await firestore().collection('TeachersChat').where('teacherId', '==', teacher.userID).get();

    if (teacherChatSnapshot.size==0) {
      firestore()
        .collection('TeachersChat')
        .add({
          teacherId: teacher.userID,
          teacherName: teacher.name,
          ImageURL: teacher.ImageURL,
          unread:true,
          createdAt: firestore.FieldValue.serverTimestamp(),

        });

        console.log("data added to teacher chats");

    }
    else {
      // If the teacherId already exists, update the existing record
      const docId = teacherChatSnapshot.docs[0].id;
    
      await firestore()
        .collection('TeachersChat')
        .doc(docId)
        .update({
            unread:true,
          createdAt: firestore.FieldValue.serverTimestamp(),
       
        });
    
      console.log("Data updated in TeachersChat");
    }


    
    const parentChatSnapshot =await firestore().collection('ParentsChat').where('parentId', '==', parentId).get();

    if (parentChatSnapshot.size==0) {
      firestore()
        .collection('ParentsChat')
        .add({
          parentId: parentId,
          parentName: parentUsername,
          ImageURL: parentImageURL,
          unread:false,
          createdAt: firestore.FieldValue.serverTimestamp(),


        });

        console.log("data added to parents chats");

    }
    else {
      // If the teacherId already exists, update the existing record
      const docId = parentChatSnapshot.docs[0].id;
    
      await firestore()
        .collection('ParentsChat')
        .doc(docId)
        .update({
            unread:false,
          createdAt: firestore.FieldValue.serverTimestamp(),
         

        });
    
      console.log("Data updated in ParentsChat");
    }
    

  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Text
  style={{
    color: 'white',
    margin: 20,
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 19,
    fontStyle: 'italic',
    backgroundColor: themeColors.bg2,
    padding: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: themeColors.bg3,
    borderWidth: 1.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  }}
>
  Chatting with {parentUsername} 
</Text>

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
                  style={{
                    width: widthPercentageToDP(7), height: heightPercentageToDP(4), margin: 12,
                    color: themeColors.bg2

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

export default ParentsChatMessages;
