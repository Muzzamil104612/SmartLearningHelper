
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const Slider = () => {
  const [currentImage, setCurrentImage] = useState(1);

  const opacity = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage % 3) + 1);
      opacity.value = withTiming(1, { duration: 1000 }); // Fade in over 0.5 seconds
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={getImageSource(currentImage)}
        style={[styles.image, animatedStyle]}
      />
    </View>
  );
};

const getImageSource = (imageNumber) => {
  return imageNumber === 1
    ? require('../../assets/images/study1.png')
    : imageNumber === 2
    ? require('../../assets/images/study2.png')
    : require('../../assets/images/study3.png');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop:hp(22),
    width: wp(30),
    height: hp(20),
  },
});

export default Slider;
