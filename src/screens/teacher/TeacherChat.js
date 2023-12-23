import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TeacherChat = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsCollection = await firestore().collection('Students').get();
        const studentData = studentsCollection.docs.map(doc => doc.data());
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.username}</Text>
      {/* Add additional information as needed */}
    </View>
  );

  return (
    <FlatList
      style={{ margin: 20 }}
      data={students}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TeacherChat;
