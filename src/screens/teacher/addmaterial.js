import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, SafeAreaView, ScrollView,linking, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import DocumentPicker from 'react-native-document-picker'; // Import the library
import storage from '@react-native-firebase/storage';
const NoticeList = ({ route, navigation }) => {
    const { groupId } = route.params;
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState(null); // Store the selected document


  const handleDocumentPick = async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory', // Specify the type of document to pick
      });
  
      console.log(result);
      
      if (result && result.length > 0) {
        const documentUri = result[0].fileCopyUri;
        setDocument(result); // Store the selected document
    
        // Upload the document to cloud storage
        const documentName = result[0].name;
        const reference = storage().ref(documentName);
        await reference.putFile(documentUri);
        console.log('Document uploaded to cloud storage');
        setIsLoading(false);
        // Fetch the download URL
        const imageURL = await reference.getDownloadURL();
        setImageURL(imageURL);
  
        console.log('Document download URL:', imageURL);

      }
    } catch (error) {
      setIsLoading(false);
      if (!DocumentPicker.isCancel(error)) {
        throw error;
      }
    }
  };
  
  const handleSubmit = async () => {
    console.log('hello', image);
    if (title && message && groupId) {
      try {
        const docRef = await firestore()
          .collection('groups')
          .doc(groupId)
          .collection('SubjectMaterial')
          .add({
            title: title,
            message: message,
            documentName: document ? (document.length > 0 ? document[0].name : '') : '', // Empty string if no document selected
            documentURL: document ? (document.length > 0 ? image : '') : '', // Empty string if no document selected
          });
  
        navigation.goBack();
  
        Alert.alert(Error, '𝐑𝐞𝐜𝐨𝐫𝐝 𝐢𝐬 𝐚𝐝𝐝𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲');
      } catch (error) {
        console.error('𝐄𝐫𝐫𝐨𝐫 𝐚𝐝𝐝𝐢𝐧𝐠 𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭: ', error);
      }
    } else {
      Alert.alert(Error, '𝐏𝐥𝐞𝐚𝐬𝐞 𝐟𝐢𝐥𝐥 𝐚𝐥𝐥 𝐟𝐢𝐞𝐥𝐝𝐬 𝐚𝐧𝐝 𝐬𝐞𝐥𝐞𝐜𝐭 𝐚 𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭.');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
     
        <Text style={styles.header}>𝓐𝓭𝓭 𝓜𝓪𝓽𝓮𝓻𝓲𝓪𝓵</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          placeholderTextColor={'lightgray'}
          onChangeText={setTitle}
        />
        <View style={styles.input2}>
          <TextInput
           style={styles.input3}
            placeholder="Message"
            multiline
            placeholderTextColor={'lightgray'}
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <Text style={{color:'red',fontSize:20,textAlign:'center',margin:hp(2),fontWeight:'bold'}}>OR</Text>
        <TouchableOpacity style={styles.inputd} onPress={handleDocumentPick} disabled={isLoading}>
  {isLoading ? (
    <Text style={styles.documentButtonText}>Selecting...</Text>
  ) : (
    <Text style={styles.documentButtonText}>Select Document  {'>'}</Text>
  )}
</TouchableOpacity>
        {document && (
          <Text style={styles.selectedDocument}>{document[0].name}</Text>
        )}
        <View style={styles.loginView}>
          <TouchableOpacity style={styles.loginTouch} onPress={handleSubmit} disabled={isLoading}>
            <Text style={styles.login}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  documentButton: {
    marginTop: hp(2),
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    backgroundColor: themeColors.bg3,
    borderRadius: wp(5),
    alignSelf: 'center',
  },
  documentButtonText: {
    color: themeColors.bg3,
    fontWeight: 'bold',
    fontSize:hp(2.4),
    textAlign:'center'
  },
  selectedDocument: {
    marginTop: hp(0.1),
    alignSelf: 'center',
    color:'red'
  },
    loginTouch:
    {
        width: wp(55),
        height: hp(8),
        marginTop: hp(5),
        borderRadius: wp(5),
        backgroundColor: themeColors.bg3,
    },
    loginView:
    {

        height: hp(14),
        marginTop: hp(1),
        alignItems: 'center',


    },
    login:
    {
        color: 'white',
        fontSize: 18,
        marginTop: hp(2.3),
        textAlign: 'center',
        fontWeight: 'bold',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 150,
    },
  container: {
    flex: 1,

  },
  header: {
 textAlign:'center',
    fontSize: 36,
    fontWeight: 'bold',
  marginTop:hp(10),
  marginBottom: hp(4),
  color:themeColors.bg3
  },
  input: {
    borderWidth: 1,
    borderColor: themeColors.bg3,
    borderRadius: 5,
    padding: 10,
    height:hp(9),
    width:wp(90),
    marginBottom:hp(1),
    marginLeft:wp(5),
    fontSize:hp(2),
  color:'black'
   
  },
  inputd: {
    borderWidth: 1,
    borderColor: themeColors.bg3,
    borderRadius: 5,
    padding: 10,
    height:hp(7),
    width:wp(60),
    marginBottom:hp(1),
    marginLeft:wp(20),
    fontSize:hp(2),
  color:'black'
   
  },
  input3: {
    fontSize:hp(2),
  color:'black'
   
  },
  input2: {
    borderWidth: 1,
    borderColor: themeColors.bg3,
    borderRadius: 5,
    padding: 10,
    height:hp(25),
    width:wp(90),
    marginBottom:hp(1),
    marginLeft:wp(5),
    fontSize:hp(2),
    color:'black',
  
   
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NoticeList;