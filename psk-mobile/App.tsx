import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

const navTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: '#ffffff',
	},
};

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthProvider>
				<NavigationContainer theme={navTheme}>
					<StatusBar style="auto" />
					<RootNavigator />
				</NavigationContainer>
			</AuthProvider>
		</GestureHandlerRootView>
	);
}
