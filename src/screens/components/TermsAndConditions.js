import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { themeColors } from '../../theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';

const TermsAndConditions = () => {
    return (
        <ScrollView style={styles.container}>

            <Feather name='file-text' size={29} style={{
                marginBottom:hp(-4.3),
                marginLeft:wp(5)
            }} color={themeColors.bg3} />
            <Text style={{
                color: themeColors.bg3,
                fontSize: 23,
                fontWeight: '700',
                marginLeft: wp(16)
            }}>
                Terms And Conditions</Text>
            <View style={{
                marginBottom: hp(5),
                marginTop: hp(5)
            }}>

                <Text style={styles.heading}> Acceptance of Terms</Text>

                <Text style={styles.termsText}>By accessing or using Smart Learning Helper App, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please do not use the app.
                </Text>

                <Text style={styles.heading}> User Accounts</Text>

                <Text style={styles.termsText}>
                    Users must create an account to access certain features of the appand are responsible for maintaining the confidentiality of their account information.
                    They agree to provide accurate and current information during the registration process.
                </Text>
                <Text style={styles.heading}> Content and Use</Text>

                <Text style={styles.termsText}>
                    The content provided on Smart Learning Helper App is for educational purposes only.
                    Users are prohibited from distributing, modifying, or copying any content from the app without prior written consent.
                    Users agree not to engage in any activities that may disrupt the functioning of the app or compromise its security.

                </Text>
                <Text style={styles.heading}> Termination of Accounts</Text>

                <Text style={styles.termsText}>
                    Smart Learning Helper App reserves the right to suspend or terminate user accounts for violations of these terms.
                </Text>


                <Text style={styles.heading}> Changes to Terms</Text>

                <Text style={styles.termsText}>
                    Smart Learning Helper App reserves the right to modify or update these terms at any time. Users will be notified of any changes.

                </Text>

                <Text style={styles.heading}> Intellectual Property</Text>

                <Text style={styles.termsText}>

                    Smart Learning Helper App and its content are protected by copyright and other intellectual property laws.
                    Users may not use the app's name, logo, or any trademarks without prior written permission.

                </Text>

                <Text style={styles.heading}> Privacy Policy</Text>

                <Text style={styles.termsText}>
                    Smart Learning Helper App collects and processes user data according to its Privacy Policy.
                    Users are encouraged to review the Privacy Policy to understand how their data is handled.
                </Text>
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
    termsText: {
        fontSize: 16,
        color: 'black',
        padding: 8
    },
    heading: {
        color: themeColors.bg3,
        fontSize: 20,
        fontWeight: '700'
    }
});

export default TermsAndConditions;