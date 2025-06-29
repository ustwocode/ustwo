import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import DailyJournalScreen from './screens/DailyJournalScreen';
import CouplePairingScreen from './screens/CouplePairingScreen';

export type RootStackParamList = {
  Auth: undefined;
  CouplePairing: undefined;
  DailyJournal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="CouplePairing" component={CouplePairingScreen} />
        <Stack.Screen name="DailyJournal" component={DailyJournalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
