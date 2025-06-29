import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const moodOptions = [
  { emoji: '🥰', label: 'Loved' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🤩', label: 'Excited' },
];

const DailyJournalScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
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

          {/* Mood Picker */}
          <Text style={styles.subTitle}>How are you feeling today?</Text>
          <View style={styles.moodRow}>
            {moodOptions.map((mood) => {
              const isSelected = selectedMood === mood.emoji;
              return (
                <TouchableOpacity
                  key={mood.emoji}
                  onPress={() => setSelectedMood(mood.emoji)}
                  style={[
                    styles.moodButton,
                    isSelected && styles.selectedMood,
                  ]}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Cute sticker gif */}
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
    marginBottom: 10,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  subTitle: {
    fontSize: 20,
    color: '#DB7093',
    marginBottom: 10,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  moodButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 12,
    margin: 8,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    transform: [{ scale: 1 }],
  },
  selectedMood: {
    backgroundColor: '#FFB6C1',
    transform: [{ scale: 1.2 }],
  },
  moodEmoji: {
    fontSize: 30,
  },
  sticker: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    marginTop: 10,
  },
});
