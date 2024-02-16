import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../../theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Studygroups = () => {
  const navigation = useNavigation();
  const data = useSelector((state) => state.value.stdData);
  const [myObject, setMyObject] = useState({
    userID: '',
    name: '',
    email: '',
    // Add other properties as needed
  });
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMyObject(data);
  }, [data]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Simulate a delay of 3 seconds
      

        const groupsRef = firebase.firestore().collection('groups');
        const snapshot = await groupsRef.where('studentEmail', '==', myObject.email).get();
        const groupsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGroups(groupsData);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setLoading(false);
      }
    };

    fetchGroups();
  }, [myObject.email]);

  const navigateToGroupDetails = (groupId) => {
    navigation.navigate('StdGroupDetails', { groupId });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Groups</Text>
      {loading ? (
        <ActivityIndicator size="large" color={themeColors.bg3} style={styles.loadingIndicator} />
      ) : groups.length === 0 ? (
        <Text style={{ alignSelf: 'center', marginTop: hp(20), color: themeColors.bg2, fontSize: 30, textAlign: 'center' }}>𝓝𝓸 𝓰𝓻𝓸𝓾𝓹 𝓕𝓸𝓾𝓷𝓭</Text>
      ) : (
        groups.map(group => (
          <TouchableOpacity key={group.id} onPress={() => navigateToGroupDetails(group.id)}>
            <View style={styles.render}>
              <Image source={require('../../assets/icons/class.png')} style={styles.image} />
              <Text style={styles.groupName}>{group.groupName}</Text>
              {/* Add other details of the group if needed */}
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image:
  {
    height: hp(8),
    width: wp(17),
    marginLeft: wp(3),
    borderRadius: wp(10),
  },
  render:
  {
    height: hp(10),
    width: wp(85),
    borderWidth: wp(0.4),
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderRadius: wp(3),
    marginTop: hp(2),
    marginLeft: wp(2),
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: themeColors.bg2,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: themeColors.bg3,
  },
  groupItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: themeColors.bg2,
    borderRadius: 5,
  },
  groupName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: themeColors.bg3,
    marginLeft: wp(4),
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default Studygroups;
