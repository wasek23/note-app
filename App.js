import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import Home from './src/screens/Home/Home';
import SignIn from './src/screens/Auth/SignIn';
import SignUp from './src/screens/Auth/SignUp';
import Create from './src/screens/Note/Create';
import Edit from './src/screens/Note/Edit';
import colors from './src/theme/colors';
import firebaseConfig from './firebase.config';

// Stack for Navigation
const Stack = createNativeStackNavigator();
// Theme
const AppTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: colors.white
	}
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp); // Auth instance

export default function App() {
	let user = false; // Not authenticated

	return <NavigationContainer theme={AppTheme}>
		<Stack.Navigator>
			{user ? <>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='CreateNote' component={Create} />
				<Stack.Screen name='EditNote' component={Edit} />
			</> : <>
				<Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
				<Stack.Screen name='SignUp' component={SignUp} />
			</>}
		</Stack.Navigator>
	</NavigationContainer>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
