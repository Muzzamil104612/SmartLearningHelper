import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Feedback = ({ teacherEmail, studentEmail, studentName, parentEmail, parentName, visible, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [feedbackExists, setFeedbackExists] = useState(false);

  useEffect(() => {
    const checkFeedbackExists = async () => {
      try {
        let feedbackQuery = null;
        if (studentEmail) {
          // Check if feedback exists for student
          feedbackQuery = firebase.firestore().collection('Feedbacks')
            .where('teacherEmail', '==', teacherEmail)
            .where('studentEmail', '==', studentEmail);
        } else {
          // Check if feedback exists for parent
          feedbackQuery = firebase.firestore().collection('Feedbacks')
            .where('teacherEmail', '==', teacherEmail)
            .where('parentEmail', '==', parentEmail);
        }

        const querySnapshot = await feedbackQuery.get();
        setFeedbackExists(!querySnapshot.empty);
      } catch (error) {
        console.error('Error checking feedback existence:', error);
      }
    };

    if (visible) {
      checkFeedbackExists();
    }
  }, [visible]);

  const submitFeedback = async () => {
    try {
      if (feedback.trim() === '') {
        Alert.alert('Error', 'Please provide feedback');
        return;
      }


      if (rating === 0) {
        Alert.alert('Error', 'Please provide a rating');
        return;
      }

      setLoading(true);


      await firebase.firestore().collection('Feedbacks').add({
        teacherEmail,
        studentEmail,
        studentName,
        parentEmail,
        parentName,
        feedback,
        rating,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      const teacherQuery = firebase.firestore().collection('Teachers').where('email', '==', teacherEmail).limit(1);
      const teacherSnapshot = await teacherQuery.get();

      if (!teacherSnapshot.empty) {
        const teacherDoc = teacherSnapshot.docs[0];
        const teacherRef = teacherDoc.ref;
        console.log('data going in teachers');
        await firebase.firestore().runTransaction(async (transaction) => {
          const data = teacherDoc.data();
          const currentRating = data.rating;
          const stdRatingCount = data.stdRatingCount;
          const newRating = (currentRating + rating);
          transaction.update(teacherRef, {
            rating: newRating,
            stdRatingCount: stdRatingCount + 1
          });
        });
      }
      console.log('data stored in teachers');


      setLoading(false);
      setFeedback('');
      setRating(0);
      setLoading(false);
      Alert.alert('Success', 'Feedback submitted successfully');

      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      starIcons.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <AntDesignIcon name={i <= rating ? 'star' : 'staro'} size={24} color={themeColors.bg3} />
        </TouchableOpacity>
      );
    }
    return starIcons;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesignIcon name="closecircle" size={24} color={themeColors.bg3} />
          </TouchableOpacity>

          {feedbackExists ? (
            <Text style={styles.label}>Feedback already submitted.</Text>
          ) : (
            <>
              <Text style={styles.label}>Feedback:</Text>
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                value={feedback}
                onChangeText={setFeedback}
              />

              <Text style={styles.label}>Rating:</Text>
              <View style={styles.starContainer}>{renderStars()}</View>

              {loading ? (
                <ActivityIndicator size="small" color={themeColors.bg3} />
              ) : (
                <TouchableOpacity onPress={submitFeedback} style={styles.btn}>
                  <Text style={styles.txt}>Submit</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: themeColors.bg3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    color: 'black',
  },
  btn: {
    margin: 1,
    marginTop: hp(5),
    width: '50%',
    color: 'white',
    backgroundColor: themeColors.bg3,
    borderRadius: 4,
    padding: 3,
    alignItems: 'center',
    alignSelf: 'center',
  },
  txt: {
    color: 'white',
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Feedback;
