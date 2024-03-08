

import { useSelector } from 'react-redux';


import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import StoreCount from '../components/storeCount';



const ParentChatMessages = ({ route }) => {

    const data= useSelector(state =>state.value. parentData);

  const [messages, setMessages] = useState([]);
  const { teacherId, teacherUsername,teacherImageURL } = route.params;
let counter=0;

  useEffect(() => {
    ///const docid = teacherId+data.userID;

  
    const docid = teacherId + data.userID;
    const messageRef = firestore()
      .collection('PTChats')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot((querySnap) => {
      if (querySnap) {
        const allmsg = querySnap.docs.map((docSnap) => {
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
        // Handle the case where querySnap is null
        console.error("No documents found in the query.");
      }
    });

    return () => {
      unSubscribe();
    };
  }, [teacherId, data.userID]);


  const onSend = async(messageArray) => {
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      sentByid: data.userID,
      sentByusername: data.name,
      sentToid: teacherId,
      sentTousername: teacherUsername,
      createdAt: new Date(),
    };
    setMessages((previousMessages) => GiftedChat.append(previousMessages, mymsg));
  
    
    const docid = teacherId + data.userID;

    firestore()
      .collection('PTChats')
      .doc(docid)
      .collection('messages')
      .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() });

      StoreCount(data.userID,counter+1);

      try {
        const ParentChatSnapshot = await firestore().collection('ParentsChat').where('parentId', '==', data.userID).get();
      
        if (ParentChatSnapshot.size == 0) {
          await firestore().collection('ParentsChat').add({
            parentId: data.userID,
            parentName: data.name,
            ImageURL: data.ImageURL,
            unread: true,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
          console.log("data added to ParentsChat");
        } else {
          const docId = ParentChatSnapshot.docs[0].id;
          console.log(docId);
          await firestore().collection('ParentsChat').doc(docId).update({
            unread:true,
            createdAt: firestore.FieldValue.serverTimestamp(),
          
          });
          console.log("Data updated in ParentsChat");
        }
      } catch (error) {
        console.error("Error updating ParentsChat:", error);
      }
      


      const TeacherChatSnapshot = await firestore()
      .collection('TeachersChat')
      .where('teacherId', '==', teacherId)
      .get();
    
    if (TeacherChatSnapshot.size == 0) {
      await firestore()
        .collection('TeachersChat')
        .add({
          teacherId: teacherId,
          teacherName: teacherUsername,
          ImageURL: data.ImageURL,
          unread: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    
      console.log("Data added to TeachersChat");
    } else {
      const docId = TeacherChatSnapshot.docs[0].id;
    
      await firestore()
        .collection('TeachersChat')
        .doc(docId)
        .update({
            unread:false,
          createdAt: firestore.FieldValue.serverTimestamp(),
       
        });
    
      console.log("Data updated in TeachersChat");
    }
    
    
   
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

     >Chatting with {teacherUsername}</Text>
     
      <GiftedChat
        messages={messages}
        onSend={(text) => onSend(text)}
        user={{
          _id: data.userID,
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
}
export default ParentChatMessages;