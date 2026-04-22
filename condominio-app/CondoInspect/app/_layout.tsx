import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import './global.css';

export default function RootLayout() {
  return (
    <>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="dashboard" />
            <Stack.Screen name="management/condos/index" />
            <Stack.Screen name="scanner" />
            <Stack.Screen name="inspection-form" />
        </Stack>
        <StatusBar style="auto" />
    </>
  );
}
