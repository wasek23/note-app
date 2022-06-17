import { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, addDoc, getDoc, onSnapshot, query, where } from 'firebase/firestore';

import Input from '../../components/Form/Input';
import Radio from '../../components/Form/Radio';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { auth, db } from '../../../App';
import colors from '../../theme/colors';

const genderOptions = ['Male', 'Female'];

const SignUp = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('Male');

	const onSignUp = async () => {
		// createUserWithEmailAndPassword(auth, email, password)
		// 	.then((userCredential) => {
		// 		const user = userCredential.user;
		// 		console.log(user);
		// 	})
		// 	.catch((error) => {
		// 		const errorCode = error.code;
		// 		const errorMessage = error.message;
		// 	});
		try {
			setLoading(true);

			// 1. Create user
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);

			// 2. Add user profile to database
			await addDoc(collection(db, 'users'), {
				email,
				name,
				age,
				gender,
				uid: userCredential?.user.uid
			});

			setLoading(false);
		} catch (error) {
			console.log('Create User Error -> ', error);

			setLoading(false);
		}
	}

	return <SafeAreaView style={styles.container}>
		<View style={styles.signUpArea}>
			<Input placeholder='Email address' onChangeText={val => setEmail(val)} autoCapitalize='none' />
			<Input placeholder='Password' secureTextEntry onChangeText={val => setPassword(val)} />
			<Input placeholder='Full name' onChangeText={val => setName(val)} autoCapitalize='words' />
			<Input placeholder='Age' onChangeText={val => setAge(val)} />

			<View>
				<Text style={styles.genderLabel}>Select Gender:</Text>

				<Radio value={gender} options={genderOptions} onPress={val => setGender(val)} style={styles.genderRadio} />
			</View>

			{loading ? <Loading style={styles.button} /> : <Button text='Sign Up' customStyle={styles.button} onPress={onSignUp} />}
		</View>

		<View style={styles.agreeMsg}>
			<Text style={styles.agreeText}>By continuing you, accept the</Text>

			<Pressable>
				<Text style={[styles.agreeText, styles.agreeLink]}>Terms of Use</Text>
			</Pressable>

			<Text style={styles.agreeText}>and</Text>

			<Pressable>
				<Text style={[styles.agreeText, styles.agreeLink]}>Privacy Policy</Text>
			</Pressable>
		</View>
	</SafeAreaView>
}
export default SignUp;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	signUpArea: {
		paddingVertical: 25,
		paddingHorizontal: 16,
	},
	genderLabel: {
		marginVertical: 15
	},
	genderRadio: {
		marginLeft: 30
	},
	button: {
		marginTop: 50
	},

	agreeMsg: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingBottom: 50
	},
	agreeText: {
		fontSize: 11
	},
	agreeLink: {
		fontWeight: 'bold',
		color: colors.green,
		marginHorizontal: 5,
	}
});