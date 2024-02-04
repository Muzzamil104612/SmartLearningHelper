import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { themeColors } from '../../theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';

const HelpAndSupport = () => {
    const [faqVisible, setFaqVisible] = useState(false);
    const cardHeight = faqVisible ? hp(39) : hp(8);
    const shadowOpacity = faqVisible ? 0.3 : 0.1;

    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const toggleFAQVisibility = () => {
        setFaqVisible(!faqVisible);
        setSelectedQuestion(null);
    };

    const handleQuestionClick = (index) => {
        setSelectedQuestion(selectedQuestion === index ? null : index);
    };

    const renderFAQs = () => {
        const faqs = [
            { question: 'Q1: What is your app about?', answer: 'A1: To improve online learning experience' },
            { question: 'Q2: How it improves learning?', answer: 'A2: By allowing parents to monitor their childrens' },
        ];

        return faqs.map((faq, index) => (
            <View key={index}>
                <TouchableOpacity
                    style={styles.faqCard}
                    onPress={() => handleQuestionClick(index)}
                >
                    <View style={styles.questionHeader}>
                        <Text style={styles.QuestiontermsTextfaq}>{faq.question}</Text>
                        <Feather
                            name={selectedQuestion === index ? 'chevron-up' : 'chevron-down'}
                            size={18}
                            color={themeColors.bg2}
                            
                        />
                    </View>
                </TouchableOpacity>
                {selectedQuestion === index && (
                    <View style={styles.answerCard}>
                        <Text style={styles.termsTextfaq}>{faq.answer}</Text>
                    </View>
                )}
            </View>
        ));
    };

    return (
        <ScrollView style={styles.container}>

            <Text style={{
                color: themeColors.bg3,
                fontSize: 23,
                fontWeight: '700',
                marginLeft: wp(14),
                marginTop: hp(3)
            }}>
                <Feather name='check-circle' size={29} color={themeColors.bg3} />
                {'  '}Help And Support</Text>
            <View style={{
                marginBottom: hp(5),
                marginTop: hp(3)
            }}>
                <TouchableOpacity style={[styles.card, { height: hp(11) }]} onPress={() => { }}>
                    <Text style={styles.heading}>
                        <Feather name='phone-call' size={18} color={themeColors.bg3} />
                        {'  '}Our Customer Service</Text>
                    <Text style={styles.termsText}>+923334567890</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, { height: hp(11) }]} onPress={() => { }}>
                    <Text style={styles.heading}>
                        <Feather name='mail' size={18} color={themeColors.bg3} />
                        {'  '}Write Us At</Text>
                    <Text style={styles.termsText}>smartlearning@gmail.com</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, { height: cardHeight }]} onPress={toggleFAQVisibility}>
                    <View style={styles.dropdownHeader}>
                        <Text style={styles.heading}>
                            <Feather name='help-circle' size={18} color={themeColors.bg3} />
                            {'  '}FAQs</Text>
                        <Feather
                            name={faqVisible ? 'chevron-up' : 'chevron-down'}
                            size={19}
                            color={themeColors.bg3}
                            style={{
                            padding:9
                            }}
                        />
                    </View>
                    {faqVisible && renderFAQs()}
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 22,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: 'white'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1.3,
        padding: 12,
        margin: 12,
    },
    termsText: {
        fontSize: 15,
        color: themeColors.bg2,
        padding: 8,
        marginLeft: wp(6),
        marginTop: hp(-1)
    },
    heading: {
        color: themeColors.bg3,
        fontSize: 18,
        fontWeight: '700'
    },
    termsTextfaq: {
        fontSize: 15,
        color: themeColors.bg2,
        paddingTop: 4,
        marginLeft: wp(6),
    },
    faqCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1.3,
        padding: 12,
        margin: 12,
        marginTop: 8,
    },
    answerCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1.3,
        padding: 12,
        margin: 12,
        marginTop: 8,
        marginLeft: wp(6),
    },
    QuestiontermsTextfaq: {
        fontSize: 15,
        color: themeColors.bg3,
        paddingTop: 4,
        marginLeft: wp(1),
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default HelpAndSupport;
