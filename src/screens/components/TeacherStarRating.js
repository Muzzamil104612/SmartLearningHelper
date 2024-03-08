import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { themeColors } from '../../theme';
import { firebase } from '@react-native-firebase/firestore';

const TeacherStarRating = ({ teacherEmail }) => {
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchTeacherRating = async () => {
            try {
                const teacherDoc = await firebase.firestore().collection('Teachers').where('email', '==', teacherEmail).get();

                if (!teacherDoc.empty) {
                    const Tdata = teacherDoc.docs[0].data(); // Access the data from the first document
                    const { rating, stdRatingCount } = Tdata;
                    if (rating && stdRatingCount) {
                        const avgRating = rating / stdRatingCount;
                        setAverageRating(avgRating);
                    }
                } else {
                    console.log('No matching teacher document found.');
                }
            } catch (error) {
                console.error('Error fetching teacher rating:', error);
            }
        };

        fetchTeacherRating();

        // Cleanup function
        return () => {
            // Any cleanup code here
        };
    }, [teacherEmail]);

    const renderStars = () => {
        const starIcons = [];
        const filledStars = Math.round(averageRating * 2) / 2;
        for (let i = 1; i <= 5; i++) {
            if (i <= filledStars - 0.5) {
                starIcons.push(
                    <Icon key={i} name="star" size={24} color={themeColors.bg3} />
                );
            } else if (i === filledStars + 0.5) {
                starIcons.push(
                    <Icon key={i} name="star-half-o" size={24} color={themeColors.bg3} />
                );
            } else if (i <= filledStars) {
                starIcons.push(
                    <Icon key={i} name="star" size={24} color={themeColors.bg3} />
                );
            } else {
                starIcons.push(
                    <Icon key={i} name="star-o" size={24} color={themeColors.bg3} />
                );
            }
        }
        return starIcons;
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            {renderStars()}
        </View>
    );
};

export default TeacherStarRating;
