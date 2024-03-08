import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const FeedbackList = ({ teacherEmail }) => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const feedbacksRef = firebase.firestore().collection('Feedbacks')
            .where('teacherEmail', '==', teacherEmail);

        const unsubscribe = feedbacksRef.onSnapshot(snapshot => {
            const sortedFeedbacks = snapshot.docs.map(doc => doc.data())
                .sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt timestamp in descending order
            setFeedbacks(sortedFeedbacks);
        });

        return () => unsubscribe();
    }, [teacherEmail]);

    const renderFeedbacks = () => {
        return feedbacks.map((feedback, index) => (
            <TouchableOpacity key={index} style={styles.feedbackCard}>
                {
                    feedback.studentEmail ? (
                        <View>
                            <Text style={{ color: themeColors.bg3, fontWeight: '800' }}>
                                {feedback.studentName} (Student)
                            </Text>
                            <Text style={{ color: themeColors.bg2, fontWeight: '400' }}>{feedback.studentEmail}</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={{ color: themeColors.bg3, fontWeight: '800' }}>
                                {feedback.parentName} (Parent)
                            </Text>
                            <Text style={{ color: themeColors.bg2, fontWeight: '400' }}>{feedback.parentEmail}</Text>
                        </View>
                    )
                }
                <Text style={{ color: themeColors.bg3, fontWeight: '500' }}>𝖢𝗈𝗆𝗆𝖾𝗇𝗍: {feedback.feedback}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>𝓡𝓮𝓿𝓲𝓮𝔀𝓼</Text>
            {feedbacks.length === 0 ? (
                <Text style={styles.noFeedbackText}>𝓝𝓸 𝓻𝓮𝓿𝓲𝓮𝔀𝓼 𝓪𝓿𝓪𝓲𝓵𝓪𝓫𝓵𝓮</Text>
            ) : (
                renderFeedbacks()
            )}
        </View>
    );
};

export default FeedbackList;

const styles = StyleSheet.create({
    feedbackContainer: {
        padding: 20,
        backgroundColor: "white"
    },
    feedbackTitle: {
        fontSize: 32,
        marginBottom: 10,
        color: themeColors.bg2,
        marginLeft: wp(27)
    },
    feedbackCard: {
        backgroundColor: '#EAEAEA',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        color: themeColors.bg3
    },
    noFeedbackText: {
        color: themeColors.bg3,
        fontSize: 25,
        marginLeft: wp(11),
        padding: 20
    }
});
