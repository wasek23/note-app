import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import Home from './src/screens/Home/Home';
import SignIn from './src/screens/Auth/SignIn';
import SignUp from './src/screens/Auth/SignUp';
import Create from './src/screens/Note/Create';
import Edit from './src/screens/Note/Edit';
import Loading from './src/components/Loading/Loading';
import firebaseConfig from './firebase.config';
import colors from './src/theme/colors';

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
export const db = getFirestore(firebaseApp); // DB instance

export default function App() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const authSubscription = onAuthStateChanged(auth, user => {
			user ? setUser(user) : setUser(null);
			setLoading(false);
		});

		return authSubscription;
	}, []);

	if (loading) {
		return <Loading style={styles.loading} />
	}

	return <NavigationContainer theme={AppTheme}>
		<Stack.Navigator>
			{user ? <>
				<Stack.Screen name='Home' options={{ headerShown: false }}>
					{props => <Home {...props} user={user} />}
				</Stack.Screen>

				<Stack.Screen name='CreateNote'>
					{props => <Create {...props} user={user} />}
				</Stack.Screen>

				<Stack.Screen name='EditNote'>
					{props => <Edit {...props} user={user} />}
				</Stack.Screen>

				{/* <Stack.Screen name='EditNote' component={Edit} /> */}
			</> : <>
				<Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
				<Stack.Screen name='SignUp' component={SignUp} />
			</>}
		</Stack.Navigator>
	</NavigationContainer>;
}

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});