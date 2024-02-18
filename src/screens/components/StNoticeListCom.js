import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Linking } from 'react-native';
const NoticeListCom = ({ name, Rollnumber, documentUrl,documentName, onEdit, onDelete }) => {
   
    const openDocument = async () => {
        console.log("Opening document:", documentUrl);
      
        if (documentUrl) {
            const supported = await Linking.canOpenURL(documentUrl);
            if (supported) {
                Linking.openURL(documentUrl);
            } else {
                console.error("Cannot open URL:", documentUrl);
            }
        }
    };
    
    const handleLinkPress = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        Linking.openURL(url);
    };
    

    const renderDescriptionWithLinks = (description) => {
     
        if (!description) return null;
        console.log('hye.......')
        const urlRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:\/\S*)?/g;
        const segments = description.split(urlRegex);
        console.log('hye.......',segments,description)
        return segments.map((segment, index) => {
            if (segment && segment.match && segment.match(urlRegex)) {
                const url = segment;
                return (
                    <TouchableOpacity key={index}
                  
                    onPress={() => handleLinkPress(url)}>
                    <Text style={{ color: 'blue',fontSize:14,fontWeight:'500'}}>{segment}</Text>
                </TouchableOpacity>
                
                );
            } else {
                return <Text key={index}>{' '}{segment}</Text>;
            }
        });
    };
    
    
    return (
     <View>
        <View style={styles.render}>
            
        <View style={styles.texting}>
          <Text style={styles.classItemt}>𝐓𝐢𝐭𝐥𝐞 :
         <Text  style={styles.classItem}> {name}</Text>
         </Text>
            <Text style={styles.classItem1}>𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 : 
            <Text  style={styles.classItem} selectable={true}>{renderDescriptionWithLinks(Rollnumber)}</Text>
            </Text>
           
            </View>
           
           
  
       
         
      </View>
      {documentUrl && (
                <TouchableOpacity style={styles.openDocumentButton} onPress={openDocument}>
                    <Text style={styles.openDocumentButtonText}>Open Document {'>'}</Text>
                </TouchableOpacity>
            )}
   
      </View>
    );
  };

          
     





const styles = StyleSheet.create({
    documentItem: {
        fontSize: wp(3),
        color: 'black',
        marginLeft: wp(2),
    },
    openDocumentButton: {
        height: hp(5),
        width: wp(30),
      //  backgroundColor: 'blue',
        borderRadius: wp(3),
    marginTop:hp(2),
    alignContent:'flex-end',
       marginLeft: wp(65),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'green',
        borderStyle:'solid',
        borderWidth:wp(0.3)
    },
    openDocumentButtonText: {
        textAlign: 'center',
        fontSize: wp(3.4),
        fontWeight: 'bold',
        color: 'green',
      
    },
    documentName: {
        fontSize: wp(4),
        color: 'black',
        marginLeft: wp(2),
    },
    render:
    {
        height: hp(15),
        width: wp(95),
        borderWidth: wp(0.4),
        borderStyle: 'solid',
        borderColor: 'lightgray',
        borderRadius: wp(3),
        marginTop: hp(2),
        marginLeft: wp(2),
        flexDirection: 'row',
      //  justifyContent:'center',
        alignItems: "center",
        //alignContent:"center",
    },

    classItem:
    {
        fontSize: wp(4),
      color:'black',
        marginLeft: wp(2),
     
    },
    classItemt:
    {
        fontSize: wp(6),
      color:'green',
        marginLeft: wp(2),
        marginTop:hp(-7)
     
    },
    classItem1:
    {
        fontSize: wp(4.8),
        color: 'black',
        marginLeft: wp(2),
        color:'red'

    },
    classItems1:
    {
        fontSize: wp(4),
        color: 'black',
        marginLeft: wp(2.5),
        borderWidth: wp(0.4),
        borderStyle: 'solid',
        borderColor:'white',
        borderBottomColor: 'lightgray',
        height: hp(5),
        width: wp(30),


    },
    image:
    {
        height: hp(6),
        width: wp(13),
        marginLeft: wp(3),
        borderRadius: wp(10),
    },
    texting: {
        flexDirection: "column",
        width: wp(90),
        marginTop:hp(3),
    },
   
    cancel2:
    {
        height: hp(5.3),
        width: wp(19),
        marginLeft:wp(-37),
        backgroundColor: 'green',
        marginRight: wp(1),
        borderRadius: wp(10),
        marginTop:hp(12),

    },

    cancels2:
    {

        textAlign: 'center',
        marginTop: hp(1.2),
        fontWeight: 'bold',

        color: 'black',

    },
    save2:
    {
        height: hp(5.3),
        width: wp(19),

        marginTop:hp(12),
        backgroundColor: 'lightgray',
        borderRadius: wp(10),

    },

    saves2:
    {

        textAlign: 'center',
        marginTop: hp(1.2),
        fontWeight: 'bold',
        color: 'green',

    },
    save3:
    {
        height: hp(6),
        width: wp(20),

marginLeft:wp(1.9),
        backgroundColor: 'blue',
        borderRadius: wp(10),

    },

    saves3:
    {

        textAlign: 'center',
        marginTop: hp(1.8),
        fontWeight: 'bold',
        color: 'white',

    },
});

export default NoticeListCom ;