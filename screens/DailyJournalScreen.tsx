import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const DailyJournalScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/kawaii-bg.jpg')}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(255, 240, 245, 0.6)', 'rgba(255, 182, 193, 0.4)']}
        style={styles.gradient}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Text style={styles.title}>🌸 Daily Journal</Text>

          {/* Cute sticker elements */}
          <Image
            source={{ uri: 'https://emoji.gg/assets/emoji/8024-kirbyheart.gif' }}
            style={styles.sticker}
          />
        </Animated.View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default DailyJournalScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    color: '#FF69B4',
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  sticker: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    marginTop: 10,
  },
});
